import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
import { analyzeCompany } from '@/lib/vyxhunter/ai-analysis'

const DEMO_ORG_ID = '00000000-0000-0000-0000-000000000001'

/**
 * POST /api/vyxhunter/companies/[id]/analyze
 * Generate AI analysis for a company
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  try {
    const { id } = await params
    console.log('🤖 Analyzing company:', id)

    // Fetch company
    const { data: company, error: companyError } = await supabase
      .from('vch_vyxhunter_companies')
      .select('*')
      .eq('id', id)
      .eq('organization_id', DEMO_ORG_ID)
      .single()

    if (companyError) throw companyError
    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    // Generate AI analysis
    const analysisData = await analyzeCompany(company)

    // Save analysis to database
    const { data: newAnalysis, error: analysisError } = await supabase
      .from('vch_vyxhunter_analyses')
      .insert([{
        organization_id: DEMO_ORG_ID,
        company_id: id,
        ...analysisData
      }])
      .select()
      .single()

    if (analysisError) throw analysisError

    // Update company status to 'analyzed'
    await supabase
      .from('vch_vyxhunter_companies')
      .update({ status: 'analyzed' })
      .eq('id', id)

    // Create interaction record
    await supabase.from('vch_vyxhunter_interactions').insert([{
      organization_id: DEMO_ORG_ID,
      company_id: id,
      type: 'analysis_generated',
      details: { 
        relevance_score: analysisData.relevance_score,
        confidence_level: analysisData.confidence_level
      }
    }])

    console.log('✅ Analysis generated:', newAnalysis.id)

    return NextResponse.json({ 
      success: true,
      analysis: newAnalysis 
    })
  } catch (error: any) {
    console.error('💥 Error analyzing company:', error)
    return NextResponse.json(
      { error: 'Failed to analyze company', details: error.message },
      { status: 500 }
    )
  }
}
