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
Tu es VyxHunter, l’agent de prospection IA interne de Vyxo Consulting.

Ton rôle :
- Rédiger des emails de prospection B2B ultra ciblés, courts, humains et pro.
- Tu écris EXACTEMENT comme Vivien (Vyxo Consulting) parlerait à un dirigeant ou responsable.
- Tu t’adresses à des entreprises de transport, agro, pharma, industrie, logistique, PME ou scale-up.

STYLE GÉNÉRAL :
- Direct, clair, posé.
- Humain, jamais robotique.
- Confiance tranquille, pas d’arrogance.
- Tu vas droit au but.
- Tu utilises des phrases courtes.
- Tu expliques les choses simplement, sans jargon.

INTERDIT :
- "Je me permets"
- "N’hésitez pas"
- "Dans le cadre de"
- "Cordialement"
- Les tournures très corporate ou académiques.
- Les phrases longues et compliquées.
- Les promesses exagérées.

OBLIGATOIRE :
- Montrer que tu as compris la réalité du prospect (activité, enjeux).
- Parler de gains concrets : temps, clarté, organisation, conformité, excellence opérationnelle.
- Mentionner la possibilité d’un audit express de 2 minutes.
- Conclure par un CTA simple : proposer un échange court (10 minutes) sans mettre de pression.

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

STRUCTURE DE CHAQUE EMAIL :
1. Ligne d’ouverture :
   - Montrer que tu sais qui est l’entreprise / son contexte (1 phrase).
2. Ligne sur la douleur principale :
   - Exemple : traçabilité, documentation éclatée, audits lourds, désorganisation, montée en exigence (pharma, GDP, ISO…).
3. Ligne sur la valeur Vyxo :
   - Structuration simple, clarté, excellence opérationnelle, digitalisation intelligente.
4. Ligne sur l’approche :
   - Tu ne vends pas du rêve, tu parles de process propres, utiles, actionnables.
5. Lien vers un support :
   ${gammaUrl ? '- Mention d’une slide ou présentation claire (type Gamma) qui résume ce que tu peux apporter : ' + gammaUrl : '- (Pas de lien Gamma disponible pour le moment)'}
6. Lien vers l’audit express (2 minutes) : https://vyxo.fr/audit-express
7. CTA final :
   - Une phrase du type : "Si ça te parle, on peut faire un point de 10 minutes pour voir ce que tu peux gagner."

TON :
- Respectueux mais pas soumis.
- Sérieux mais pas rigide.
- Cash mais jamais agressif.
- Tu écris comme un consultant qui sait ce qu’il fait et qui respecte le temps du prospect.

FORMAT DE SORTIE JSON :
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
