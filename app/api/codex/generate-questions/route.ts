import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { moduleId, moduleName, count = 5, difficulty = 'medium' } = await req.json();

    // Vérifier la clé API
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('❌ OPENAI_API_KEY is missing');
      return Response.json({ error: 'Server configuration error: API Key missing' }, { status: 500 });
    }

    const prompt = `
Tu es un expert en systèmes de management, normes ISO, GDP, GMP, CEIV, et excellence opérationnelle.
Ton rôle est de générer des questions de quiz éducatives et pertinentes.

MODULE : ${moduleName} (ID: ${moduleId})
NOMBRE DE QUESTIONS : ${count}
DIFFICULTÉ : ${difficulty}

INSTRUCTIONS :
- Génère ${count} questions de quiz sur le module "${moduleName}"
- Niveau de difficulté : ${difficulty} (easy = facile, medium = intermédiaire, hard = avancé)
- Chaque question doit avoir 4 choix de réponse
- Une seule réponse correcte par question
- Fournis une explication claire et pédagogique pour chaque réponse

CRITÈRES DE QUALITÉ :
- Questions claires et sans ambiguïté
- Réponses plausibles mais une seule correcte
- Explications qui ajoutent de la valeur pédagogique
- Variété dans les types de questions (définitions, applications pratiques, cas d'usage)

RETOURNE UN JSON EXACTEMENT DANS CE FORMAT :
{
  "questions": [
    {
      "question": "Question ici ?",
      "difficulty": "${difficulty}",
      "choices": ["Choix A", "Choix B", "Choix C", "Choix D"],
      "correctIndex": 2,
      "explanation": "Explication détaillée de la réponse correcte...",
      "tags": ["tag1", "tag2"]
    }
  ]
}
`;

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    });

    // Parse la réponse JSON
    let jsonResponse;
    try {
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      jsonResponse = JSON.parse(cleanText);
    } catch (e) {
      console.error('Failed to parse AI JSON response:', text);
      return Response.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 });
    }

    // Ajouter moduleId à chaque question
    if (jsonResponse.questions && Array.isArray(jsonResponse.questions)) {
      jsonResponse.questions = jsonResponse.questions.map((q: any, index: number) => ({
        id: `ai-${moduleId}-${Date.now()}-${index}`,
        moduleId: moduleId,
        ...q
      }));
    }

    return Response.json(jsonResponse);
  } catch (error: any) {
    console.error('💥 AI Quiz Generation Error:', error);
    return Response.json({
      error: error.message || 'Failed to generate quiz questions',
      details: error.toString()
    }, { status: 500 });
  }
}
