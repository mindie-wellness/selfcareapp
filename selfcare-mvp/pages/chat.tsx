import { useState } from 'react'

type Msg = { role: 'user'|'assistant', content: string }

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')

  const send = async () => {
    const content = input.trim()
    if (!content) return
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')

    const res = await fetch('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: next })
    })
    const data = await res.json()
    setMessages([...next, { role: 'assistant', content: data.reply }])
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">AI Coach</h1>
      <div className="space-y-2">
        {messages.map((m,i)=> (
          <div key={i} className={`p-2 rounded ${m.role==='user'?'bg-slate-100':'bg-white border'}`}>{m.content}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 border rounded px-3 py-2 bg-white" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about stress, sleep, habits…"/>
        <button onClick={send} className="px-4 py-2 rounded bg-black text-white">Send</button>
      </div>
    </div>
  )
}
