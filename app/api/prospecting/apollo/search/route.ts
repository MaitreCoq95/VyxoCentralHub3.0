import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { jobTitle, location, industry, page = 1 } = body

    console.log('🕵️‍♂️ Searching Apollo for:', { jobTitle, location, industry })

    const apiKey = process.env.APOLLO_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'Apollo API key not configured' }, { status: 500 })
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        api_key: apiKey,
        q_organization_domains: null,
        page: page,
        person_titles: jobTitle ? [jobTitle] : [],
        organization_locations: location ? [location] : [],
        organization_num_employees_ranges: null,
        q_keywords: industry, // Using industry as a keyword for broader match
        per_page: 10
      })
    }

    const response = await fetch('https://api.apollo.io/v1/mixed_people/search', options)
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Apollo API Error:', errorData)
      throw new Error(errorData.message || 'Failed to fetch from Apollo')
    }

    const data = await response.json()
    
    // Transform data to our format
    const prospects = data.people.map((p: any) => ({
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      title: p.title,
      email: p.email || 'Not available',
      linkedin_url: p.linkedin_url,
      organization: p.organization?.name,
      organization_url: p.organization?.website_url,
      location: p.city ? `${p.city}, ${p.state}` : p.country,
      photo_url: p.photo_url
    }))

    return NextResponse.json({ prospects, total: data.pagination?.total_entries })

  } catch (error) {
    console.error('💥 Prospect search error:', error)
    return NextResponse.json(
      { error: 'Failed to search prospects', details: error },
      { status: 500 }
    )
  }
}
