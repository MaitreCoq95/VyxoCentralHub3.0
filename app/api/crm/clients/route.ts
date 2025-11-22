import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('👥 Fetching clients from Supabase...')

    const { data: clients, error } = await supabase
      .from('vch_clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Clients error:', error)
      throw error
    }

    console.log('✅ Clients fetched:', clients?.length || 0)

    return NextResponse.json({ clients })
  } catch (error) {
    console.error('💥 Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients', details: error },
      { status: 500 }
    )
  }
}
