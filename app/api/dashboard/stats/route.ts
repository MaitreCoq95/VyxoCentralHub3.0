import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    console.log('📊 Fetching dashboard stats from Supabase...')

    // Fetch all data in parallel
    const [clientsRes, invoicesRes, auditsRes, activitiesRes] = await Promise.all([
      supabase.from('VCH_Clients').select('*').eq('status', 'active'),
      supabase.from('VCH_Invoices').select('*'),
      supabase.from('VCH_Audits').select('*').in('status', ['draft', 'in_progress', 'review']),
      supabase.from('VCH_Activities').select('*').order('created_at', { ascending: false }).limit(5)
    ])

    // Check for errors
    if (clientsRes.error) {
      console.error('Clients error:', clientsRes.error)
      throw clientsRes.error
    }
    if (invoicesRes.error) {
      console.error('Invoices error:', invoicesRes.error)
      throw invoicesRes.error
    }
    if (auditsRes.error) {
      console.error('Audits error:', auditsRes.error)
      throw auditsRes.error
    }
    if (activitiesRes.error) {
      console.error('Activities error:', activitiesRes.error)
      throw activitiesRes.error
    }

    const clients = clientsRes.data || []
    const invoices = invoicesRes.data || []
    const audits = auditsRes.data || []
    const activities = activitiesRes.data || []

    // Calculate stats
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0)
    const paidRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)

    const stats = {
      totalRevenue: paidRevenue,
      activeClients: clients.length,
      pendingAudits: audits.length,
      revenueGrowth: 12.5
    }

    console.log('✅ Stats calculated:', stats)

    return NextResponse.json({
      stats,
      activities
    })
  } catch (error) {
    console.error('💥 Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error },
      { status: 500 }
    )
  }
}
