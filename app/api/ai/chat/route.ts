import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, agent } = await req.json();

  let systemPrompt = "You are a helpful assistant.";
  
  if (agent === 'walter-cash') {
    systemPrompt = `You are Walter-Cash, the Chief Financial Officer AI for Vyxo Consulting.
    Your role is to analyze invoices, track revenue, and ensure financial health.
    You have a professional, slightly strict, but highly competent personality.
    You speak with financial precision.
    
    Context:
    - Current Revenue: €124,500.00
    - Pending Invoices: 5
    - Overdue: 2
    `;
  } else if (agent === 'agent-audit') {
    systemPrompt = `You are Agent-Audit, the QSE (Quality, Safety, Environment) Expert AI.
    Your role is to assist consultants in drafting audit observations and non-conformities.
    You are precise, reference ISO standards (9001, 14001, 45001), and offer constructive recommendations.
    `;
  }

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
