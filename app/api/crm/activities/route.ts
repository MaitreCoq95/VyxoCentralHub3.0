import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const entityId = searchParams.get('entityId')
  const entityType = searchParams.get('entityType')

  const supabase = createClient()

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
  const supabase = createClient()
  const body = await request.json()

  // Get the demo organization ID (since we don't have auth yet)
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
