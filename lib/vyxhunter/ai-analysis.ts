import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import type { VyxHunterCompany, VyxHunterAnalysis } from '@/lib/vyxhunter/types'

/**
 * Analyze a company using OpenAI GPT-4o
 * Returns business insights, pain points, opportunities, and relevance score
 */
export async function analyzeCompany(
  company: VyxHunterCompany
): Promise<Omit<VyxHunterAnalysis, 'id' | 'created_at' | 'company_id' | 'organization_id'>> {
  
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured')
  }

  const prompt = `
Tu es un expert en analyse commerciale B2B pour Vyxo Consulting, cabinet spécialisé en excellence opérationnelle.

CONTEXTE VYXO CONSULTING :
- Expertise : Excellence opérationnelle, optimisation des process, mise en conformité (ISO, GDP, HACCP)
- Secteurs cibles : Transport/Logistique, Agroalimentaire, Pharma, Industrie, Startups en croissance
- Proposition de valeur : Clarté, rapidité, résultats concrets
- Approche : Audits express, accompagnement pragmatique, digitalisation

ENTREPRISE À ANALYSER :
- Nom : ${company.name}
- Secteur : ${company.sector || 'Non spécifié'}
- Taille : ${company.size_range || 'Non spécifié'} employés
- Localisation : ${company.location || 'Non spécifié'}
- Site web : ${company.website || 'Non disponible'}
- Description : ${company.description || 'Non disponible'}
- Transition de maturité : ${company.maturity_transition || 'Non spécifié'}

MISSION :
Analyse cette entreprise pour déterminer si elle est un bon prospect pour Vyxo Consulting.

ANALYSE REQUISE :

1. **business_summary** (3 lignes max) :
   - Résumé de l'activité et du contexte
   - Niveau de maturité opérationnelle estimé
   - Potentiel de croissance

2. **pains** (array de 3-5 points de douleur probables) :
   - Points de friction opérationnels typiques pour ce type d'entreprise
   - Problèmes de conformité potentiels
   - Défis de croissance ou de structuration

3. **opportunities** (array de 3-4 opportunités) :
   - Axes d'amélioration concrets
   - Gains rapides possibles
   - Valeur ajoutée Vyxo

4. **entry_angle** (1-2 lignes) :
   - Meilleur angle d'approche commercial
   - Accroche personnalisée pour ce prospect

5. **quick_wins** (array de exactement 3 gains rapides) :
   - Résultats concrets et mesurables
   - Réalisables en 1-3 mois
   - Format : "Verbe d'action + résultat chiffré si possible"

6. **relevance_score** (0-100) :
   - 80-100 : Prospect idéal (secteur cible, taille adaptée, fort potentiel)
   - 60-79 : Bon prospect (quelques critères manquants)
   - 40-59 : Prospect moyen (nécessite qualification)
   - 0-39 : Faible pertinence

7. **confidence_level** ('high' | 'medium' | 'low') :
   - high : Informations complètes, secteur connu
   - medium : Informations partielles
   - low : Peu d'informations, secteur inconnu

RETOURNE UNIQUEMENT UN JSON VALIDE DANS CE FORMAT EXACT :
{
  "business_summary": "...",
  "pains": ["...", "...", "..."],
  "opportunities": ["...", "...", "..."],
  "entry_angle": "...",
  "quick_wins": ["...", "...", "..."],
  "relevance_score": 85,
  "confidence_level": "high",
  "model_used": "gpt-4o",
  "prompt_version": "v1"
}
`.trim()

  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })

    // Parse JSON response
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
    const analysis = JSON.parse(cleanText)

    // Validate required fields
    if (!analysis.business_summary || !analysis.pains || !analysis.opportunities || 
        !analysis.entry_angle || !analysis.quick_wins || 
        typeof analysis.relevance_score !== 'number' || !analysis.confidence_level) {
      throw new Error('Invalid analysis response: missing required fields')
    }

    return {
      business_summary: analysis.business_summary,
      pains: analysis.pains,
      opportunities: analysis.opportunities,
      entry_angle: analysis.entry_angle,
      quick_wins: analysis.quick_wins,
      relevance_score: analysis.relevance_score,
      confidence_level: analysis.confidence_level,
      model_used: 'gpt-4o',
      prompt_version: 'v1',
      tokens_used: undefined // Could be extracted from AI SDK response
    }
  } catch (error: any) {
    console.error('❌ AI Analysis error:', error)
    throw new Error(`Failed to analyze company: ${error.message}`)
  }
}
