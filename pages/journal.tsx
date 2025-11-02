import { useEffect, useState } from 'react'

export default function Journal() {
  const [entries, setEntries] = useState<any[]>([])
  const [content, setContent] = useState('')

  const load = async () => {
    const res = await fetch('/api/journal')
    const data = await res.json()
    setEntries(data.items || [])
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!content.trim()) return
    await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    setContent('')
    load()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Journal</h1>
      <textarea className="w-full border rounded p-3 bg-white" rows={6} value={content} onChange={e=>setContent(e.target.value)} placeholder="Write anything…"/>
      <button onClick={save} className="px-4 py-2 rounded bg-black text-white">Save & get AI summary</button>
      <div className="space-y-3">
        {entries.map((e:any)=> (
          <div key={e.id} className="border rounded p-3 bg-white">
            <div className="text-xs text-slate-500">{new Date(e.created_at).toLocaleString()}</div>
            <div className="whitespace-pre-wrap mt-1">{e.content}</div>
            {e.ai_summary && <div className="mt-2 text-sm bg-slate-50 border rounded p-2">🤖 {e.ai_summary}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
