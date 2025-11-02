import { useEffect, useState } from 'react'
const MOODS = ['great','good','okay','low','bad'] as const

export default function Mood() {
  const [items, setItems] = useState<any[]>([])
  const [mood, setMood] = useState<string>('okay')
  const [note, setNote] = useState('')

  const load = async () => {
    const res = await fetch('/api/mood', { headers: { 'x-device-id': localStorage.getItem('deviceId') || '' } })
    const data = await res.json()
    setItems(data.items || [])
  }
  useEffect(()=>{ load() },[])

  const save = async () => {
    await fetch('/api/mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-device-id': localStorage.getItem('deviceId') || '' },
      body: JSON.stringify({ mood, note })
    })
    setNote('')
    load()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Mood Tracker</h1>
      <div className="flex gap-2 flex-wrap">
        {MOODS.map(m => (
          <button key={m} onClick={()=>setMood(m)} className={`px-3 py-2 rounded border bg-white ${m===mood?'bg-black text-white':''}`}>{m}</button>
        ))}
      </div>
      <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a note (optional)" className="border rounded px-3 py-2 w-full bg-white"/>
      <button onClick={save} className="px-4 py-2 rounded bg-black text-white">Save</button>

      <div className="space-y-2">
        {items.map((i:any) => (
          <div key={i.id} className="border rounded p-3 bg-white">
            <div className="text-xs text-slate-500">{new Date(i.created_at).toLocaleString()}</div>
            <div className="capitalize font-medium">{i.mood}</div>
            {i.note && <div className="text-sm text-slate-700">{i.note}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
