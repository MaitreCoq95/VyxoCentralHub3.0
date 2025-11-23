import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const DEMO_ORG_ID = '00000000-0000-0000-0000-000000000001'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * POST /api/vyxhunter/emails/[id]/send
 * Send email via Resend
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('📤 Sending email:', id)

    // Check Resend API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      )
    }

    // Fetch email
    const { data: email, error: emailError } = await supabase
      .from('vch_vyxhunter_emails')
      .select('*, vch_vyxhunter_companies(*)')
      .eq('id', id)
      .eq('organization_id', DEMO_ORG_ID)
      .single()

    if (emailError) throw emailError
    if (!email) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      )
    }

    // Check if already sent
    if (email.status === 'sent') {
      return NextResponse.json(
        { error: 'Email already sent' },
        { status: 400 }
      )
    }

    // Send via Resend
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'Vivien - Vyxo Consulting <vivien@vyxo.fr>',
      to: email.recipient_email,
      subject: email.subject,
      html: email.body_html,
      text: email.body_text,
      tags: [
        { name: 'campaign', value: 'vyxhunter' },
        { name: 'company_id', value: email.company_id },
        { name: 'email_type', value: email.email_type }
      ]
    })

    if (resendError) {
      console.error('❌ Resend error:', resendError)
      
      // Update email status to failed
      await supabase
        .from('vch_vyxhunter_emails')
        .update({ 
          status: 'failed',
          metadata: { error: resendError.message }
        })
        .eq('id', id)

      throw resendError
    }

    // Update email status to sent
    const { data: updatedEmail, error: updateError } = await supabase
      .from('vch_vyxhunter_emails')
      .update({ 
        status: 'sent',
        sent_at: new Date().toISOString(),
        resend_email_id: resendData?.id
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) throw updateError

    // Update company status to 'contacted'
    await supabase
      .from('vch_vyxhunter_companies')
      .update({ status: 'contacted' })
      .eq('id', email.company_id)

    // Create interaction record
    await supabase.from('vch_vyxhunter_interactions').insert([{
      organization_id: DEMO_ORG_ID,
      company_id: email.company_id,
      email_id: id,
      type: 'email_sent',
      details: { 
        email_type: email.email_type,
        resend_id: resendData?.id
      }
    }])

    console.log('✅ Email sent successfully:', resendData?.id)

    return NextResponse.json({ 
      success: true,
      email: updatedEmail,
      resendId: resendData?.id
    })
  } catch (error: any) {
    console.error('💥 Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    )
  }
}
