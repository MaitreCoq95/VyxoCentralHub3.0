import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('🗑️ Deleting client:', id)

    const { error } = await supabase
      .from('vch_clients')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Delete client error:', error)
      throw error
    }

    console.log('✅ Client deleted:', id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('💥 Error deleting client:', error)
    return NextResponse.json(
      { error: 'Failed to delete client', details: error },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    console.log('📝 Updating client:', id, body)

    const { data: updatedClient, error } = await supabase
      .from('vch_clients')
      .update({
        name: body.name,
        sector: body.sector,
        status: body.status,
        city: body.city,
        contact_email: body.email,
        contact_phone: body.phone,
        logo_url: body.logo
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('❌ Update client error:', error)
      throw error
    }

    console.log('✅ Client updated:', updatedClient)

    return NextResponse.json({ client: updatedClient })
  } catch (error) {
    console.error('💥 Error updating client:', error)
    return NextResponse.json(
      { error: 'Failed to update client', details: error },
      { status: 500 }
    )
  }
}
