import Groq from 'groq-sdk'

export const callAI = async (prompt) => {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) throw new Error('GROQ_API_KEY not configured')

  const client = new Groq({ apiKey })

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 4096,
    temperature: 0.1,
    messages: [{ role: 'user', content: prompt }],
  })

  const rawText = response.choices[0].message.content
  const cleaned = rawText.replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned)
}