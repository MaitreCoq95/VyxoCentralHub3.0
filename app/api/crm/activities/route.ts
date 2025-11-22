import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const entityId = searchParams.get('entityId')
  const entityType = searchParams.get('entityType')

  let query = supabase
    .from('vch_activities')
    .select('*')
    .order('created_at', { ascending: false })

  if (entityId) query = query.eq('entity_id', entityId)
  if (entityType) query = query.eq('entity_type', entityType)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()

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
    .from('vch_activities')
    .insert([
      {
        ...body,
        organization_id: orgs.id,
      }
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
