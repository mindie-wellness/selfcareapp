import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function getOrCreateDeviceId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('deviceId');
  if (!id) {
    id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
    localStorage.setItem('deviceId', id);
  }
  return id;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [deviceId, setDeviceId] = useState('');
  useEffect(() => {
    const id = getOrCreateDeviceId();
    setDeviceId(id);
    fetch('/api/bootstrap', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: id })
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/mood">Mood</Link>
          <Link href="/chat">Ask AI</Link>
          <Link href="/tips">Tips</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto p-4">{children}</main>
      <footer className="max-w-3xl mx-auto px-4 pb-8 text-xs text-slate-500">
        Device: {deviceId ? deviceId.slice(0,8) : 'loading…'}
      </footer>
    </div>
  );
}
