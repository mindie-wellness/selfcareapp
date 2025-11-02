import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { messages } = req.body || {}
  if (!Array.isArray(messages)) return res.status(400).json({ error: 'messages array required' })

  const system = {
    role: 'system',
    content: 'You are a warm, evidence-informed self-care coach. Be concise, non-judgmental, actionable. Avoid medical diagnosis. Encourage professional help when risk is mentioned.'
  } as const

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [system as any, ...messages],
    temperature: 0.6,
  })

  const reply = completion.choices[0]?.message?.content || 'I am here for you.'
  res.json({ reply })
}
