import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import type { VyxHunterCompany, VyxHunterAnalysis } from '@/lib/vyxhunter/types'

/**
 * Generate personalized email for VyxHunter prospect
 * Uses Vivien's signature style: direct, human, professional
 */
export async function generateVyxHunterEmail(
  company: VyxHunterCompany,
  analysis: VyxHunterAnalysis,
  gammaUrl?: string,
  emailType: 'initial' | 'follow_up_1' | 'follow_up_2' | 'follow_up_3' = 'initial'
): Promise<{ subject: string; bodyHtml: string; bodyText: string }> {
  
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured')
  }

  // Build context based on email type
  let emailContext = ''
  let ctaText = ''

  switch (emailType) {
    case 'initial':
      emailContext = 'Premier contact avec ce prospect. Email de découverte.'
      ctaText = 'Audit Express 2 minutes'
      break
    case 'follow_up_1':
      emailContext = 'Première relance (3 jours après). Rappel léger avec valeur ajoutée.'
      ctaText = 'Échange rapide de 10 minutes'
      break
    case 'follow_up_2':
      emailContext = 'Deuxième relance (7 jours après). Angle différent ou exemple concret.'
      ctaText = 'Cas client similaire à partager'
      break
    case 'follow_up_3':
      emailContext = 'Dernière relance (14 jours après). Simple et direct, dernière tentative.'
      ctaText = 'Dernière opportunité d\'échange'
      break
  }

  const prompt = `
Tu es Vivien de Vyxo Consulting et tu écris un email de prospection B2B.

STYLE VIVIEN (IMPÉRATIF) :
- Direct, humain, pro, jamais mielleux
- Cash mais respectueux
- Confiance tranquille, pas de survente
- Phrases courtes, fluide, orienté résultats
- INTERDIT : "Je me permets", "N'hésitez pas", "Cordialement", "Je vous remercie par avance", "Dans le cadre de", "Suite à"
- À UTILISER : "Si ça vous parle", "On peut en discuter", "Parlons-en", "Photo claire", "Vrai gain", "Niveau supérieur"

CONTEXTE EMAIL :
Type : ${emailType}
${emailContext}

PROSPECT :
- Entreprise : ${company.name}
- Secteur : ${company.sector || 'Non spécifié'}
- Taille : ${company.size_range || 'Non spécifié'}
- Localisation : ${company.location || 'Non spécifié'}

ANALYSE IA :
- Résumé : ${analysis.business_summary}
- Points de douleur : ${analysis.pains?.join(', ')}
- Angle d'entrée : ${analysis.entry_angle}
- Gains rapides : ${analysis.quick_wins?.join(', ')}

${gammaUrl ? `GAMMA SLIDE : ${gammaUrl}` : ''}

STRUCTURE EMAIL :

**Objet** : Court, intrigant, personnalisé (max 50 caractères)

**Corps** :
1. Accroche personnalisée (1 ligne) - Montrer qu'on a compris leur contexte
2. Point de douleur principal (1-2 lignes) - Problème concret identifié
3. Solution Vyxo (2-3 lignes) - Comment on peut aider, résultats attendus
${gammaUrl ? '4. Lien Gamma (1 ligne) - "J\'ai préparé une slide qui résume notre approche pour vous 👉 [lien]"' : ''}
4. CTA : ${ctaText}

**Signature** :
Bien à vous,
Vivien
Vyxo Consulting
https://vyxo.fr

RÈGLES :
- Email total : 8-12 lignes max (hors signature)
- Ton : Comme si tu parlais à un collègue respecté
- Valeur dès la première ligne
- Un seul CTA clair
- Zéro jargon corporate

RETOURNE JSON EXACTEMENT DANS CE FORMAT :
{
  "subject": "...",
  "bodyText": "...",
  "bodyHtml": "..."
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
