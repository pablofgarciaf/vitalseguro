"use client";

import { useState, useEffect, useId } from "react";
import { Calculator, Sparkles, Send, CheckCircle2, Sliders, Info, Compass, ShieldCheck } from "lucide-react";
import { saveLead } from "@/lib/crmService";
import { getCommissionRates, type CommissionRates, DEFAULT_COMMISSION_RATES } from "@/lib/commissionService";

export default function Cotizador() {
  const edadId = useId();
  const coberturaId = useId();
  const deducibleId = useId();
  const planTypeId = useId();
  const nombreId = useId();
  const telefonoId = useId();
  const ciudadId = useId();

  const [planType, setPlanType] = useState<"vida_ahorro" | "salud" | "viaje" | "vida_puro" | "auto">("vida_ahorro");
  const [edad, setEdad] = useState(35);
  const [coberturaIndex, setCoberturaIndex] = useState(2);
  const [deducibleIndex, setDeducibleIndex] = useState(1);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("Quito");
  const [sent, setSent] = useState(false);
  const [savingFirebase, setSavingFirebase] = useState(false);
  const [rates, setRates] = useState<CommissionRates>(DEFAULT_COMMISSION_RATES);

  useEffect(() => {
    async function load() {
      const data = await getCommissionRates();
      setRates(data);
    }
    load();
  }, []);

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

  // Cálculo actuarial realista
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
    } else if (planType === "viaje") {
      baseRate = 85 + (baseCoverage / 100000) * 15; // Vital Travel Safe
    } else {
      baseRate = 65; // Vehicular base
    }

    const monthly = Math.round(Math.max(25, baseRate));
    const annual = Math.round(monthly * 11.2); // Descuento pago anual
    return { monthly, annual };
  };

  const { monthly, annual } = calculateEstimate();

  const getRamoCategory = () => {
    if (planType === "vida_ahorro" || planType === "vida_puro") return "vida";
    if (planType === "viaje") return "viaje";
    if (planType === "salud") return "salud";
    return "auto";
  };

  const currentCommissionPercent = () => {
    const ramo = getRamoCategory();
    return rates[ramo] || (ramo === "vida" ? 60 : 25);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();

    const planNames = {
      vida_ahorro: "Plan de Vida con Ahorro e Inversión",
      salud: "Seguro Médico Integral (Salud)",
      viaje: "Vital Travel Safe - Asistencia al Viajero",
      vida_puro: "Seguro de Vida Tradicional",
      auto: "Seguro Vehicular Integral",
    };

    // Mensaje para WhatsApp
    const text = `Hola Gabriel Jácome, generé una cotización en tu simulador de Vital Seguros:

📋 *Ramo:* ${planNames[planType]}
👤 *Nombre:* ${nombre || "Cliente interesado"}
📱 *Teléfono:* ${telefono || "No especificado"}
📍 *Ciudad:* ${ciudad}
🎂 *Edad:* ${edad} años
🛡️ *Cobertura / Suma:* ${COBERTURAS[coberturaIndex].label}
🏷️ *Deducible deseado:* ${DEDUCIBLES[deducibleIndex].label}
💰 *Estimado calculado:* ~$${monthly}/mes (o $${annual}/año)

¿Podemos revisar la propuesta formal y pólizas disponibles con BMI, Bupa y aseguradoras aliadas?`;

    // 1. Abrir WhatsApp DE INMEDIATO (sin retraso de promesas para evitar bloqueo de popup en el navegador)
    const waUrl = `https://wa.me/593995451814?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSent(true);

    // 2. Guardar en Firebase CRM en segundo plano (asíncrono sin bloquear la apertura)
    setSavingFirebase(true);
    saveLead({
      nombre: nombre || "Cliente Cotizador Web",
      email: "pendiente@cliente.com",
      telefono: telefono || "+593 99 545 1814",
      ciudad: ciudad || "Quito",
      ramo: getRamoCategory(),
      planDetalle: planNames[planType],
      cobertura: COBERTURAS[coberturaIndex].label,
      primaAnual: annual,
      estado: "nuevo",
      asesor: "Gabriel Jácome",
      notas: `Cotización automática: Edad ${edad}, Deducible ${DEDUCIBLES[deducibleIndex].label}, Mensual ~$${monthly}/mes.`,
      origen: "cotizador_web"
    }).finally(() => {
      setSavingFirebase(false);
    });
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
              Simulador Inteligente & CRM en Vivo
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
            Configura tu edad, suma asegurada y deducible preferido. Cada cotización se sincroniza con nuestro CRM oficial de Vital Seguros.
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
                <div id={planTypeId} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "vida_ahorro", label: "Vida + Ahorro", badge: `${rates.vida}%` },
                    { id: "salud", label: "Salud Médica", badge: `${rates.salud}%` },
                    { id: "viaje", label: "Vital Travel", badge: `${rates.viaje}%` },
                    { id: "vida_puro", label: "Vida Pura", badge: `${rates.vida}%` },
                    { id: "auto", label: "Vehicular", badge: `${rates.auto}%` },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlanType(p.id as any)}
                      className={`py-2 px-1 rounded-xl text-[11px] font-mono uppercase tracking-wider text-center transition-all cursor-pointer border ${
                        planType === p.id
                          ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C] font-bold shadow-sm"
                          : "border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-[#A9A9A9] hover:border-[#C9A84C]/30"
                      }`}
                    >
                      <div>{p.label}</div>
                      <div className="text-[9px] text-[#C9A84C] font-normal">{p.badge} com.</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Slider Edad */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={edadId} className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9]">
                    2. Edad del Asegurado
                  </label>
                  <span className="font-serif text-lg font-medium text-zinc-900 dark:text-[#D4D4D4]">
                    {edad} <span className="text-xs font-sans text-[#86868B]">años</span>
                  </span>
                </div>
                <input
                  id={edadId}
                  type="range"
                  min="18"
                  max="70"
                  value={edad}
                  onChange={(e) => setEdad(Number(e.target.value))}
                  className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                />
              </div>

              {/* 3. Slider Cobertura */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={coberturaId} className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9]">
                    3. Suma Asegurada / Cobertura
                  </label>
                  <span className="font-serif text-lg font-medium text-[#C9A84C]">
                    {COBERTURAS[coberturaIndex].label}
                  </span>
                </div>
                <input
                  id={coberturaId}
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={coberturaIndex}
                  onChange={(e) => setCoberturaIndex(Number(e.target.value))}
                  className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
                />
              </div>

              {/* 4. Datos del Solicitante */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label htmlFor={nombreId} className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9] mb-1">
                    Tu Nombre
                  </label>
                  <input
                    id={nombreId}
                    type="text"
                    required
                    placeholder="Ej. Dr. Andrés Peña"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={telefonoId} className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] dark:text-[#A9A9A9] mb-1">
                    WhatsApp / Teléfono
                  </label>
                  <input
                    id={telefonoId}
                    type="text"
                    required
                    placeholder="+593 99 123 4567"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white focus:border-[#C9A84C] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Actuarial Estimate Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="rounded-2xl border-2 border-[#C9A84C]/30 bg-gradient-to-b from-[#C9A84C]/10 via-black/[0.02] dark:via-white/[0.02] to-transparent p-6 sm:p-8 text-center relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[10px] uppercase tracking-wider font-mono text-[#C9A84C] mb-4">
                  <Sparkles className="w-3 h-3" />
                  Estimado Actuarial Oficial
                </div>

                <div className="space-y-1 my-3">
                  <span className="font-mono text-xs text-[#86868B] uppercase tracking-widest block">
                    Inversión Estimada
                  </span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-serif text-5xl sm:text-6xl font-light tracking-tight text-zinc-900 dark:text-[#D4D4D4]">
                      ${monthly}
                    </span>
                    <span className="font-mono text-sm text-[#86868B]">/mes</span>
                  </div>
                  <span className="text-xs text-[#86868B] block">
                    o aprox. <strong className="text-zinc-900 dark:text-white">${annual} USD</strong> pago anual
                  </span>
                </div>

                <div className="my-4 py-3 border-y border-black/5 dark:border-white/5 text-xs text-left space-y-1.5 text-[#86868B]">
                  <div className="flex justify-between">
                    <span>Aseguradoras:</span>
                    <strong className="text-zinc-900 dark:text-white">BMI / Bupa / Aseguradoras Top</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Comisión Asesor ({getRamoCategory().toUpperCase()}):</span>
                    <strong className="text-[#34D399]">{currentCommissionPercent()}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>CRM Sincronizado:</span>
                    <strong className="text-[#C9A84C]">Firebase Directo</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingFirebase}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{savingFirebase ? "Guardando en CRM..." : "Enviar Cotización a WhatsApp"}</span>
                </button>

                {sent && (
                  <div className="mt-3 text-[11px] text-[#34D399] flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>¡Cotización enviada a WhatsApp y registrada en CRM!</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
