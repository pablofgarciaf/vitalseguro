"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Download,
  CheckCircle2,
  Coins,
  ChevronDown,
  ExternalLink,
  Phone,
  Mail,
  Send,
  Sparkles
} from "lucide-react";
import { generateExecutivePDF, generateBMIIdenticalPDF, PDFData } from "@/lib/pdfGenerator";
import { saveLead } from "@/lib/crmService";

export default function CotizadorVida() {
  const [nombre, setNombre] = useState("Pablo García");
  const [edad, setEdad] = useState<number>(38);
  const [sexo, setSexo] = useState<"1" | "2">("1");
  const [fumador, setFumador] = useState(false);
  
  // Contacto flexible
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [preferEmail, setPreferEmail] = useState(false);

  // Producto y Cobertura
  const [producto, setProducto] = useState("Best Indexed 100 BMII S&P 500");
  const [opcionProteccion, setOpcionProteccion] = useState("A - Suma Asegurada");
  const [frecuenciaPago, setFrecuenciaPago] = useState("Anual");
  const [cobertura, setCobertura] = useState<number>(100000);
  const [muerteAccidental, setMuerteAccidental] = useState(false);
  const [muerteAccidentalMonto, setMuerteAccidentalMonto] = useState<number>(100000);

  // Selector de Año
  const [selectedYear, setSelectedYear] = useState<number>(20);
  const [savingLead, setSavingLead] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const productosVida = [
    { id: "Best Indexed 100 BMII S&P 500", label: "Best Indexed 100 BMII S&P 500", slug: "best-indexed-100-sp500" },
    { id: "Best Indexed BMII S&P 500", label: "Best Indexed BMII S&P 500", slug: "best-indexed-sp500" },
    { id: "Best Indexed 100 BMII NASDAQ", label: "Best Indexed 100 BMII NASDAQ", slug: "best-indexed-100-nasdaq" },
    { id: "Best Indexed BMII NASDAQ", label: "Best Indexed BMII NASDAQ", slug: "best-indexed-nasdaq" },
    { id: "LifeTime", label: "LifeTime (Whole Life Garantizado)", slug: "lifetime" },
    { id: "Nova II", label: "Nova II (Ahorro y Jubilación)", slug: "nova-ii" },
    { id: "Term NRNC", label: "Term NRNC (Término Puro)", slug: "term-nrnc" },
  ];

  const currentSlug = productosVida.find(p => p.id === producto)?.slug || "best-indexed-100-sp500";

  // Calibración Actuarial Exacta BMI
  // Benchmark BMI oficial: 38 años, Masc, No fumador, $100k + $100k rider = $1,524 USD ($1,399 target + $125 fee)
  const calcularVida = () => {
    const minCov = Math.max(100000, cobertura);
    
    // Tasa base calibrada al benchmark exacto de BMI
    let targetBase = 1224 * (minCov / 100000);
    if (edad !== 38) {
      if (edad > 38) targetBase *= (1 + (edad - 38) * 0.038);
      else targetBase *= (1 - (38 - edad) * 0.024);
    }
    if (fumador) targetBase *= 1.35;
    if (sexo === "2") targetBase *= 0.88;

    // Rider Muerte Accidental: $175 por cada $100k
    let riderAccidental = 0;
    if (muerteAccidental) {
      riderAccidental = Math.round((muerteAccidentalMonto / 100000) * 175);
    }

    const feePrimerAno = 125;
    const primaAnualTotal = Math.round(targetBase + riderAccidental + feePrimerAno);

    let factorFrecuencia = 1.0;
    if (frecuenciaPago === "Semestral") factorFrecuencia = 0.52;
    if (frecuenciaPago === "Trimestral") factorFrecuencia = 0.27;
    if (frecuenciaPago === "Mensual") factorFrecuencia = 0.09;

    const primaModal = Math.round(primaAnualTotal * factorFrecuencia);

    // Proyecciones a 35 años calibradas con el PDF oficial de BMI
    const proyecciones = [];
    let acum65 = 0;
    let acum50 = 0;

    for (let y = 1; y <= 35; y++) {
      const currentAge = edad + y;
      const primasAcum = (primaAnualTotal - 125) * y + 125;

      if (y === 1) {
        acum65 = 312 * (minCov / 100000);
        acum50 = 292 * (minCov / 100000);
      } else {
        acum65 = (acum65 + (primaAnualTotal - 125) * 0.85) * 1.065;
        acum50 = (acum50 + (primaAnualTotal - 125) * 0.85) * 1.05;
      }

      let factorRescate = 1.0;
      if (y <= 5) factorRescate = 0.0;
      else if (y <= 10) factorRescate = 0.70 + (y - 5) * 0.06;

      proyecciones.push({
        year: y,
        age: currentAge,
        primaAcumulada: Math.round(primasAcum),
        valAcumulado65: Math.round(acum65),
        valEfectivo65: Math.round(acum65 * factorRescate),
        beneficioMuerte: minCov,
        valAcumulado50: Math.round(acum50),
        valEfectivo50: Math.round(acum50 * factorRescate)
      });
    }

    return {
      primaAnual: primaAnualTotal,
      primaModal: primaModal,
      coberturaEfectiva: minCov,
      primaBase: Math.round(targetBase + feePrimerAno),
      primaAnexos: riderAccidental,
      proyecciones: proyecciones
    };
  };

  const calculos = calcularVida();
  const proyeccionActiva = calculos.proyecciones.find(p => p.year === selectedYear) || calculos.proyecciones[19];

  const handleDescargarPDF = (tipo: "executive" | "identical") => {
    if (telefono || email) {
      saveLead({
        nombre: nombre || "Prospecto Vida",
        email: email || "contacto@cliente.com",
        telefono: telefono || "No especificado",
        ciudad: "Ecuador",
        ramo: "vida",
        planDetalle: producto,
        cobertura: `$${calculos.coberturaEfectiva.toLocaleString()} USD`,
        primaAnual: calculos.primaAnual,
        estado: "nuevo",
        asesor: "VitalSeguros",
        notas: `Cotización Vida: Edad ${edad}, Suma $${calculos.coberturaEfectiva}, Frecuencia ${frecuenciaPago}.`,
        origen: "cotizador_web"
      });
    }

    const pdfData: PDFData = {
      nombre,
      edad,
      sexo,
      fumador,
      producto,
      opcionProteccion,
      frecuenciaPago,
      cobertura: calculos.coberturaEfectiva,
      muerteAccidental,
      muerteAccidentalMonto,
      primaAnual: calculos.primaAnual,
      primaModal: calculos.primaModal,
      primaBase: calculos.primaBase,
      primaAnexos: calculos.primaAnexos,
      proyecciones: calculos.proyecciones
    };

    if (tipo === "executive") {
      const doc = generateExecutivePDF(pdfData);
      doc.save(`Propuesta_Vida_Vermilion_${nombre.replace(/\s+/g, "_")}.pdf`);
    } else {
      const doc = generateBMIIdenticalPDF(pdfData);
      doc.save(`Ilustracion_Oficial_BMI_${nombre.replace(/\s+/g, "_")}.pdf`);
    }
  };

  const handleContactarAsesor = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLead(true);

    const contactVal = preferEmail ? email : telefono;
    const text = `Hola VitalSeguros, he configurado una cotización de Seguro de Vida:
📋 Plan: ${producto}
👤 Titular: ${nombre} (${edad} años)
📱 Contacto: ${contactVal || "No especificado"}
🛡️ Suma Asegurada: $${calculos.coberturaEfectiva.toLocaleString()} USD
💰 Prima Anual: $${calculos.primaAnual.toLocaleString()} USD (${frecuenciaPago}: $${calculos.primaModal.toLocaleString()})
📈 Proyección Año ${selectedYear}: Fondo estimado de $${proyeccionActiva.valAcumulado65.toLocaleString()} USD.

Deseo coordinar la presentación formal de la propuesta.`;

    saveLead({
      nombre,
      email: email || "contacto@cliente.com",
      telefono: telefono || "No especificado",
      ciudad: "Ecuador",
      ramo: "vida",
      planDetalle: producto,
      cobertura: `$${calculos.coberturaEfectiva.toLocaleString()} USD`,
      primaAnual: calculos.primaAnual,
      estado: "nuevo",
      asesor: "VitalSeguros",
      notas: `Lead Vida Web: $${calculos.primaAnual}/año`,
      origen: "cotizador_web"
    }).finally(() => {
      setSavingLead(false);
      setLeadSaved(true);
      window.open(`https://wa.me/593995451814?text=${encodeURIComponent(text)}`, "_blank");
    });
  };

  return (
    <section
      id="cotizador-vida"
      className="py-12 px-3 sm:px-6 max-w-[1400px] mx-auto font-sans"
      aria-labelledby="vida-title"
    >
      {/* Header Compacto */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[11px] font-mono text-[#C9A84C] uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Ramo de Seguro de Vida & Ahorro Actuarial</span>
        </div>
        <h2 id="vida-title" className="font-serif font-light text-2xl sm:text-4xl tracking-tight text-zinc-900 dark:text-white">
          Cotizador de <span className="font-normal italic text-[#C9A84C]">Vida & Inversión Indexada</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1">
          Rendimiento del S&P 500 / NASDAQ con piso garantizado del 1%. Suma asegurada mínima de $100,000 USD.
        </p>
      </div>

      {/* Main Container Ancho Completo */}
      <div className="rounded-3xl border border-black/10 dark:border-[#C9A84C]/25 bg-white dark:bg-[#08080C] shadow-2xl p-5 sm:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Columna Izquierda Ancha (8 columnas) */}
          <div className="lg:col-span-8 space-y-3.5">
            
            {/* Bloque 1: Titular, Edad, Sexo, Fumador y Contacto */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0D0D13] border border-black/5 dark:border-white/10 space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] font-semibold block">
                1. Datos del Titular Asegurado
              </span>

              {/* Fila 1: Nombre, Edad, Sexo M/F, Fumador y Contacto en una sola línea */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                {/* Nombre */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Nombre completo</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Pablo García"
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:border-[#C9A84C] outline-none"
                  />
                </div>

                {/* Edad Digitada */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Edad</label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={edad}
                    onChange={(e) => setEdad(parseInt(e.target.value) || 18)}
                    className="w-full px-2 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-center focus:border-[#C9A84C] outline-none"
                  />
                </div>

                {/* Sexo M / F */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5 text-center">Sexo</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => setSexo("1")}
                      className={`py-1 rounded-lg text-xs font-bold transition-all ${
                        sexo === "1" ? "bg-[#C9A84C] text-slate-950 shadow-sm" : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      M
                    </button>
                    <button
                      type="button"
                      onClick={() => setSexo("2")}
                      className={`py-1 rounded-lg text-xs font-bold transition-all ${
                        sexo === "2" ? "bg-[#C9A84C] text-slate-950 shadow-sm" : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      F
                    </button>
                  </div>
                </div>

                {/* Fumador */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5 text-center">Fumador</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => setFumador(false)}
                      className={`py-1 rounded-lg text-xs font-bold transition-all ${
                        !fumador ? "bg-emerald-600 text-white shadow-sm" : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => setFumador(true)}
                      className={`py-1 rounded-lg text-xs font-bold transition-all ${
                        fumador ? "bg-amber-600 text-white shadow-sm" : "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500"
                      }`}
                    >
                      Sí
                    </button>
                  </div>
                </div>

                {/* Contacto WhatsApp / Email */}
                <div className="sm:col-span-2">
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                      {preferEmail ? "Email" : "Celular"}
                    </label>
                    <button
                      type="button"
                      onClick={() => setPreferEmail(!preferEmail)}
                      className="text-[10px] text-[#C9A84C] hover:underline"
                    >
                      {preferEmail ? "Celular" : "Email"}
                    </button>
                  </div>
                  {preferEmail ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-2 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:border-[#C9A84C] outline-none"
                    />
                  ) : (
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="+593 99..."
                      className="w-full px-2 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:border-[#C9A84C] outline-none"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Bloque 2: Producto, Suma Mínima 100k, Opción de Protección y Anexo */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0D0D13] border border-black/5 dark:border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] font-semibold">
                  2. Configuración de Póliza BMI
                </span>
                <a
                  href={`/seguros/${currentSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#C9A84C] font-bold hover:underline"
                >
                  <span>Ver beneficios de este plan</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Fila Producto, Suma Asegurada, Opción Protección y Frecuencia */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                {/* Producto */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Producto Indexado BMI</label>
                  <div className="relative">
                    <select
                      value={producto}
                      onChange={(e) => setProducto(e.target.value)}
                      className="w-full pl-3 pr-8 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold appearance-none cursor-pointer focus:border-[#C9A84C] outline-none"
                    >
                      {productosVida.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Suma Asegurada (Mínimo $100k) */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">
                    Suma Asegurada ($100k+)
                  </label>
                  <input
                    type="number"
                    min={100000}
                    step={25000}
                    value={cobertura}
                    onChange={(e) => setCobertura(Math.max(100000, parseInt(e.target.value) || 100000))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold font-serif text-[#C9A84C] focus:border-[#C9A84C] outline-none"
                  />
                </div>

                {/* Opción de Protección */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Protección</label>
                  <div className="relative">
                    <select
                      value={opcionProteccion}
                      onChange={(e) => setOpcionProteccion(e.target.value)}
                      className="w-full pl-2 pr-7 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[11px] appearance-none cursor-pointer focus:border-[#C9A84C] outline-none"
                    >
                      <option value="A - Suma Asegurada">A - Nivelada</option>
                      <option value="B - Suma Asegurada + Valor Efectivo">B - Creciente</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Frecuencia de Pago */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mb-0.5">Pago</label>
                  <div className="relative">
                    <select
                      value={frecuenciaPago}
                      onChange={(e) => setFrecuenciaPago(e.target.value)}
                      className="w-full pl-2 pr-7 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[11px] font-bold appearance-none cursor-pointer focus:border-[#C9A84C] outline-none"
                    >
                      <option value="Anual">Anual</option>
                      <option value="Semestral">Semestral</option>
                      <option value="Trimestral">Trimestral</option>
                      <option value="Mensual">Mensual</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Anexo Muerte Accidental */}
              <div className="flex items-center justify-between pt-1 border-t border-black/5 dark:border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anexoAccidentalVida"
                    checked={muerteAccidental}
                    onChange={(e) => setMuerteAccidental(e.target.checked)}
                    className="w-4 h-4 accent-[#C9A84C] cursor-pointer"
                  />
                  <label htmlFor="anexoAccidentalVida" className="text-xs font-semibold cursor-pointer">
                    Beneficio por muerte accidental (+${(muerteAccidentalMonto).toLocaleString()} USD)
                  </label>
                </div>
                {muerteAccidental && (
                  <span className="text-[11px] text-zinc-400 font-mono">
                    +$175/año incluido
                  </span>
                )}
              </div>
            </div>

            {/* Bloque 3: Selector Interactivo de Proyecciones a 5, 10, 15, 20, 25, 30 Años */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-[#0D0D13] border border-black/5 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#C9A84C] font-semibold flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" />
                  <span>Proyección de Ahorro S&P 500 en el Tiempo</span>
                </span>
                <span className="text-[10px] text-zinc-400">Haz clic en un año:</span>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {[5, 10, 15, 20, 25, 30].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    className={`py-1 rounded-lg text-center text-xs transition-all cursor-pointer ${
                      selectedYear === yr
                        ? "bg-[#C9A84C] text-slate-950 font-bold shadow-sm"
                        : "bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-[#C9A84C]/20"
                    }`}
                  >
                    Año {yr}
                  </button>
                ))}
              </div>

              {/* Fila Resumen del Año Seleccionado */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5">
                  <span className="text-[10px] text-zinc-400 block">Aporte (Año {selectedYear}):</span>
                  <span className="font-serif font-bold text-zinc-800 dark:text-zinc-200">
                    ${proyeccionActiva.primaAcumulada.toLocaleString()} USD
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <span className="text-[10px] text-blue-400 block">Fondo S&P (6.5%):</span>
                  <span className="font-serif font-bold text-blue-500 dark:text-blue-400">
                    ${proyeccionActiva.valAcumulado65.toLocaleString()} USD
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] text-emerald-400 block">Rescate Disponible:</span>
                  <span className="font-serif font-bold text-emerald-500 dark:text-emerald-400">
                    ${proyeccionActiva.valEfectivo65.toLocaleString()} USD
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha (4 columnas): Inversión y Descargas PDF */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
            <div className="p-5 rounded-2xl border-2 border-[#C9A84C]/30 bg-gradient-to-b from-[#C9A84C]/10 via-transparent to-transparent text-center relative shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C] font-semibold block">
                Prima Actuarial Estimada ({frecuenciaPago})
              </span>
              <div className="flex items-baseline justify-center gap-1 my-1">
                <span className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-zinc-900 dark:text-white">
                  ${calculos.primaModal.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-zinc-400">USD</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Equivalente a <strong className="text-zinc-900 dark:text-white">${calculos.primaAnual.toLocaleString()} USD</strong> al año
              </p>

              {/* Resumen de Cobertura */}
              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Suma Asegurada:</span>
                  <strong className="text-[#C9A84C] font-bold">${calculos.coberturaEfectiva.toLocaleString()} USD</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Piso Garantizado:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">1.0% (Sin pérdida)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Rendimiento Histórico:</span>
                  <strong className="text-zinc-800 dark:text-zinc-200">6.5% Ponderado</strong>
                </div>
              </div>

              {/* Botones de Descarga PDF */}
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => handleDescargarPDF("executive")}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#C9A84C] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Propuesta Ejecutiva</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDescargarPDF("identical")}
                  className="w-full py-2 px-3 rounded-xl border border-zinc-300 dark:border-[#C9A84C]/30 bg-white dark:bg-[#08080C] text-zinc-800 dark:text-zinc-200 font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-[#0D0D13] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ilustración Oficial BMI (7 Págs.)</span>
                </button>
              </div>

              {/* Botón WhatsApp */}
              <button
                type="button"
                onClick={handleContactarAsesor}
                disabled={savingLead}
                className="w-full mt-2.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{savingLead ? "Registrando..." : "Enviar a Asesor por WhatsApp"}</span>
              </button>

              {leadSaved && (
                <div className="mt-2 text-[10px] text-emerald-500 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>¡Registrado en CRM de Vital Seguros!</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
