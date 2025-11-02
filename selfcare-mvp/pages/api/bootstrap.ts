import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from './_supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { deviceId } = req.body || {}
  if (!deviceId) return res.status(400).json({ error: 'deviceId required' })
  const sb = supabaseAdmin()
  const { error } = await sb.from('devices').insert({ device_id: deviceId }).onConflict('device_id').ignore()
  if (error) return res.status(500).json({ error: error.message })
  return res.json({ ok: true })
}
