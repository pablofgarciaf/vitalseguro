"use client";

import { TrendingUp, Shield, HeartPulse, Sparkles, ArrowUpRight } from "lucide-react";

export default function BentoGrid() {
  return (
    <section
      id="bento"
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-black/5 dark:border-white/5 relative"
      aria-labelledby="bento-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-mono font-semibold">
              Arquitectura de Cobertura
            </span>
          </div>
          <h2
            id="bento-title"
            className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-[#D4D4D4] leading-tight"
          >
            Tres pilares diseñados para tu{" "}
            <span className="text-gold-gradient font-normal italic">
              absoluta tranquilidad
            </span>
          </h2>
          <p className="text-[#86868B] dark:text-[#A9A9A9] text-sm sm:text-base mt-3 leading-relaxed font-sans">
            Una distribución modular inspirada en la precisión y elegancia de Apple. Cada póliza se adapta a tu etapa de vida.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 1. Bloque Grande (Izquierda / 7 Cols): Plan de Ahorro e Inversión (Apple Card Style Growth) */}
          <div className="lg:col-span-7 rounded-[32px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl hover:border-[#C9A84C]/40 relative overflow-hidden group">
            {/* Ambient Background Gradient */}
            <div
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#C9A84C]/15 to-transparent blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-[#C9A84C] font-semibold">
                  Rendimiento & Capitalización
                </span>
              </div>

              <h3 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl text-zinc-900 dark:text-[#D4D4D4] mb-3 leading-tight">
                Plan de Ahorro e Inversión
              </h3>
              <p className="text-[#86868B] dark:text-[#A9A9A9] text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-sans">
                Haz crecer tu dinero con un respaldo garantizado. Estructurado para asegurar el fondo universitario de tus hijos o tu retiro en dólares, libre de impuestos.
              </p>

              {/* Clean Apple Card Style Growth Chart SVG */}
              <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/30 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs text-zinc-500 dark:text-[#86868B] font-mono block">Proyección 15 años</span>
                    <span className="font-serif font-light text-2xl sm:text-3xl text-zinc-900 dark:text-white">$164,850 USD</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    +18.4% acum.
                  </span>
                </div>

                <svg viewBox="0 0 500 130" className="w-full h-24 overflow-visible" fill="none">
                  <defs>
                    <linearGradient id="appleChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d="M 0 110 Q 120 100 240 65 T 500 15 L 500 130 L 0 130 Z"
                    fill="url(#appleChartGrad)"
                  />
                  {/* Curved stroke */}
                  <path
                    d="M 0 110 Q 120 100 240 65 T 500 15"
                    stroke="#C9A84C"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Glowing end point */}
                  <circle cx="500" cy="15" r="5" fill="#F5D78A" className="animate-pulse" />
                  <circle cx="500" cy="15" r="9" stroke="#C9A84C" strokeWidth="2" strokeOpacity="0.5" />
                </svg>

                <div className="flex justify-between text-[10px] font-mono text-zinc-400 dark:text-zinc-500 pt-3 border-t border-black/5 dark:border-white/5">
                  <span>Año 01: $12k</span>
                  <span>Año 05: $48k</span>
                  <span>Año 10: $98k</span>
                  <span>Año 15: $165k</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
              <span className="font-mono text-xs text-[#C9A84C] font-semibold tracking-wide">
                Interés compuesto protegido
              </span>
              <a
                href="https://wa.me/593995451814?text=Hola%20Gabriel,%20deseo%20evaluar%20un%20Plan%20de%20Ahorro%20e%20Inversion"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-800 dark:text-white group-hover:bg-[#C9A84C] group-hover:text-black group-hover:border-transparent transition-all"
                aria-label="Saber más sobre el Plan de Ahorro"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column (5 Cols) with Two Stacked Squares */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 2. Bloque Mediano (Derecha Arriba): Seguro de Vida */}
            <div className="rounded-[32px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-xl p-8 flex-1 flex flex-col justify-between transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl hover:border-[#C9A84C]/40 group relative">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-white border border-black/5 dark:border-white/10">
                    <Shield className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9]">
                    Legado & Certeza
                  </span>
                </div>

                <h3 className="font-serif font-light text-2xl sm:text-3xl text-zinc-900 dark:text-[#D4D4D4] mb-2 leading-snug">
                  Seguro de Vida
                </h3>
                <p className="text-[#86868B] dark:text-[#A9A9A9] text-xs sm:text-sm leading-relaxed font-sans mb-6">
                  Tu tranquilidad y el futuro de los tuyos. Sumas aseguradas de alta liquidez que se transfieren a tu familia sin trabas sucesorias ni demoras legales.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-700 dark:text-[#D4D4D4] font-medium">
                  Desde $50,000 hasta $1,000,000+
                </span>
                <a
                  href="https://wa.me/593995451814?text=Hola%20Gabriel,%20deseo%20cotizar%20un%20Seguro%20de%20Vida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-800 dark:text-white group-hover:bg-[#C9A84C] group-hover:text-black transition-all"
                  aria-label="Cotizar Seguro de Vida"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 3. Bloque Mediano (Derecha Abajo): Seguro de Salud */}
            <div className="rounded-[32px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-xl p-8 flex-1 flex flex-col justify-between transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-2xl hover:border-[#C9A84C]/40 group relative">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-white border border-black/5 dark:border-white/10">
                    <HeartPulse className="w-5 h-5 text-rose-500" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Telemedicina 24/7
                  </span>
                </div>

                <h3 className="font-serif font-light text-2xl sm:text-3xl text-zinc-900 dark:text-[#D4D4D4] mb-2 leading-snug">
                  Seguro de Salud
                </h3>
                <p className="text-[#86868B] dark:text-[#A9A9A9] text-xs sm:text-sm leading-relaxed font-sans mb-6">
                  Atención médica inmediata estés donde estés. Cobertura en las principales clínicas de Ecuador y acceso a hospitales de alta especialidad en el exterior.
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-700 dark:text-[#D4D4D4] font-medium">
                  Cobertura hospitalaria 100%
                </span>
                <a
                  href="https://wa.me/593995451814?text=Hola%20Gabriel,%20deseo%20cotizar%20un%20Seguro%20de%20Salud%20Medica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-800 dark:text-white group-hover:bg-[#C9A84C] group-hover:text-black transition-all"
                  aria-label="Cotizar Seguro de Salud"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
