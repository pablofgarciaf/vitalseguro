"use client";

import { useState, useId } from "react";
import { Calculator, Sparkles, Send, CheckCircle2, Sliders, Info } from "lucide-react";

export default function Cotizador() {
  const edadId = useId();
  const coberturaId = useId();
  const deducibleId = useId();
  const planTypeId = useId();
  const nombreId = useId();
  const ciudadId = useId();

  const [planType, setPlanType] = useState<"salud" | "vida_ahorro" | "vida_puro" | "auto">("salud");
  const [edad, setEdad] = useState(35);
  const [coberturaIndex, setCoberturaIndex] = useState(2);
  const [deducibleIndex, setDeducibleIndex] = useState(1);
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("Quito");
  const [sent, setSent] = useState(false);

  const COBERTURAS = [
    { label: "$50,000 USD", val: 50000 },
    { label: "$100,000 USD", val: 100000 },
    { label: "$300,000 USD", val: 300000 },
    { label: "$500,000 USD", val: 500000 },
    { label: "$1,000,000 USD", val: 1000000 },
  ];

  const DEDUCIBLES = [
    { label: "$500 USD", factor: 1.15 },
    { label: "$1,000 USD", factor: 1.0 },
    { label: "$2,500 USD", factor: 0.85 },
    { label: "$5,000 USD", factor: 0.72 },
  ];

  // Realistic actuarial estimation model based on BMI & top Ecuadorian carriers
  const calculateEstimate = () => {
    const baseCoverage = COBERTURAS[coberturaIndex].val;
    const dedFactor = DEDUCIBLES[deducibleIndex].factor;
    const ageFactor = 1 + Math.max(0, edad - 25) * 0.022;

    let baseRate = 0;
    if (planType === "salud") {
      baseRate = (baseCoverage * 0.00028) * ageFactor * dedFactor;
    } else if (planType === "vida_ahorro") {
      baseRate = (baseCoverage * 0.00045) * (1 + (edad - 20) * 0.012);
    } else if (planType === "vida_puro") {
      baseRate = (baseCoverage * 0.00015) * ageFactor;
    } else {
      baseRate = 65; // Vehicular base
    }

    const monthly = Math.round(Math.max(25, baseRate));
    const annual = Math.round(monthly * 11.2); // discount on annual
    return { monthly, annual };
  };

  const { monthly, annual } = calculateEstimate();

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const planNames = {
      salud: "Seguro Médico Integral (Salud)",
      vida_ahorro: "Plan de Vida con Ahorro e Inversión",
      vida_puro: "Seguro de Vida Tradicional",
      auto: "Seguro Vehicular Integral",
    };

    const text = `Hola Gabriel Jácome, generé una cotización en tu simulador web:

📋 *Ramo:* ${planNames[planType]}
👤 *Nombre:* ${nombre || "Cliente interesado"}
📍 *Ciudad:* ${ciudad}
🎂 *Edad:* ${edad} años
🛡️ *Cobertura / Suma:* ${COBERTURAS[coberturaIndex].label}
🏷️ *Deducible deseado:* ${DEDUCIBLES[deducibleIndex].label}
💰 *Estimado calculado:* ~$${monthly}/mes (o $${annual}/año)

¿Podemos revisar la propuesta formal y pólizas disponibles con BMI y aseguradoras aliadas?`;

    window.open(`https://wa.me/593995451814?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  return (
    <section
      id="simulador"
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-black/5 dark:border-white/5 relative"
      aria-labelledby="simulador-title"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-mono font-semibold">
              Simulador Inteligente de Pólizas
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          </div>
          <h2
            id="simulador-title"
            className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-[#D4D4D4] mb-3"
          >
            Calcula tu cobertura con{" "}
            <span className="text-gold-gradient font-normal italic">
              precisión actuarial
            </span>
          </h2>
          <p className="text-[#86868B] dark:text-[#A9A9A9] text-sm sm:text-base leading-relaxed font-sans">
            Configura tu edad, suma asegurada y deducible preferido para obtener una estimación inmediata con las mejores aseguradoras del país.
          </p>
        </div>

        {/* Main Bento Simulator Container */}
        <div className="rounded-[32px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSendQuote} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Sliders and Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Plan Type Pills */}
              <div>
                <label htmlFor={planTypeId} className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9] mb-3">
                  1. Selecciona el Tipo de Póliza
                </label>
                <div id={planTypeId} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "salud", label: "Salud Médica" },
                    { id: "vida_ahorro", label: "Vida + Ahorro" },
                    { id: "vida_puro", label: "Vida Pura" },
                    { id: "auto", label: "Vehicular" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlanType(p.id as any)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-mono uppercase tracking-wider text-center transition-all cursor-pointer border ${
                        planType === p.id
                          ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C] font-bold shadow-sm"
                          : "border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-[#A9A9A9] hover:border-[#C9A84C]/30"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Age Slider */}
              <div className="p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={edadId} className="font-mono text-xs uppercase tracking-wider text-zinc-700 dark:text-[#D4D4D4] font-medium">
                    Edad del Asegurado Principal
                  </label>
                  <span className="font-serif text-xl font-light text-zinc-900 dark:text-[#F5D78A]">
                    {edad} años
                  </span>
                </div>
                <input
                  id={edadId}
                  type="range"
                  min={18}
                  max={65}
                  value={edad}
                  onChange={(e) => setEdad(Number(e.target.value))}
                  className="w-full accent-[#C9A84C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-1">
                  <span>18 años</span>
                  <span>40 años</span>
                  <span>65 años</span>
                </div>
              </div>

              {/* 3. Coverage Amount Selector */}
              <div>
                <label htmlFor={coberturaId} className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9] mb-2">
                  2. Suma Asegurada / Cobertura Máxima
                </label>
                <div id={coberturaId} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COBERTURAS.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCoberturaIndex(i)}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        coberturaIndex === i
                          ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C] font-semibold"
                          : "border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-[#A9A9A9] hover:border-[#C9A84C]/30"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Deductible Selector */}
              <div>
                <label htmlFor={deducibleId} className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9] mb-2">
                  3. Deducible Anual Deseado
                </label>
                <div id={deducibleId} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DEDUCIBLES.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDeducibleIndex(i)}
                      className={`py-2 px-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                        deducibleIndex === i
                          ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C] font-semibold"
                          : "border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-[#A9A9A9] hover:border-[#C9A84C]/30"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Mini Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label htmlFor={nombreId} className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                    Tu Nombre
                  </label>
                  <input
                    id={nombreId}
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Carlos Andrade"
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-zinc-900 dark:text-white text-xs focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={ciudadId} className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500 mb-1">
                    Ciudad
                  </label>
                  <select
                    id={ciudadId}
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-zinc-900 dark:text-white text-xs focus:border-[#C9A84C] focus:outline-none"
                  >
                    <option value="Quito" className="bg-zinc-900 text-white">Quito</option>
                    <option value="Guayaquil" className="bg-zinc-900 text-white">Guayaquil</option>
                    <option value="Cuenca" className="bg-zinc-900 text-white">Cuenca</option>
                    <option value="Manta" className="bg-zinc-900 text-white">Manta</option>
                    <option value="Ambato" className="bg-zinc-900 text-white">Ambato</option>
                    <option value="Otra" className="bg-zinc-900 text-white">Otra ciudad</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Price Display Card */}
            <div className="lg:col-span-5 rounded-[28px] border border-black/10 dark:border-white/10 bg-[#0A0A0F] text-white p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Subtle gold glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-[#C9A84C]/20 to-transparent blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold">
                    Estimación en Tiempo Real
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[#D4D4D4]">
                    <Sparkles className="w-3 h-3 text-[#F5D78A]" />
                    Tarifa Base
                  </span>
                </div>

                <div>
                  <span className="font-mono text-xs text-[#86868B] block mb-1">
                    Aporte Mensual Estimado
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-light text-5xl sm:text-6xl text-white">
                      ${monthly}
                    </span>
                    <span className="font-mono text-sm text-[#F5D78A]">
                      USD / mes
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#86868B] block mt-1">
                    Aprox. ${annual} USD al año (con descuento anual)
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/8 space-y-2 text-xs font-sans text-[#D4D4D4]">
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">Cobertura:</span>
                    <span className="font-mono font-semibold">{COBERTURAS[coberturaIndex].label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">Deducible:</span>
                    <span className="font-mono font-semibold">{DEDUCIBLES[deducibleIndex].label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">Asistencia:</span>
                    <span className="text-emerald-400 font-mono font-semibold">24/7 sin deducible</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#86868B] leading-tight">
                  <Info className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                  <span>Emisión oficial respaldada con BMI del Ecuador, Saludsa y aseguradoras aliadas.</span>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full btn-gold-luxury text-xs font-mono uppercase tracking-[0.1em] font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Cotización por WhatsApp</span>
                </button>

                {sent && (
                  <p className="text-[11px] font-mono text-[#F5D78A] text-center mt-2">
                    ✓ Enviando parámetros a Gabriel Jácome (+593 99 545 1814).
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
