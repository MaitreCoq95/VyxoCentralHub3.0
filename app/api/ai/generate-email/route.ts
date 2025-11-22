import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(req: Request) {
  try {
    const { prospectName, companyName, industry, tone } = await req.json()

    const prompt = `
      You are an expert sales copywriter for Vyxo Consulting, a premium consulting firm.
      Write a personalized cold email to ${prospectName} at ${companyName} in the ${industry} industry.
      
      The tone should be ${tone || 'professional and confident'}.
      
      Highlight our expertise in digital transformation and operational excellence.
      Keep it concise (under 200 words).
      End with a clear call to action for a 15-minute discovery call.
      
      Subject line: [Create a catchy subject line]
      Body: [Email body]
    `

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: prompt,
    })

    return Response.json({ text })
  } catch (error) {
    console.error('AI Generation Error:', error)
    return Response.json({ error: 'Failed to generate email' }, { status: 500 })
  }
}
