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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('📝 Creating new deal:', body)

    // Get the demo organization ID
    const { data: orgs } = await supabase
      .from('vch_organizations')
      .select('id')
      .limit(1)
      .single()

    if (!orgs) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('vch_engagements')
      .insert([
        {
          ...body,
          organization_id: orgs.id,
          type: 'consulting', // Default type
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Create deal error:', error)
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('💥 Error creating deal:', error)
    return NextResponse.json(
      { error: 'Failed to create deal', details: error },
      { status: 500 }
    )
  }
}
