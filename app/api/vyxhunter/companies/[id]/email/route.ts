import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateVyxHunterEmail } from '@/lib/vyxhunter/email-generator'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const DEMO_ORG_ID = '00000000-0000-0000-0000-000000000001'

/**
 * POST /api/vyxhunter/companies/[id]/email
 * Generate personalized email for a company
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { 
      recipientEmail, 
      recipientName, 
      emailType = 'initial' 
    } = body

        organization_id: DEMO_ORG_ID,
        company_id: id,
        gamma_slide_id: gammaSlide?.id,
        recipient_email: recipientEmail || 'contact@example.com',
        recipient_name: recipientName || company.name,
        subject: emailData.subject,
        body_html: emailData.bodyHtml,
        body_text: emailData.bodyText,
        email_type: emailType,
        status: 'draft'
      }])
      .select()
      .single()

    if (emailError) throw emailError

    // Create interaction record
    await supabase.from('vch_vyxhunter_interactions').insert([{
      organization_id: DEMO_ORG_ID,
      company_id: id,
      email_id: newEmail.id,
      type: 'email_drafted',
      details: { 
        email_type: emailType,
        has_gamma: !!gammaSlide
      }
    }])

    console.log('✅ Email generated:', newEmail.id)

    return NextResponse.json({ 
      success: true,
      email: newEmail 
    })
  } catch (error: any) {
    console.error('💥 Error generating email:', error)
    return NextResponse.json(
      { error: 'Failed to generate email', details: error.message },
      { status: 500 }
    )
  }
}
