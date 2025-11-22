import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('💼 Fetching pipeline data from Supabase...')

    // Fetch engagements to populate the pipeline
    // We'll map 'draft' -> Proposal, 'active' -> In Progress/Closed, etc.
    const { data: engagements, error } = await supabase
      .from('vch_engagements')
      .select(`
        *,
        vch_clients (
          name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Pipeline error:', error)
      throw error
    }

    console.log('✅ Engagements fetched:', engagements?.length || 0)

    return NextResponse.json({ engagements })
  } catch (error) {
    console.error('💥 Error fetching pipeline:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pipeline data', details: error },
      { status: 500 }
    )
  }
}
