"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Shield, HeartPulse, TrendingUp, Sparkles, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [selectedPlan, setSelectedPlan] = useState<"ahorro" | "vida" | "salud">("ahorro");
  const [coverageIndex, setCoverageIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const PLAN_DATA = {
    ahorro: {
      label: "Ahorro & Retiro",
      badge: "Inversión Garantizada",
      icon: <TrendingUp className="w-4 h-4 text-[#C9A84C]" />,
      levels: [
        { target: "$50,000", monthly: "$75", term: "10 años" },
        { target: "$100,000", monthly: "$140", term: "15 años" },
        { target: "$250,000", monthly: "$310", term: "20 años" },
      ],
      desc: "Capitalización sistemática con rendimiento y seguro de vida integrado.",
      waMsg: "Hola, utilicé el simulador para un Plan de Ahorro con meta de ",
    },
    vida: {
      label: "Vida & Familia",
      badge: "Protección Familiar",
      icon: <Shield className="w-4 h-4 text-[#C9A84C]" />,
      levels: [
        { target: "$100,000", monthly: "$28", term: "Anual renovable" },
        { target: "$300,000", monthly: "$65", term: "Temporal 20 años" },
        { target: "$500,000", monthly: "$98", term: "Vitalicio" },
      ],
      desc: "Liquidez inmediata y blindaje patrimonial para tu familia ante imprevistos.",
      waMsg: "Hola VitalSeguros, calculé una póliza de Seguro de Vida con respaldo de ",
    },
    salud: {
      label: "Salud Médica",
      badge: "Red Élite & Telemedicina",
      icon: <HeartPulse className="w-4 h-4 text-[#C9A84C]" />,
      levels: [
        { target: "$50,000 / año", monthly: "$45", term: "Red Nacional" },
        { target: "$200,000 / año", monthly: "$85", term: "Nacional + Maternidad" },
        { target: "$1,000,000 / año", monthly: "$145", term: "Cobertura Internacional" },
      ],
      desc: "Acceso a las mejores clínicas de Ecuador y el exterior con telemedicina 24/7.",
      waMsg: "Hola VitalSeguros, simulé un Seguro Médico con cobertura de ",
    },
  };

  const current = PLAN_DATA[selectedPlan];
  const activeLevel = current.levels[coverageIndex];

  const handleCalculate = () => {
    const message = `${current.waMsg}${activeLevel.target} (Aporte aprox: ${activeLevel.monthly}/mes). ¿Podemos revisarlo?`;
    window.open(`https://wa.me/593995451814?text=${encodeURIComponent(message)}`, "_blank");
  };

  const stats = [
    { value: "24/7", label: "Asesoría & Soporte", color: "text-[#E0C068]" },
    { value: "3 Ramos", label: "Pólizas Integrales", color: "text-[#E0C068]" },
    { value: "100%", label: "Digital & Presencial", color: "text-[#E0C068]" },
    { value: "Top 10", label: "Aseguradoras del País", color: "text-[#E0C068]" },
  ];

  const Wrapper = mounted ? motion.div : "div";
  const WrapperH1 = mounted ? motion.h1 : "h1";
  const WrapperP = mounted ? motion.p : "p";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.12 } }
  };

  return (
    <section
      id="inicio"
      className="relative -mt-[74px] pt-[74px] overflow-hidden bg-[#08080C] text-slate-100 transition-colors duration-500 font-sans min-h-[92vh] flex flex-col justify-between"
      aria-labelledby="hero-title"
    >
      {/* ===== CRYSTAL CLEAR HIGH-DEFINITION HERO IMAGE ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vitalseguros-hero.webp"
          alt="Familia protegida por Vital Seguros"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center saturate-[1.12] contrast-[1.04] brightness-[1.02]"
        />
        {/* Subtle Ambient Blend Gradients (Unobscured Crisp Image) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080C]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Ambient Radial Luxury Gold Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A84C]/15 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-4 sm:px-8 lg:px-16 py-12 lg:py-20 flex-1">

        {/* ===== LEFT COLUMN: AETHERION LUXURY GLASS PANEL ===== */}
        <Wrapper
          {...(mounted ? { initial: "hidden", animate: "visible", variants: stagger } : {})}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Glass Card Container for Crisp Text Contrast Over HD Image */}
          <div className="rounded-3xl bg-[#08080C]/75 backdrop-blur-xl border border-[#C9A84C]/35 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:border-[#C9A84C]/60 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#C9A84C]/10 rounded-full blur-2xl pointer-events-none" />

            <Wrapper {...(mounted ? { variants: fadeUp } : {})} className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#E0C068] font-mono font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                Protección Patrimonial & Asesoría 24/7
              </span>
            </Wrapper>

            <WrapperH1
              {...(mounted ? { variants: fadeUp } : {})}
              id="hero-title"
              className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] mb-4"
            >
              Tu vida. Tu salud. <br className="hidden sm:block" />
              <span className="font-light italic text-[#E0C068] text-gold-gradient">Tu futuro</span> con respaldo.
            </WrapperH1>

            <WrapperP {...(mounted ? { variants: fadeUp } : {})} className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed font-normal mb-8">
              Pólizas de seguro de alta cobertura en ahorro, vida y salud integral. Protección financiera, inversión en dólares y respuesta inmediata ante cualquier imprevisto.
            </WrapperP>

            <Wrapper {...(mounted ? { variants: fadeUp } : {})} className="flex flex-wrap items-center gap-4">
              <a
                href="#simulador"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E0C068] to-[#C9A84C] text-[#0A0A0F] font-bold text-xs uppercase tracking-[0.15em] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#C9A84C]/30 cursor-pointer"
              >
                <span>Explorar Pólizas</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/593995451814?text=Hola%20VitalSeguros,%20deseo%20una%20reunion%20de%20diagnostico%20sin%20costo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-3 backdrop-blur-md active:scale-95 cursor-pointer hover:border-[#C9A84C]"
              >
                <span>Hablar con VitalSeguros</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </a>
            </Wrapper>
          </div>
        </Wrapper>

        {/* ===== RIGHT COLUMN: AETHERION DARK GLASSMORPHISM SIMULATOR ===== */}
        <Wrapper
          {...(mounted ? { initial: { opacity: 0, x: 40, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, transition: { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const } } : {})}
          className="lg:col-span-5"
        >
          {/* Glassmorphism Card with High Contrast Ultra-Readable Text */}
          <div className="relative rounded-3xl bg-[#08080C]/85 backdrop-blur-2xl border border-[#C9A84C]/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-6 sm:p-8 overflow-hidden hover:border-[#C9A84C]/70 transition-all duration-500">
            {/* Inner gold ambient glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C9A84C]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header of simulator card */}
            <div className="flex items-center justify-between mb-6 relative">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.15em] font-bold text-[#E0C068]">
                  Simulador de Póliza
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                {current.badge}
              </span>
            </div>

            {/* Aetherion Minimalist Tabs */}
            <div className="flex border-b border-white/15 mb-6 relative">
              {(["ahorro", "vida", "salud"] as const).map((key) => {
                const isActive = selectedPlan === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedPlan(key);
                      setCoverageIndex(1);
                    }}
                    className={`flex-1 py-3 text-xs font-mono uppercase tracking-[0.08em] font-extrabold transition-all duration-300 relative cursor-pointer ${
                      isActive
                        ? "text-[#E0C068]"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A84C] to-[#E0C068] shadow-sm shadow-[#C9A84C]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Simulated Values Box */}
            <div className="space-y-4 mb-6 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-mono uppercase tracking-wider font-semibold">
                  Meta de Cobertura
                </span>
                <span className="text-xs font-mono font-extrabold text-[#E0C068] bg-[#C9A84C]/15 px-2.5 py-0.5 rounded border border-[#C9A84C]/30">
                  {activeLevel.term}
                </span>
              </div>

              {/* Amount Display */}
              <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <span className="text-3xl sm:text-4xl font-serif font-extrabold text-white leading-none tracking-tight">
                  {activeLevel.target}
                </span>
                <div className="text-right">
                  <span className="text-2xl font-mono font-extrabold text-[#E0C068] leading-none block">
                    {activeLevel.monthly}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono uppercase tracking-widest mt-1 block">
                    /mes aprox.
                  </span>
                </div>
              </div>

              {/* Three-step range tier selector */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {current.levels.map((lvl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCoverageIndex(idx)}
                    className={`py-2.5 px-2 rounded-xl border text-center font-mono text-xs transition-all duration-300 uppercase tracking-wider cursor-pointer ${
                      coverageIndex === idx
                        ? "border-[#C9A84C] bg-[#C9A84C]/25 text-[#E0C068] font-extrabold shadow-md shadow-[#C9A84C]/20 scale-[1.02]"
                        : "border-white/15 bg-white/5 text-slate-200 font-bold hover:border-[#C9A84C]/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Tier 0{idx + 1}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-medium pt-2">
                {current.desc}
              </p>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E0C068] to-[#C9A84C] text-[#0A0A0F] hover:brightness-110 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#C9A84C]/30 active:scale-[0.98] cursor-pointer"
            >
              <span>Calcular mi plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Clickable Action Button for WhatsApp */}
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full mt-3 py-3 rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 text-[#E0C068] font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C9A84C] group-hover:scale-110 transition-transform" />
              <span>Cotización vía WhatsApp</span>
            </button>
          </div>
        </Wrapper>
      </div>

      {/* ===== STATS BAR: Centered Aetherion Glassmorphism Cards ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-12 -mt-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <Wrapper
              key={stat.label}
              {...(mounted ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const } } : {})}
              className="group relative p-5 rounded-2xl bg-[#08080C]/85 backdrop-blur-xl border border-[#C9A84C]/30 shadow-lg hover:border-[#C9A84C] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(201,168,76,0.2)] transition-all duration-500 text-center flex flex-col items-center justify-center"
            >
              <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#E0C068] drop-shadow-sm text-center">{stat.value}</div>
              <div className="text-xs text-slate-200 mt-1 font-semibold tracking-wide text-center">{stat.label}</div>
            </Wrapper>
          ))}
        </div>
      </div>
    </section>
  );
}