import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from './_supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sb = supabaseAdmin()
  const { data, error } = await sb.from('tips').select('*').order('created_at', { ascending: false }).limit(50)
  if (error) return res.status(500).json({ error: error.message })
  return res.json({ items: data })
}
