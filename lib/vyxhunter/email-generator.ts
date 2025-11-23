import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import type { VyxHunterCompany, VyxHunterAnalysis } from '@/lib/vyxhunter/types'

/**
 * Generate personalized email for VyxHunter prospect
 * Uses Vivien's signature style: direct, human, professional
 */
}

Pour bodyHtml, utilise des <p> pour les paragraphes et <a> pour les liens. Style simple et professionnel.
`.trim()

  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })

    // Parse JSON response
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
    const emailData = JSON.parse(cleanText)

    // Validate required fields
    if (!emailData.subject || !emailData.bodyText || !emailData.bodyHtml) {
      throw new Error('Invalid email response: missing required fields')
    }

    return {
      subject: emailData.subject,
      bodyText: emailData.bodyText,
      bodyHtml: emailData.bodyHtml
    }
  } catch (error: any) {
    console.error('❌ Email generation error:', error)
    throw new Error(`Failed to generate email: ${error.message}`)
  }
}

/**
 * Generate email subject line only (for quick preview)
 */
export async function generateEmailSubject(
  companyName: string,
  sector: string,
  entryAngle: string
): Promise<string> {
  const prompt = `
Génère un objet d'email de prospection B2B pour ${companyName} (${sector}).
Angle : ${entryAngle}

Style : Direct, intrigant, personnalisé. Max 50 caractères.
Exemples : "Question rapide ${companyName}", "${sector} : gain de temps ?", "Optimisation process chez vous ?"

Retourne UNIQUEMENT l'objet, sans guillemets ni formatage.
`.trim()

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'), // Use mini for simple tasks
      prompt: prompt,
    })

    return text.trim().replace(/^["']|["']$/g, '') // Remove quotes if present
  } catch (error: any) {
    console.error('❌ Subject generation error:', error)
    return `Optimisation opérationnelle ${companyName}`
  }
}
