import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from './_supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const deviceId = (req.headers['x-device-id'] as string) || (req.query.deviceId as string)
  const sb = supabaseAdmin()

  if (req.method === 'GET') {
    if (!deviceId) return res.status(400).json({ error: 'deviceId required' })
    const { data, error } = await sb.from('moods').select('*').eq('device_id', deviceId).order('created_at', { ascending: false }).limit(50)
    if (error) return res.status(500).json({ error: error.message })
    return res.json({ items: data })
  }
  if (req.method === 'POST') {
    const { mood, note } = req.body || {}
    if (!deviceId) return res.status(400).json({ error: 'deviceId required (header x-device-id)' })
    if (!mood) return res.status(400).json({ error: 'mood required' })
    const { data, error } = await sb.from('moods').insert({ device_id: deviceId, mood, note }).select('*').single()
    if (error) return res.status(500).json({ error: error.message })
    return res.json({ item: data })
  }
  return res.status(405).end()
}
