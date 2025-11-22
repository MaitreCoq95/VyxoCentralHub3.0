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
    const [clientsRes, invoicesRes, auditsRes, activitiesRes, engagementsRes] = await Promise.all([
      supabase.from('vch_clients').select('*'),
      supabase.from('vch_invoices').select('*'),
      supabase.from('vch_audits').select('*').in('status', ['draft', 'in_progress', 'review']),
      supabase.from('vch_activities').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('vch_engagements').select('*')
    ])

    // Check for errors
    if (clientsRes.error) throw clientsRes.error
    if (invoicesRes.error) throw invoicesRes.error
    if (auditsRes.error) throw auditsRes.error
    if (activitiesRes.error) throw activitiesRes.error
    if (engagementsRes.error) throw engagementsRes.error

    const clients = clientsRes.data || []
    const invoices = invoicesRes.data || []
    const audits = auditsRes.data || []
    const activities = activitiesRes.data || []
    const engagements = engagementsRes.data || []

    // Calculate stats
    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0)
    const paidRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0)
    
    const activeClients = clients.filter(c => c.status === 'active').length
    
    // Conversion Rate: Won Deals / Total Deals
    const totalDeals = engagements.length
    const wonDeals = engagements.filter(e => e.status === 'completed').length
    const conversionRate = totalDeals > 0 ? Math.round((wonDeals / totalDeals) * 100) : 0

    const stats = {
      totalRevenue: paidRevenue,
      activeClients: activeClients,
      pendingAudits: audits.length,
      revenueGrowth: 12.5,
      conversionRate: conversionRate,
      totalDeals: totalDeals
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
