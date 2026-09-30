"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: "24/7", label: "Asesoría & Soporte Médico" },
    { value: "3 Ramos", label: "Salud, Vida & Inversión" },
    { value: "100%", label: "Gestión Digital & Presencial" },
    { value: "Top 10", label: "Aseguradoras Aliadas" },
  ];

  const Wrapper = mounted ? motion.div : "div";
  const WrapperH1 = mounted ? motion.h1 : "h1";
  const WrapperP = mounted ? motion.p : "p";

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <section
      id="inicio"
      className="relative -mt-[74px] pt-[74px] overflow-hidden bg-[#08080C] text-slate-100 transition-colors duration-500 font-sans min-h-[70vh] lg:h-[100dvh] lg:max-h-[850px] flex flex-col justify-between"
      aria-labelledby="hero-title"
    >
      {/* ===== IMAGEN DE FONDO SÚPER NÍTIDA (CRISTALINA) ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/vitalseguros-hero.webp"
          alt="Familia protegida y saludable por Vital Seguros"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right] sm:object-right lg:object-[75%_center] saturate-[1.08] contrast-[1.03] brightness-[1.02]"
        />

        {/* PELÍCULA DIRECCIONAL: OSCURA A LA IZQUIERDA PARA TEXTO ULTRA-LEGIBLE, 100% TRANSPARENTE A LA DERECHA */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#08080C] via-[#08080C]/85 md:via-[#08080C]/55 to-transparent z-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Gradiente inferior para fundirse armónicamente */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08080C] via-[#08080C]/50 to-transparent z-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Gradiente superior suave para la barra de navegación */}
        <div
          className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#08080C]/70 to-transparent z-0 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Sutil halo ámbar en el fondo para calidez editorial */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* ===== CONTENIDO PRINCIPAL COMPACTO (REDUCCIÓN ~30% DE ALTO) ===== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10 flex-1 flex flex-col justify-center">
        <Wrapper
          {...(mounted ? { initial: "hidden", animate: "visible", variants: stagger } : {})}
          className="max-w-2xl lg:max-w-3xl space-y-4 text-left"
        >
          {/* Eyebrow Badge */}
          <Wrapper {...(mounted ? { variants: fadeUp } : {})} className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#08080C]/80 border border-[#C9A84C]/40 text-[#E0C068] text-[11px] font-mono font-semibold tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span>Vital Seguros &bull; Protección Patrimonial &amp; Salud Élite</span>
          </Wrapper>

          {/* Título Principal */}
          <WrapperH1
            {...(mounted ? { variants: fadeUp } : {})}
            id="hero-title"
            className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-white leading-[1.08]"
          >
            Tu vida. Tu salud. <br />
            <span className="font-light italic text-[#E0C068]">Tu futuro</span> con respaldo.
          </WrapperH1>

          {/* Descripción / Propuesta de Valor */}
          <WrapperP
            {...(mounted ? { variants: fadeUp } : {})}
            className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-sm"
          >
            Pólizas de seguro de alta cobertura en Ahorro, Vida y Salud Médica Internacional. Respaldo garantizado en dólares y acceso a los mejores hospitales de Ecuador y el mundo.
          </WrapperP>

          {/* ===== BOTÓN GRANDOTE DE REALIZA TU COTIZACIÓN + SECUNDARIOS ===== */}
          <Wrapper
            {...(mounted ? { variants: fadeUp } : {})}
            className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
          >
            {/* BOTÓN GRANDOTE PRINCIPAL */}
            <a
              href="#cotizador-salud"
              className="group px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E5C778] to-[#C9A84C] text-[#0A0A0F] font-extrabold text-xs sm:text-sm uppercase tracking-[0.14em] hover:brightness-110 hover:shadow-[0_0_35px_rgba(201,168,76,0.45)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#0A0A0F] group-hover:rotate-12 transition-transform duration-300" />
              <span>Realiza tu cotización</span>
              <ArrowRight className="w-4 h-4 text-[#0A0A0F] group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* BOTÓN SECUNDARIO ASESOR WHATSAPP */}
            <a
              href="https://wa.me/593995451814?text=Hola%20VitalSeguros,%20deseo%20una%20reunion%20de%20diagnostico%20sin%20costo%20sobre%20seguros"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 sm:py-4 rounded-xl border border-white/20 bg-[#08080C]/70 hover:bg-white/10 hover:border-[#C9A84C] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer backdrop-blur-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#E0C068]" />
              <span>Hablar con un Asesor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </a>
          </Wrapper>

          {/* Puntos de Confianza / Trust Signals */}
          <Wrapper
            {...(mounted ? { variants: fadeUp } : {})}
            className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-slate-300 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E0C068]" />
              <span>Respaldo BMI Financial Group</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E0C068]" />
              <span>Deducible reducido 50% en Ecuador</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E0C068]" />
              <span>Atención Médica 24/7</span>
            </div>
          </Wrapper>
        </Wrapper>
      </div>

      {/* ===== BARRA DE ESTADÍSTICAS: EXACTAMENTE AL FINAL DE LA PANTALLA (COMPACTA Y ELEGANTE) ===== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 pb-4 sm:pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 pt-3 sm:pt-4 border-t border-white/10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-2.5 sm:p-3.5 rounded-xl bg-[#08080C]/80 border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-300 text-center sm:text-left"
            >
              <div className="text-xl sm:text-2xl font-serif font-extrabold text-[#E0C068]">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5 font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}