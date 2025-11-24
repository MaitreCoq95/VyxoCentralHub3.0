import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { jobTitle, location, industry, companySize, seniority, department, revenueMin, revenueMax, companyName, personName, page = 1 } = body

    const apiKey = process.env.APOLLO_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'Apollo API key not configured' }, { status: 500 })
    }

    // Expand job title to include common variations for better results
    const expandedTitles = jobTitle ? [
      jobTitle,
      // Add common variations if it's a simple title
      ...(jobTitle.toLowerCase().includes('ceo') ? ['Chief Executive Officer', 'Founder', 'Co-Founder'] : []),
      ...(jobTitle.toLowerCase().includes('cto') ? ['Chief Technology Officer', 'VP Technology'] : []),
      ...(jobTitle.toLowerCase().includes('cfo') ? ['Chief Financial Officer', 'VP Finance'] : []),
      ...(jobTitle.toLowerCase().includes('cmo') ? ['Chief Marketing Officer', 'VP Marketing'] : []),
      ...(jobTitle.toLowerCase().includes('director') ? ['Head of', 'Manager'] : []),
        'Content-Type': 'application/json',
      const errorText = await response.text()
      console.error('❌ Apollo API Error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Apollo API error', message: `API returned ${response.status}. Please check your API key.` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Check if data structure is valid
    if (!data.people || !Array.isArray(data.people)) {
      console.error('❌ Invalid Apollo response structure:', data)
      return NextResponse.json(
        { error: 'Invalid response from Apollo', prospects: [] },
        { status: 200 }
      )
    }
    
    // Transform data to our format
    const prospects = data.people.map((p: any) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      title: p.title,
      email: p.email || 'Not available',
      linkedin_url: p.linkedin_url,
      organization: p.organization?.name,
      organization_name: p.organization?.name,
      organization_url: p.organization?.website_url,
      organization_website: p.organization?.website_url,
      organization_industry: p.organization?.industry,
      organization_num_employees: p.organization?.estimated_num_employees,
      city: p.city,
      state: p.state,
      country: p.country,
      location: p.city ? `${p.city}, ${p.state}` : p.country,
      photo_url: p.photo_url,
      headline: p.headline,
      phone_numbers: p.phone_numbers,
      website_url: p.organization?.website_url
    }))

    return NextResponse.json({ prospects, total: data.pagination?.total_entries })

  } catch (error: any) {
    console.error('💥 Prospect search error:', error)
    return NextResponse.json(
      { error: 'Failed to search prospects', message: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
