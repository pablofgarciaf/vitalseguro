"use client";

import { Shield, Globe, PhoneCall, CheckCircle } from "lucide-react";

const PILLARS = [
  {
    icon: <Globe className="w-5 h-5 text-[#C9A84C]" />,
    title: "Cobertura Nacional y Red Global",
    description:
      "Protección médica y patrimonial en todo el territorio ecuatoriano, con acceso preferencial a las redes hospitalarias de élite en EE.UU., Latinoamérica y Europa.",
  },
  {
    icon: <Shield className="w-5 h-5 text-[#C9A84C]" />,
    title: "Relaciones Basadas en Confianza y Ética",
    description:
      "Analizamos tus necesidades reales sin costos ocultos ni letra pequeña. Comparamos las pólizas de aseguradoras líderes para darte la opción justa a tu medida.",
  },
  {
    icon: <PhoneCall className="w-5 h-5 text-[#C9A84C]" />,
    title: "Atención Humana y Personalizada 24/7",
    description:
      "En caso de emergencia médica o siniestro vehicular, te atiendes directamente con Gabriel Jácome y su equipo. Cero call centers despersonalizados.",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-[#C9A84C]" />,
    title: "Gestión Integral de Siniestros",
    description:
      "Nuestro trabajo inicia realmente después de la contratación: tramitamos, defendemos y acompañamos cada siniestro ante la aseguradora hasta su cobro efectivo.",
  },
];

export default function Intro() {
  return (
    <section
      id="diferenciales"
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-black/5 dark:border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-16 pb-8 border-b border-black/8 dark:border-white/8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-mono font-medium">
                Filosofía y Respaldo &bull; DC Asesores
              </span>
            </div>
            <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-[#D4D4D4] leading-tight">
              Más que una póliza,{" "}
              <span className="text-gold-gradient font-normal italic">
                un respaldo incondicional
              </span>{" "}
              en los momentos decisivos.
            </h2>
          </div>
          <p className="text-zinc-600 dark:text-[#A9A9A9] text-sm sm:text-base max-w-md leading-relaxed font-sans">
            En alianza con DC Asesores, combinamos conocimiento técnico del sector asegurador, cercanía familiar y gestión estratégica con las compañías más solventes del Ecuador.
          </p>
        </div>

        {/* 4 Pillars Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PILLARS.map((p, idx) => (
            <div
              key={idx}
              className="rounded-[20px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-sm p-6 hover:border-[#C9A84C]/30 transition-all duration-300 relative overflow-hidden group shadow-sm flex flex-col justify-between"
            >
              {/* Subtle hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-[20px] pointer-events-none"
                aria-hidden="true"
              />

              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/8">
                  {p.icon}
                </div>
                <h3 className="font-serif font-light text-lg sm:text-xl text-zinc-900 dark:text-[#D4D4D4] mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-zinc-600 dark:text-[#8E8E93] text-xs sm:text-sm leading-relaxed font-sans">
                  {p.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A84C]">
                  Pilar 0{idx + 1}
                </span>
                <span className="text-xs text-[#6B6B6B] group-hover:translate-x-1 group-hover:text-[#C9A84C] transition-all duration-200">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}