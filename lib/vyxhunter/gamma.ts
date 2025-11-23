// =====================================================
// Gamma API Client
// Integration with Gamma.app for presentation generation
// =====================================================

interface GammaSlideConfig {
  title: string
  subtitle?: string
  sections: GammaSection[]
  theme?: 'minimal' | 'modern' | 'professional'
  colors?: {
    primary: string
    secondary: string
  }
}

interface GammaSection {
  heading: string
  content: string[]
  type?: 'text' | 'bullets' | 'cta'
}

interface GammaGenerateResponse {
  slideId: string
  url: string
  status: 'ready' | 'generating' | 'failed'
  error?: string
}

/**
 * Generate a Gamma presentation slide
 * 
 * Uses Gamma API v1.0 (https://gamma.app/docs/api)
 * Requires GAMMA_API_KEY in environment (format: sk-gamma-xxxxxxxx)
 */
export async function generateGammaSlide(
  prompt: string,
  config?: Partial<GammaSlideConfig>
): Promise<GammaGenerateResponse> {
  const apiKey = process.env.GAMMA_API_KEY

  if (!apiKey) {
    console.warn('⚠️ GAMMA_API_KEY not configured - using mock response')
    
    // Mock response for development
    return {
      slideId: `mock-${Date.now()}`,
      url: `https://gamma.app/docs/mock-presentation-${Date.now()}`,
      status: 'ready'
    }
  }

  try {
    console.log('📊 Generating Gamma presentation via API...')
    
    // Gamma API v1.0 endpoint
    const response = await fetch('https://public-api.gamma.app/v1.0/generations', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputText: prompt,
        textMode: 'generate'
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Gamma API error:', response.status, errorText)
      throw new Error(`Gamma API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    
    console.log('✅ Gamma presentation generated:', data)
    
    // Gamma API returns the document ID and URL
    return {
      slideId: data.id || data.documentId,
      url: data.url || data.webUrl || `https://gamma.app/docs/${data.id}`,
      status: 'ready'
    }

  } catch (error: any) {
    console.error('❌ Gamma API error:', error)
    
    // Fallback to mock if API fails
    return {
      slideId: `error-fallback-${Date.now()}`,
      url: '',
      status: 'failed',
      error: error.message
    }
  }
}

/**
 * Get Gamma slide details
 * Fetches the current status and metadata of a Gamma presentation
 */
export async function getGammaSlide(slideId: string): Promise<{
  url: string
  status: string
  viewsCount?: number
}> {
  const apiKey = process.env.GAMMA_API_KEY

  if (!apiKey) {
    return {
      url: `https://gamma.app/docs/${slideId}`,
      status: 'ready'
    }
  }

  try {
    // Gamma API v1.0 - Get document details
    const response = await fetch(`https://public-api.gamma.app/v1.0/documents/${slideId}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey
      }
    })

    if (!response.ok) {
      console.warn('⚠️ Could not fetch Gamma slide details, using fallback')
      return {
        url: `https://gamma.app/docs/${slideId}`,
        status: 'ready'
      }
    }

    const data = await response.json()
    
    return {
      url: data.url || data.webUrl || `https://gamma.app/docs/${slideId}`,
      status: data.status || 'ready',
      viewsCount: data.analytics?.views || 0
    }
  } catch (error: any) {
    console.error('❌ Error fetching Gamma slide:', error)
    
    // Fallback to basic URL
    return {
      url: `https://gamma.app/docs/${slideId}`,
      status: 'ready'
    }
  }
}

/**
 * Track Gamma slide view
 * Called when we detect a view via webhook or tracking pixel
 */
export async function trackGammaView(slideId: string): Promise<void> {
  // This would typically be handled by Gamma's analytics
  // We just need to update our local database
  console.log(`👁️ Gamma slide viewed: ${slideId}`)
}

/**
 * Build a Gamma prompt for a company based on analysis
 */
export function buildGammaPrompt(
  companyName: string,
  sector: string,
  analysis: {
    mainPain: string
    solution: string
    quickWins: string[]
  }
): string {
  return `
Create a professional 1-slide presentation for ${companyName} (${sector}).

TITLE: "${companyName} × Vyxo Consulting"
SUBTITLE: "Clarté. Rapidité. Excellence opérationnelle."

SECTION 1: "Votre situation"
- ${analysis.mainPain}

SECTION 2: "Notre solution"
- ${analysis.solution}

SECTION 3: "Résultats attendus"
${analysis.quickWins.map(win => `- ${win}`).join('\n')}

CTA: "Audit Express 2 minutes → https://vyxo.fr/audit-express"

STYLE:
- Minimaliste et premium
- Couleurs: Bleu marine (#1e3a8a) + Or (#d4af37)
- Police: Inter
- Mise en page claire et aérée
`.trim()
}
