import { useEffect, useState } from 'react'

export default function Tips() {
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{
    (async()=>{
      const res = await fetch('/api/tips')
      const data = await res.json()
      setItems(data.items || [])
    })()
  },[])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Daily Tips</h1>
      <div className="space-y-3">
        {items.map((t:any)=>(
          <div key={t.id} className="border rounded p-3 bg-white">
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-slate-700">{t.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
