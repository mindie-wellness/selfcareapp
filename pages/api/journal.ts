import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from './_supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const deviceId = (req.body && req.body.deviceId) || (req.query.deviceId as string) || (req.headers['x-device-id'] as string)
  const sb = supabaseAdmin()

  if (req.method === 'GET') {
    if (!deviceId) return res.status(400).json({ error: 'deviceId required' })
    const { data, error } = await sb
      .from('journal_entries')
      .select('*')
      .eq('device_id', deviceId)
      .order('created_at', { ascending: false })
      .limit(50)
    if (error) return res.status(500).json({ error: error.message })
    return res.json({ items: data })
  }

  if (req.method === 'POST') {
    const { content } = req.body || {}
    if (!deviceId) return res.status(400).json({ error: 'deviceId required' })
    if (!content) return res.status(400).json({ error: 'content required' })
    const { data, error } = await sb
      .from('journal_entries')
      .insert({ device_id: deviceId, content })
      .select('*')
      .single()
    if (error) return res.status(500).json({ error: error.message })
    return res.json({ item: data })
  }

  return res.status(405).end()
}
