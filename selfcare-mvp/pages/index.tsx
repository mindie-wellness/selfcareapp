export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mindie Self‑Care (MVP)</h1>
      <p className="text-sm text-slate-600">Journaling, mood, AI coach, and micro‑tips. No login needed.</p>
      <div className="grid grid-cols-2 gap-3">
        <a href="/journal" className="rounded-xl border p-4 hover:shadow bg-white">📝 Journal</a>
        <a href="/mood" className="rounded-xl border p-4 hover:shadow bg-white">🌤️ Mood</a>
        <a href="/chat" className="rounded-xl border p-4 hover:shadow bg-white">🤖 Ask AI</a>
        <a href="/tips" className="rounded-xl border p-4 hover:shadow bg-white">💡 Tips</a>
      </div>
    </div>
  )
}
