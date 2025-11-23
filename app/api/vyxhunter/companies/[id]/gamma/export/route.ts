import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { exportGammaSlide } from '@/lib/vyxhunter/gamma'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const DEMO_ORG_ID = '00000000-0000-0000-0000-000000000001'

/**
 * POST /api/vyxhunter/companies/[id]/gamma/export
 * Export Gamma presentation as PDF or PPTX
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { format } = await request.json() // 'pdf' or 'pptx'

    if (!format || (format !== 'pdf' && format !== 'pptx')) {
      return NextResponse.json(
        { error: 'Invalid format. Must be pdf or pptx' },
        { status: 400 }
      )
    }

    // Fetch company
    const { data: company, error: companyError } = await supabase
      .from('vch_vyxhunter_companies')
      .select('*')
      .eq('id', id)
      .eq('organization_id', DEMO_ORG_ID)
      .single()

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    // Fetch latest Gamma slide
    const { data: gammaSlide, error: gammaError } = await supabase
      .from('vch_vyxhunter_gamma_slides')
      .select('*')
      .eq('company_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (gammaError || !gammaSlide) {
      return NextResponse.json(
        { error: 'No Gamma slide found' },
        { status: 404 }
      )
    }

    // Export slide
    const result = await exportGammaSlide(
      gammaSlide.gamma_slide_id,
      format,
      gammaSlide.gamma_prompt
    )

    return NextResponse.json({
      success: true,
      downloadUrl: result.url,
      format
    })

  } catch (error: any) {
    console.error('💥 Error exporting Gamma slide:', error)
    return NextResponse.json(
      { error: 'Failed to export Gamma slide', details: error.message },
      { status: 500 }
    )
  }
}
