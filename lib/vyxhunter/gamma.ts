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
 * NOTE: This is a placeholder implementation.
 * Gamma API documentation: https://gamma.app/docs/api
 * You will need to:
 * 1. Sign up for Gamma API access
 * 2. Get your API key
 * 3. Add GAMMA_API_KEY to .env.local
 * 4. Update this implementation with actual Gamma API calls
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
    // TODO: Replace with actual Gamma API call
    // Example structure (adjust based on actual Gamma API):
    /*
    const response = await fetch('https://api.gamma.app/v1/slides/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        config: {
          theme: config?.theme || 'professional',
          colors: config?.colors || {
            primary: '#1e3a8a', // Vyxo Navy
            secondary: '#d4af37' // Vyxo Gold
          }
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gamma API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    return {
      slideId: data.id,
      url: data.url,
      status: data.status
    }
    */

    // Temporary mock implementation
    console.log('📊 Generating Gamma slide with prompt:', prompt)
    
    return {
      slideId: `gamma-${Date.now()}`,
      url: `https://gamma.app/docs/presentation-${Date.now()}`,
      status: 'ready'
    }

  } catch (error: any) {
    console.error('❌ Gamma API error:', error)
    
    return {
      slideId: '',
      url: '',
      status: 'failed',
      error: error.message
    }
  }
}

/**
 * Get Gamma slide details
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
    // TODO: Implement actual Gamma API call
    return {
      url: `https://gamma.app/docs/${slideId}`,
      status: 'ready',
      viewsCount: 0
    }
  } catch (error: any) {
    console.error('❌ Error fetching Gamma slide:', error)
    throw error
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
