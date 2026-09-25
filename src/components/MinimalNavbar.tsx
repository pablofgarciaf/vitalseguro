import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function MinimalNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-black/30 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-[74px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#8C6D23] flex items-center justify-center font-serif font-bold text-[#0A0A0F] text-xl shadow-lg shadow-[#C9A84C]/20 group-hover:scale-105 transition-transform">
            V
          </div>
          <span className="text-lg font-serif font-bold text-zinc-900 dark:text-white tracking-wide">
            Vital Seguros
          </span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-slate-400">
          <Lock className="w-3.5 h-3.5" />
          Conexión Segura
        </div>
      </div>
    </nav>
  );
}
