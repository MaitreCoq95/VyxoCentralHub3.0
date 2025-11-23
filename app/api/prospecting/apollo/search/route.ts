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
        'Cache-Control': 'no-cache',
        'X-Api-Key': apiKey
      },
      body: JSON.stringify({
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
      organization_url: p.organization?.website_url,
      location: p.city ? `${p.city}, ${p.state}` : p.country,
      photo_url: p.photo_url
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
