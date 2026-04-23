const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

type MessagesType = [
    { role: 'system', content: string },
    { role: 'user', content: string }
]

async function groqRequest(model: string, messages: MessagesType) {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({ model, messages })
  });

  if (!res.ok) throw new Error(`Groq error: ${res.status} ${await res.text()}`);

  const data = await res.json() as any;
  return data.choices[0].message.content;
}

export async function groqLlama(systemPrompt: string, userPrompt: string) {
  return groqRequest('llama-3.3-70b-versatile', [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
]);
}

export async function groqGPT(systemPrompt: string, userPrompt: string) {
  return groqRequest('openai/gpt-oss-120b', [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
]);
}

export async function groqFast(systemPrompt: string, userPrompt: string) {
  return groqRequest('llama-3.1-8b-instant', [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
]);
}