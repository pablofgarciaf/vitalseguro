"use client";

import { useState } from "react";
import {
  HeartPulse,
  Download,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Phone,
  Mail,
  Send,
  Sparkles,
  Users,
  ShieldCheck,
  Plus,
  Check
} from "lucide-react";
import { generateHealthProposalPDF, HealthPDFData } from "@/lib/pdfGenerator";
import { saveLead } from "@/lib/crmService";

export default function CotizadorSalud() {
  // Datos del Titular
  const [nombre, setNombre] = useState("Pablo García");
  const [edad, setEdad] = useState<number>(38);
  const [sexo, setSexo] = useState<"1" | "2">("1"); // 1: Masculino, 2: Femenino
  const [estadoCivil, setEstadoCivil] = useState<string>(""); // No obligatorio

  // Cónyuge (Condicional al final si estado civil es Casado)
  const [incluirConyuge, setIncluirConyuge] = useState(false);
  const [edadConyuge, setEdadConyuge] = useState<number>(36);

  // Hijos dependientes (Selector simple)
  const [hijos, setHijos] = useState<number>(0);

  // Contacto compacto flexible (WhatsApp / Correo)
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [preferEmail, setPreferEmail] = useState(false);

  // Configuración de Póliza
  const [producto, setProducto] = useState("Meridian II");
  const [deducible, setDeducible] = useState("$2,500");
  const [areaGeografica, setAreaGeografica] = useState("Global (Incluyendo EE.UU.)");
  const [frecuenciaPago, setFrecuenciaPago] = useState("Anual"); // Ahora es dropdown tipo lista

  // Anexos Médicos (POR DEFECTO NO PREMARCADOS)
  const [maternidad, setMaternidad] = useState(false);
  const [trasplantes, setTrasplantes] = useState(false);
  const [evacuacion, setEvacuacion] = useState(false);

  const [savingLead, setSavingLead] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);

  const productosSalud = [
    { id: "Meridian II", label: "Meridian II - $5,000,000 USD Vitalicio (VIP EE.UU.)", maxCov: "$5,000,000 USD", slug: "meridian-ii", baseRate: 1850 },
    { id: "Azure", label: "Azure - $3,000,000 USD Global", maxCov: "$3,000,000 USD", slug: "azure", baseRate: 1550 },
    { id: "Ideal", label: "Ideal - $2,000,000 USD Familiar / Corporativo", maxCov: "$2,000,000 USD", slug: "ideal", baseRate: 1250 },
    { id: "Support", label: "Support - $1,000,000 USD Alta Complejidad", maxCov: "$1,000,000 USD", slug: "support", baseRate: 980 },
    { id: "Sigma", label: "Sigma - $1,500,000 USD Copago Compartido", maxCov: "$1,500,000 USD", slug: "sigma", baseRate: 1100 },
    { id: "Gastos Médicos Mayores", label: "Gastos Médicos Mayores - $500,000 USD Clínico", maxCov: "$500,000 USD", slug: "gastos-medicos-mayores", baseRate: 750 },
    { id: "Innova", label: "Innova - $1,000,000 USD Telemedicina & Ambulatorio", maxCov: "$1,000,000 USD", slug: "innova", baseRate: 890 },
  ];

  const currentProductObj = productosSalud.find(p => p.id === producto) || productosSalud[0];

  const deduciblesList = [
    { label: "$1,000 USD", factor: 1.18 },
    { label: "$2,000 USD", factor: 1.08 },
    { label: "$2,500 USD", factor: 1.0 },
    { label: "$5,000 USD", factor: 0.82 },
    { label: "$10,000 USD", factor: 0.68 },
    { label: "$20,000 USD", factor: 0.55 },
  ];

  const frecuenciasPagoList = [
    { id: "Anual", label: "Anual (1 pago / año)", factor: 1.0 },
    { id: "Semestral", label: "Semestral (2 pagos / año)", factor: 0.52 },
    { id: "Trimestral", label: "Trimestral (4 pagos / año)", factor: 0.27 },
    { id: "Mensual", label: "Mensual (12 pagos / año)", factor: 0.09 },
  ];

  // Cálculo Actuarial de Salud Médica
  const calcularSalud = () => {
    const base = currentProductObj.baseRate;

    let ageFactor = 1.0;
    if (edad > 30) ageFactor += (edad - 30) * 0.022;
    if (edad > 50) ageFactor += (edad - 50) * 0.035;

    const dedFactor = deduciblesList.find(d => d.label === deducible)?.factor || 1.0;
    const geoFactor = areaGeografica.includes("Excluyendo") ? 0.82 : 1.0;

    let totalAnual = base * ageFactor * dedFactor * geoFactor;

    // Solo si el estado civil es Casado y el usuario activó el cónyuge
    if (estadoCivil === "Casado(a)" && incluirConyuge) {
      let spouseFactor = 1.0;
      if (edadConyuge > 30) spouseFactor += (edadConyuge - 30) * 0.022;
      totalAnual += base * spouseFactor * dedFactor * geoFactor * 0.90;
    }

    if (hijos > 0) {
      totalAnual += hijos * (base * 0.45 * dedFactor * geoFactor);
    }

    // Anexos opcionales (NO premarcados)
    if (maternidad) totalAnual += 180;
    if (trasplantes) totalAnual += 75;
    if (evacuacion) totalAnual += 60;

    const primaAnual = Math.round(totalAnual);

    const freqObj = frecuenciasPagoList.find(f => f.id === frecuenciaPago) || frecuenciasPagoList[0];
    const primaModal = Math.round(primaAnual * freqObj.factor);

    return { primaAnual, primaModal };
  };

  const calculos = calcularSalud();

  const handleDescargarPDFSalud = () => {
    if (telefono || email) {
      saveLead({
        nombre: nombre || "Prospecto Salud",
        email: email || "contacto@cliente.com",
        telefono: telefono || "No especificado",
        ciudad: "Ecuador",
        ramo: "salud",
        planDetalle: producto,
        cobertura: currentProductObj.maxCov,
        primaAnual: calculos.primaAnual,
        estado: "nuevo",
        asesor: "VitalSeguros",
        notas: `Cotización Salud: Deducible ${deducible}, Área: ${areaGeografica}, Estado civil: ${estadoCivil || "No especificado"}, Cónyuge: ${incluirConyuge ? "Sí" : "No"}, Hijos: ${hijos}. Prima Anual: $${calculos.primaAnual} USD.`,
        origen: "cotizador_web"
      });
    }

    const healthData: HealthPDFData = {
      nombre,
      edad,
      sexo,
      telefono,
      email,
      producto,
      coberturaMax: currentProductObj.maxCov,
      deducible,
      areaGeografica,
      frecuenciaPago,
      primaAnual: calculos.primaAnual,
      primaModal: calculos.primaModal,
      anexos: [
        maternidad ? "Maternidad y Complicaciones de Parto" : "",
        trasplantes ? "Trasplante de Órganos ($1,000,000 USD)" : "",
        evacuacion ? "Ambulancia Aérea y Evacuación Médica" : ""
      ].filter(Boolean)
    };

    const doc = generateHealthProposalPDF(healthData);
    doc.save(`Propuesta_Salud_${producto.replace(/\s+/g, "_")}_${nombre.replace(/\s+/g, "_")}.pdf`);
  };

  const handleContactarAsesor = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLead(true);

    const contactVal = preferEmail ? email : telefono;
    const conyugeTexto = estadoCivil === "Casado(a)" && incluirConyuge ? `\n💍 Cónyuge incluido (${edadConyuge} años)` : "";
    const hijosTexto = hijos > 0 ? `\n👶 Hijos dependientes: ${hijos}` : "";

    const text = `Hola VitalSeguros, coticé el Seguro de Salud Internacional en la web:
🏥 Plan: ${producto} (${currentProductObj.maxCov})
👤 Titular: ${nombre} (${edad} años, ${sexo === "1" ? "Masculino" : "Femenino"}${estadoCivil ? `, ${estadoCivil}` : ""})${conyugeTexto}${hijosTexto}
🏷️ Deducible: ${deducible} USD
🌎 Área: ${areaGeografica}
💳 Frecuencia de Pago: ${frecuenciaPago}
💰 Inversión: $${calculos.primaModal.toLocaleString()} USD (${frecuenciaPago}) | $${calculos.primaAnual.toLocaleString()} USD/año
📱 Contacto: ${contactVal || "No especificado"}

Deseo coordinar la emisión o una videollamada explicativa con un asesor de Vital Seguros.`;

    saveLead({
      nombre,
      email: email || "contacto@cliente.com",
      telefono: telefono || "No especificado",
      ciudad: "Ecuador",
      ramo: "salud",
      planDetalle: producto,
      cobertura: currentProductObj.maxCov,
      primaAnual: calculos.primaAnual,
      estado: "nuevo",
      asesor: "VitalSeguros",
      notas: `Lead Salud: Deducible ${deducible}, $${calculos.primaAnual}/año`,
      origen: "cotizador_web"
    }).finally(() => {
      setSavingLead(false);
      setLeadSaved(true);
      window.open(`https://wa.me/593995451814?text=${encodeURIComponent(text)}`, "_blank");
    });
  };

  const isCasado = estadoCivil === "Casado(a)";

  return (
    <section
      id="cotizador-salud"
      className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans"
      aria-labelledby="salud-title"
    >
      {/* Header Estilo Alan Health: Tipografía Limpia, Alta Empatía y Cero Saturación */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold tracking-wide uppercase mb-3 shadow-xs">
          <HeartPulse className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Salud Médica Internacional &bull; Cobertura Total</span>
        </div>
        <h2 id="salud-title" className="font-serif font-normal text-3xl sm:text-5xl tracking-tight text-slate-900 dark:text-white">
          Cotizador de <span className="font-light italic text-emerald-600 dark:text-emerald-400">Salud Integral</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          Diseñado con los estándares de simplicidad de Alan: cálculo transparente, acceso a las mejores clínicas de Ecuador y hospitales en EE.UU. como Johns Hopkins.
        </p>
      </div>

      {/* Main Container Alan Style: Bordes suaves, tarjetas limpias, sombra ultra-sutil */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-[#C9A84C]/25 bg-white dark:bg-[#08080C] shadow-[0_10px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.4)] p-6 sm:p-8 lg:p-10 transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Columna Izquierda (8 columnas): Flujo ordenado con inputs limpios */}
          <div className="lg:col-span-8 space-y-6">

            {/* ===== BLOQUE 1: DATOS DEL TITULAR Y GRUPO FAMILIAR ===== */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-[#0D0D13] border border-slate-200/70 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  1. Datos del Titular y Familia
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Información confidencial</span>
              </div>

              {/* Fila 1: Nombre, Edad, Estado Civil (no obligatorio) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
                {/* Nombre y Apellidos */}
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nombre y apellidos
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Pablo García"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Edad Digitada */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 text-center">
                    Edad
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={edad}
                    onChange={(e) => setEdad(Math.max(18, Math.min(75, parseInt(e.target.value) || 18)))}
                    className="w-full h-11 px-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-bold text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                  />
                </div>

                {/* Sexo (Dropdown limpio estilo Alan) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 text-center">
                    Sexo
                  </label>
                  <div className="relative">
                    <select
                      value={sexo}
                      onChange={(e) => setSexo(e.target.value as "1" | "2")}
                      className="w-full h-11 pl-3 pr-7 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-800 dark:text-slate-200 appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                    >
                      <option value="1">Masculino</option>
                      <option value="2">Femenino</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Estado Civil (No obligatorio) */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Estado Civil <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={estadoCivil}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEstadoCivil(val);
                        if (val !== "Casado(a)") {
                          setIncluirConyuge(false);
                        }
                      }}
                      className="w-full h-11 pl-3 pr-7 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-medium text-slate-800 dark:text-slate-200 appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Soltero(a)">Soltero(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Unión libre">Unión libre</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Viudo(a)">Viudo(a)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Fila 2: Teléfono compacto (espacio reducido), Hijos dependientes y BOTÓN DEL CÓNYUGE AL FINAL */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end pt-1">
                {/* Teléfono / WhatsApp Compacto */}
                <div className="sm:col-span-5">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {preferEmail ? "Correo" : "WhatsApp / Celular"}
                    </label>
                    <button
                      type="button"
                      onClick={() => setPreferEmail(!preferEmail)}
                      className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium hover:underline cursor-pointer"
                    >
                      {preferEmail ? "Cambiar a Celular" : "Cambiar a Correo"}
                    </button>
                  </div>
                  {preferEmail ? (
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu-correo@ejemplo.com"
                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="099 123 4567"
                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}
                </div>

                {/* Hijos dependientes (Dropdown limpio como productos de salud) */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Hijos dependientes
                  </label>
                  <div className="relative">
                    <select
                      value={hijos}
                      onChange={(e) => setHijos(parseInt(e.target.value) || 0)}
                      className="w-full h-11 pl-3 pr-7 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-slate-800 dark:text-slate-200 appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                    >
                      <option value={0}>0 dependientes</option>
                      <option value={1}>1 hijo</option>
                      <option value={2}>2 hijos</option>
                      <option value={3}>3 hijos</option>
                      <option value={4}>4 hijos</option>
                      <option value={5}>5 o más hijos</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* BOTÓN DEL CÓNYUGE AL FINAL (Solo aparece si el estado civil es Casado) */}
                <div className="sm:col-span-4 flex items-center">
                  {isCasado ? (
                    <div className="w-full p-2 rounded-xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 transition-all flex flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-emerald-900 dark:text-emerald-300">
                          <input
                            type="checkbox"
                            checked={incluirConyuge}
                            onChange={(e) => setIncluirConyuge(e.target.checked)}
                            className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                          />
                          <span>Incluir Cónyuge (-10%)</span>
                        </label>
                      </div>

                      {incluirConyuge && (
                        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40">
                          <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">Edad Cónyuge:</span>
                          <input
                            type="number"
                            min={18}
                            max={75}
                            value={edadConyuge}
                            onChange={(e) => setEdadConyuge(Math.max(18, Math.min(75, parseInt(e.target.value) || 30)))}
                            className="w-16 h-8 px-2 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-zinc-900 text-xs font-bold text-center focus:ring-1 focus:ring-emerald-500 outline-none"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="hidden sm:block text-[11px] text-slate-400 italic py-2">
                      {estadoCivil ? "Titular individual seleccionado" : "Indica estado civil para opciones familiares"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ===== BLOQUE 2: CONFIGURACIÓN DE PÓLIZA MÉDICA ===== */}
            <div className="p-6 rounded-2xl bg-slate-50/70 dark:bg-[#0D0D13] border border-slate-200/70 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-zinc-800">
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  2. Configuración de Cobertura Médica
                </span>
                <a
                  href={`/seguros/${currentProductObj.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  <span>Ver ficha hospitalaria</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Fila: Producto de Salud y Deducible */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                {/* Producto de Salud BMI */}
                <div className="sm:col-span-7">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Producto de Salud BMI
                  </label>
                  <div className="relative">
                    <select
                      value={producto}
                      onChange={(e) => setProducto(e.target.value)}
                      className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                    >
                      {productosSalud.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Deducible por Evento */}
                <div className="sm:col-span-5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Deducible por Evento
                  </label>
                  <div className="relative">
                    <select
                      value={deducible}
                      onChange={(e) => setDeducible(e.target.value)}
                      className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                    >
                      {deduciblesList.map((d) => (
                        <option key={d.label} value={d.label}>{d.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Fila: Área de Cobertura y FRECUENCIA DE PAGO (COMO LISTA / DROPDOWN) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pt-1">
                {/* Área de Cobertura */}
                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Área Geográfica de Cobertura
                  </label>
                  <div className="relative">
                    <select
                      value={areaGeografica}
                      onChange={(e) => setAreaGeografica(e.target.value)}
                      className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-medium text-slate-800 dark:text-slate-200 appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                    >
                      <option value="Global (Incluyendo EE.UU.)">Global (Incluyendo Hospitales de EE.UU.)</option>
                      <option value="Global (Excluyendo EE.UU.)">Global (Excluyendo EE.UU. - Descuento 18%)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Frecuencia de Pago (DROPDOWN ESTILO ALAN / PRODUCTOS DE SALUD) */}
                <div className="sm:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Frecuencia de Pago
                  </label>
                  <div className="relative">
                    <select
                      value={frecuenciaPago}
                      onChange={(e) => setFrecuenciaPago(e.target.value)}
                      className="w-full h-11 pl-3.5 pr-10 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-bold text-slate-900 dark:text-white appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all"
                    >
                      {frecuenciasPagoList.map((f) => (
                        <option key={f.id} value={f.id}>{f.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Fila: Beneficios Adicionales / Anexos Médicos (SIN PREMARCAR - POR DEFECTO FALSE) */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Beneficios Opcionales / Anexos <span className="text-slate-400 font-normal">(Haz clic para activar)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Parto / Maternidad */}
                  <button
                    type="button"
                    onClick={() => setMaternidad(!maternidad)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      maternidad
                        ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 shadow-xs"
                        : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Parto / Maternidad</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Complicaciones y recién nacido</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      maternidad ? "bg-emerald-600 text-white" : "border border-slate-300 dark:border-zinc-700"
                    }`}>
                      {maternidad && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Trasplantes $1M */}
                  <button
                    type="button"
                    onClick={() => setTrasplantes(!trasplantes)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      trasplantes
                        ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 shadow-xs"
                        : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Trasplante $1,000,000</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Órganos vitales y donante</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      trasplantes ? "bg-emerald-600 text-white" : "border border-slate-300 dark:border-zinc-700"
                    }`}>
                      {trasplantes && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {/* Ambulancia Aérea */}
                  <button
                    type="button"
                    onClick={() => setEvacuacion(!evacuacion)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      evacuacion
                        ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 shadow-xs"
                        : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Ambulancia Aérea</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Evacuación médica global</div>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                      evacuacion ? "bg-emerald-600 text-white" : "border border-slate-300 dark:border-zinc-700"
                    }`}>
                      {evacuacion && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* ===== COLUMNA DERECHA (4 COLUMNAS): TARJETA RESUMEN ALAN STYLE ===== */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-50/60 via-white to-white dark:from-emerald-950/30 dark:via-[#0D0D13] dark:to-[#08080C] shadow-xl relative overflow-hidden">
              
              {/* Badge Superior */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100/70 dark:bg-emerald-900/50 px-2.5 py-1 rounded-full">
                  Propuesta Personalizada
                </span>
                <span className="text-[11px] font-mono text-slate-400">BMI Seguros</span>
              </div>

              {/* Inversión Principal */}
              <div className="text-center py-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                  Inversión en Salud ({frecuenciaPago})
                </span>
                <div className="flex items-baseline justify-center gap-1.5 my-1.5">
                  <span className="font-serif text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    ${calculos.primaModal.toLocaleString()}
                  </span>
                  <span className="font-mono text-sm text-slate-400 font-semibold">USD</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Aporte total de <strong className="text-slate-900 dark:text-white font-bold">${calculos.primaAnual.toLocaleString()} USD</strong> al año
                </p>
              </div>

              {/* Resumen Clínico / Prestaciones Clave */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-zinc-800 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Cobertura Vitalicia:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{currentProductObj.maxCov}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Deducible por Evento:</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-semibold">{deducible} USD</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Deducible en Ecuador:</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold text-[11px]">
                    50% de descuento
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 dark:border-zinc-800/80 pt-2 text-[11px]">
                  <span className="text-slate-400">Red Hospitalaria:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Johns Hopkins, Mayo Clinic</span>
                </div>
              </div>

              {/* Botón Descargar PDF */}
              <button
                type="button"
                onClick={handleDescargarPDFSalud}
                className="w-full mt-6 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Propuesta Médica (PDF)</span>
              </button>

              {/* Botón WhatsApp */}
              <button
                type="button"
                onClick={handleContactarAsesor}
                disabled={savingLead}
                className="w-full mt-2.5 py-3 px-4 rounded-xl border border-emerald-600/30 bg-white dark:bg-zinc-900 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 dark:hover:bg-emerald-950/40 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-emerald-600" />
                <span>{savingLead ? "Registrando..." : "Enviar a un Asesor por WhatsApp"}</span>
              </button>

              {leadSaved && (
                <div className="mt-2.5 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>¡Solicitud enviada a un asesor de Vital Seguros!</span>
                </div>
              )}
            </div>

            {/* Garantía de Cobertura */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/70 dark:border-zinc-800 text-center text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Emisión directa con BMI Financial Group.</span> Sin cargos ocultos ni trámites complejos.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
