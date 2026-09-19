"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, HeartPulse, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function Hero() {
  const [selectedPlan, setSelectedPlan] = useState<"ahorro" | "vida" | "salud">("ahorro");
  const [coverageIndex, setCoverageIndex] = useState(1);

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

  return (
    <section
      id="inicio"
      className="relative min-h-[75vh] py-10 sm:py-12 px-4 sm:px-8 lg:px-16 flex items-center overflow-hidden bg-[#F5F5F7] dark:bg-[#0E1726] transition-colors duration-300"
      aria-labelledby="hero-title"
    >
      {/* Background Family Image with Shield Watermark & Warm Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vitalseguros-hero.webp"
          alt="Familia de alto patrimonio protegida por el escudo de Vital Seguros"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 100vw"
          className="object-cover object-left sm:object-center scale-105 transition-transform duration-1000"
        />
        {/* Dark Mode Gradient: Soft Midnight Navy Tint (High Contrast & Clear Left Family View) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1726]/85 via-[#0E1726]/30 to-transparent dark:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1726] via-transparent to-[#0E1726]/15 dark:block hidden" />
        
        {/* Light Mode Gradient: ~90% Ultra Crystal Transparent Overlay for Maximum Photo Clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F7]/35 via-[#F5F5F7]/10 to-transparent dark:hidden block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7]/40 via-transparent to-transparent dark:hidden block" />
      </div>

      {/* Ambient Lighting Glows */}
      <div
        className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#C9A84C]/15 dark:bg-[#C9A84C]/10 blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* GEO AI Capsule */}
      <aside className="sr-only">
        Vital Seguros es la correduría y asesoría oficial de seguros internacionales y nacionales especializada en pólizas de ahorro patrimonial, vida vitalicia y salud médica integral con cobertura global, telemedicina 24/7 y asistencia prioritaria en siniestros.
      </aside>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
        {/* Left Column: Premium Apple Typography with Glassmorphic Legibility Shield */}
        <div className="lg:col-span-7 space-y-4 text-left bg-white/70 dark:bg-transparent lg:bg-white/40 lg:dark:bg-transparent p-6 sm:p-8 lg:p-6 rounded-[28px] lg:rounded-none backdrop-blur-md lg:backdrop-blur-none border border-white/60 dark:border-none shadow-sm lg:shadow-none">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#B58E29] dark:text-[#C9A84C] font-mono font-bold drop-shadow-sm">
              Vital Seguros &bull; Protección Patrimonial & Asesoría 24/7
            </span>
          </div>

          <h1
            id="hero-title"
            className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight text-zinc-950 dark:text-[#F1F5F9] leading-[1.08] [text-shadow:_0_1px_12px_rgba(255,255,255,0.9)] dark:[text-shadow:none]"
          >
            Tu vida. Tu salud.{" "}
            <span className="text-gold-gradient font-serif font-light italic drop-shadow-sm">
              Tu futuro
            </span>{" "}
            con respaldo total.
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-zinc-900 dark:text-[#CBD5E1] max-w-xl font-semibold leading-relaxed [text-shadow:_0_1px_8px_rgba(255,255,255,0.8)] dark:[text-shadow:none]">
            Pólizas de seguro de alta cobertura en ahorro, vida y salud integral. Protección financiera, inversión en dólares y respuesta inmediata ante cualquier imprevisto.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <a
              href="#simulador"
              className="btn-gold-luxury px-6 py-3 text-xs font-mono tracking-[0.1em] uppercase active:scale-95 shadow-md"
            >
              <span>Explorar Pólizas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/593995451814?text=Hola%20VitalSeguros,%20deseo%20una%20reunion%20de%20diagnostico%20sin%20costo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-black/20 dark:border-white/15 bg-white/90 dark:bg-white/[0.05] text-zinc-950 dark:text-[#F1F5F9] hover:border-[#C9A84C]/50 font-mono text-xs uppercase tracking-[0.1em] transition-all no-underline backdrop-blur-md flex items-center gap-2 cursor-pointer font-bold shadow-sm"
            >
              <span>Hablar con VitalSeguros</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </a>
          </div>

          {/* Quick Trust Badges */}
          <div className="pt-4 border-t border-black/15 dark:border-white/10 flex flex-wrap items-center gap-5 text-[11px] text-zinc-900 dark:text-[#CBD5E1] font-mono font-bold">
            <span className="flex items-center gap-1.5">
              <span className="text-[#C9A84C]">✓</span> Respaldo Multicompañía
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#C9A84C]">✓</span> Acompañamiento 24/7
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#C9A84C]">✓</span> Cero letras pequeñas
            </span>
          </div>
        </div>

        {/* Right Column: Compact Floating Glassmorphic Card (Fits on Standard Laptops) */}
        <div className="lg:col-span-5">
          <SpotlightCard className="bg-white/85 dark:bg-[#132034]/85 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/10 dark:shadow-black/50">
            {/* Header of simulator card */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066CC] animate-ping" />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] font-semibold text-zinc-600 dark:text-[#CBD5E1]">
                  Simulador de Póliza
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] font-semibold">
                <Sparkles className="w-3 h-3" />
                Estimación Rápida
              </span>
            </div>

            {/* Apple Pills Selector: [ Ahorro ] [ Vida ] [ Salud ] */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/10 mb-4">
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
                    className={`py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-[0.05em] font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-600 dark:text-[#CBD5E1] hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                );
              })}
            </div>

            {/* Simulated Values Box */}
            <div className="rounded-xl p-4 bg-black/[0.03] dark:bg-black/30 border border-black/5 dark:border-white/10 mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-600 dark:text-[#CBD5E1] font-mono uppercase">
                  Meta de Cobertura
                </span>
                <span className="text-xs font-mono font-semibold text-[#C9A84C]">
                  {activeLevel.term}
                </span>
              </div>

              {/* Amount Display */}
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-serif font-light text-zinc-900 dark:text-white">
                  {activeLevel.target}
                </span>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-zinc-900 dark:text-[#FCE092]">
                    {activeLevel.monthly}
                  </span>
                  <span className="text-[9px] text-zinc-600 dark:text-[#CBD5E1] font-mono block">
                    /mes aprox.
                  </span>
                </div>
              </div>

              {/* Three-step range tier selector */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {current.levels.map((lvl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCoverageIndex(idx)}
                    className={`py-1.5 px-2 rounded-lg text-center border font-mono text-[10px] transition-all cursor-pointer ${
                      coverageIndex === idx
                        ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C] font-bold"
                        : "border-black/10 dark:border-white/10 text-zinc-600 dark:text-[#CBD5E1] hover:border-[#C9A84C]/40"
                    }`}
                  >
                    Tier 0{idx + 1}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-zinc-600 dark:text-[#CBD5E1] leading-relaxed pt-1">
                {current.desc}
              </p>
            </div>

            {/* Apple Electric Blue Action Button */}
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full py-3 rounded-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#0066CC]/25 hover:shadow-xl active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Calcular mi plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <p className="text-[9px] text-center text-zinc-500 dark:text-[#CBD5E1] font-mono mt-2.5">
              Cotización personalizada sin compromiso vía WhatsApp
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}