import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { prospectName, companyName, industry, triggerEvent, painPoint, valueProp, cta } = await req.json()

    const prompt = `
# ROLE & OBJECTIVE
You are an elite B2B Sales Strategist and Copywriter. Your goal is to generate high-intensity, hyper-personalized cold outreach campaigns. You do not write generic emails; you write conversations that convert.

# INPUT VARIABLES
- Prospect Name: ${prospectName}
- Company: ${companyName}
- Industry: ${industry}
- Context/Trigger: ${triggerEvent || 'General industry trend'}
- Pain Point: ${painPoint || 'Inefficient processes'}
- My Value Proposition: ${valueProp || 'Operational excellence and digital transformation'}
- My Goal/CTA: ${cta || '15-minute discovery call'}

# STRATEGIC RULES
1. **NO FLUFF:** Ban phrases like "I hope you are well", "Just checking in", "I wanted to reach out".
2. **THE "ICEBREAKER" RULE:** The first sentence MUST reference the Context/Trigger or a specific observation about ${companyName}. Prove you are not a bot.
3. **THE GAP:** articulate the gap between their current situation (Pain Point) and the future state (Value Prop).
4. **TONE:** Conversational, peer-to-peer, confident. Write like a human, not a marketing brochure.
5. **FORMAT:** Short paragraphs. Max 120 words per email.

# TASK
Generate a JSON output containing 3 distinct variations of the initial email AND a follow-up sequence.

## 1. VARIATION A: The "Sniper" (Direct & Trigger-based)
Focus heavily on the Context/Trigger. Tie it immediately to the solution. Best for high-intent prospects.

## 2. VARIATION B: The "Problem-First" (Pain-Agitation-Solution)
Focus on the Pain Point. Agitate the problem (what happens if they don't fix it?), then present the solution.

## 3. VARIATION C: The "Low Friction" (Curiosity-based)
A shorter, intriguing email. Ask a question related to their industry without pitching hard.

## 4. FOLLOW-UP SEQUENCE (The "Drip")
- **Follow-up 1 (Day +3):** Short bump + a resource or case study mention (Value add).
- **Follow-up 2 (Day +7):** The "Break-up" or final pivot.

# OUTPUT FORMAT (Strict JSON Structure)
Return ONLY raw JSON.

{
  "analysis": "One sentence analyzing why this angle works for this prospect.",
  "variations": [
    {
      "type": "Sniper",
      "subject": "...",
      "body": "..."
    },
    {
      "type": "Problem-First",
      "subject": "...",
      "body": "..."
    },
    {
      "type": "Low-Friction",
      "subject": "...",
      "body": "..."
    }
  ],
  "sequence": [
    {
      "step": "Follow-up Day 3",
      "subject": "Re: [Original Subject]",
      "body": "..."
    },
    {
      "step": "Follow-up Day 7",
      "subject": "Re: [Original Subject]",
      "body": "..."
    }
  ]
}
    `

    // Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('❌ OPENAI_API_KEY is missing')
      return Response.json({ error: 'Server configuration error: API Key missing' }, { status: 500 })
    }

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })

    // Parse the JSON response
    let jsonResponse
    try {
      // Clean up potential markdown code blocks if the AI adds them
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
      jsonResponse = JSON.parse(cleanText)
    } catch (e) {
      console.error('Failed to parse AI JSON response:', text)
      return Response.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 })
    }

    return Response.json(jsonResponse)
  } catch (error: any) {
    console.error('💥 AI Generation Error:', error)
    // Return the actual error message for debugging
    return Response.json({ 
      error: error.message || 'Failed to generate email',
      details: error.toString()
    }, { status: 500 })
  }
}
