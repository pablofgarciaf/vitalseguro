"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Compass, 
  Sparkles, 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Sliders, 
  Plane, 
  Globe2, 
  MapPin, 
  ChevronDown, 
  DollarSign, 
  Send,
  Laptop,
  HeartHandshake
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grain from "@/components/ui/Grain";
import { getCommissionRates, type CommissionRates, DEFAULT_COMMISSION_RATES } from "@/lib/commissionService";
import { saveLead } from "@/lib/crmService";

export default function EscuelaViajesPage() {
  const [rates, setRates] = useState<CommissionRates>(DEFAULT_COMMISSION_RATES);
  const [activeTab, setActiveTab] = useState<"todos" | "viajes" | "vida" | "ventas">("todos");
  
  // Simulador de Ingresos de Asesor
  const [numPolizasVida, setNumPolizasVida] = useState(3);
  const [numPolizasViaje, setNumPolizasViaje] = useState(8);
  const [numPolizasSalud, setNumPolizasSalud] = useState(2);

  // Formulario de Inscripción
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("Quito");
  const [programaInteres, setProgramaInteres] = useState("Certificación Internacional Asesor de Viajes & Asistencia");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadRates() {
      const data = await getCommissionRates();
      setRates(data);
    }
    loadRates();
  }, []);

  // Cálculo de comisiones en el simulador
  const avgLifeTicket = 3000;
  const avgTravelTicket = 1200;
  const avgHealthTicket = 2800;

  const gananciaVida = Math.round(numPolizasVida * (avgLifeTicket * (rates.vida / 100)));
  const gananciaViaje = Math.round(numPolizasViaje * (avgTravelTicket * (rates.viaje / 100)));
  const gananciaSalud = Math.round(numPolizasSalud * (avgHealthTicket * (rates.salud / 100)));

  const ingresoMensual = gananciaVida + gananciaViaje + gananciaSalud;
  const ingresoAnual = ingresoMensual * 12;

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveLead({
      nombre,
      email,
      telefono,
      ciudad,
      ramo: "viaje",
      planDetalle: `Admisión Academia de Seguros: ${programaInteres}`,
      cobertura: "Aspirante a Certificación de Asesor",
      primaAnual: 1500,
      estado: "nuevo",
      asesor: "Coordinación Académica",
      notas: `Aspirante a la Academia de Seguros y Protección. Interés en ${programaInteres}.`,
      origen: "escuela_viajes"
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    setNombre("");
    setEmail("");
    setTelefono("");
  };

  const PROGRAMAS = [
    {
      id: "prog-1",
      categoria: "viajes",
      tag: "Sinergia Vermilion Luxury",
      titulo: "Certificación Internacional en Asesoría de Viajes & Asistencia Médica",
      duracion: "8 Semanas (120 Horas)",
      modalidad: "Online en Vivo + Talleres Prácticos",
      destacado: true,
      descripcion: "Aprende a diseñar expediciones privadas de lujo (Galápagos, Europa, Rutas de Aventura) y empaquetar coberturas médicas internacionales Schengen de $50k a $500k con alta rentabilidad.",
      modulos: [
        "Módulo 1: Geografía Turística de Lujo y Logística de Expediciones Privadas",
        "Módulo 2: Normativa Internacional Schengen, Visados y Asistencia Médica 24/7",
        "Módulo 3: Cotización de Pólizas Vital Travel Safe y Emisión Inmediata",
        "Módulo 4: Negociación con Clientes HNWI y Cierre de Paquetes Exclusivos"
      ]
    },
    {
      id: "prog-2",
      categoria: "vida",
      tag: "60% Comisión de Venta",
      titulo: "Especialización en Seguros de Vida & Blindaje Patrimonial Familiar",
      duracion: "6 Semanas (90 Horas)",
      modalidad: "Online Híbrido",
      destacado: false,
      descripcion: "Domina la venta consultiva del producto financiero más rentable del mercado. Aprende a estructurar planes de ahorro para jubilación, seguros de vida pura y herencias protegidas con comisiones del 60%.",
      modulos: [
        "Módulo 1: Psicología del Blindaje Familiar y Análisis de Necesidades Financieras",
        "Módulo 2: Matemática Financiera y Proyecciones de Ahorro para Retiro",
        "Módulo 3: El Arte del Cierre sin Presión y Manejo de las 5 Objeciones Típicas",
        "Módulo 4: Fidelización y Renovaciones Vitalicias"
      ]
    },
    {
      id: "prog-3",
      categoria: "ventas",
      tag: "The Agency Framework",
      titulo: "Masterclass de Crecimiento & Prospección Outbound para Asesores Digitales",
      duracion: "4 Semanas (60 Horas)",
      modalidad: "100% Práctico con Casos Reales",
      destacado: false,
      descripcion: "Aplica los 279 agentes de The Agency y estrategias de prospección en frío por LinkedIn, anuncios segmentados en Meta y WhatsApp conversacional para llenar tu agenda con 10 cotizaciones semanales.",
      modulos: [
        "Módulo 1: Marca Personal de Autoridad en LinkedIn e Instagram",
        "Módulo 2: Embudos de Captación con Lead Magnets y Cotizadores Interactivos",
        "Módulo 3: Protocolo de WhatsApp Business para Cerrar en los Primeros 3 Mensajes",
        "Módulo 4: Automatización de Seguimiento con CRM"
      ]
    }
  ];

  const filteredPrograms = activeTab === "todos" 
    ? PROGRAMAS 
    : PROGRAMAS.filter(p => p.categoria === activeTab);

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-slate-100 selection:bg-[#C9A84C] selection:text-[#0A0A0F]">
      <Grain />
      <Navbar />

      {/* Hero Section Luxury & Academia */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#C9A84C]/15 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#E0C068] text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-[#C9A84C]" /> Escuela Oficial de Viajes & Seguros Vital
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.1]">
            Forjamos a los Asesores de <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#E0C068] via-[#C9A84C] to-[#8C6D23] bg-clip-text text-transparent">
              Viajes & Protección
            </span> más Exitosos
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed">
            Fusionamos la excelencia en expediciones privadas de <strong className="text-white">Vermilion Routes</strong> con la rigurosidad metodológica de <strong className="text-white">SAP Academy</strong>. Conviértete en un asesor certificado con comisiones del <strong className="text-[#34D399]">{rates.vida}%</strong> en vida y acceso directo a nuestro portafolio global.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#programas"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Ver Programas & Certificaciones</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#simulador"
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 active:scale-95 transition-all flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4 text-[#34D399]" />
              <span>Simular Mis Comisiones ({rates.vida}%)</span>
            </a>
          </div>

          {/* Badges de Confianza */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-serif font-bold text-[#E0C068]">{rates.vida}%</div>
              <div className="text-xs text-slate-400 mt-1">Comisión en Seguro de Vida</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-serif font-bold text-blue-400">Vermilion</div>
              <div className="text-xs text-slate-400 mt-1">Sinergia en Viajes de Lujo</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-serif font-bold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Soporte y CRM en Vivo</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="text-2xl font-serif font-bold text-purple-400">Práctica</div>
              <div className="text-xs text-slate-400 mt-1">Casos Reales con Aseguradoras</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programas Académicos */}
      <section id="programas" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">Formación Ejecutiva</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-1">
              Planes de Estudio & Certificaciones
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("todos")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "todos" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-slate-400 hover:text-white"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab("viajes")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "viajes" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-slate-400 hover:text-white"
              }`}
            >
              Viajes & Asistencia
            </button>
            <button
              onClick={() => setActiveTab("vida")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "vida" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-slate-400 hover:text-white"
              }`}
            >
              Vida & Blindaje
            </button>
            <button
              onClick={() => setActiveTab("ventas")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "ventas" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-slate-400 hover:text-white"
              }`}
            >
              Ventas & Outbound
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div 
              key={prog.id}
              className={`rounded-2xl bg-[#12121A] border transition-all flex flex-col justify-between overflow-hidden relative group hover:border-[#C9A84C]/50 ${
                prog.destacado ? "border-[#C9A84C]/40 shadow-xl shadow-[#C9A84C]/5" : "border-white/10"
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-[#E0C068] border border-white/5">
                    {prog.tag}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5" /> {prog.modalidad}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-white group-hover:text-[#E0C068] transition-colors">
                  {prog.titulo}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {prog.descripcion}
                </p>

                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan de Aprendizaje:</div>
                  {prog.modulos.map((mod, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="#admision"
                  onClick={() => setProgramaInteres(prog.titulo)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#C9A84C] hover:text-[#0A0A0F] text-white text-xs font-bold text-center transition-all border border-white/10 hover:border-[#C9A84C] flex items-center justify-center gap-2"
                >
                  <span>Postular a esta Certificación</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulador Interactivo de Ingresos del Asesor */}
      <section id="simulador" className="py-20 px-6 bg-gradient-to-b from-[#0A0A0F] via-[#12121A] to-[#0A0A0F] border-y border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/20">
              Transparencia Absoluta de Ganancias
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              ¿Cuánto puedes ganar como Asesor Certificado Vital?
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Ajusta el número de pólizas que puedes colocar al mes con el acompañamiento de nuestros directores y calcula tus honorarios en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders de Control */}
            <div className="lg:col-span-7 bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              {/* Pólizas de Vida (60%) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                    <span className="text-sm font-semibold text-white">Pólizas de Vida / Retiro al mes:</span>
                  </div>
                  <span className="text-base font-bold text-[#E0C068] font-mono">{numPolizasVida} pólizas</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={numPolizasVida}
                  onChange={(e) => setNumPolizasVida(parseInt(e.target.value))}
                  className="w-full accent-[#C9A84C] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Tasa oficial: <strong className="text-white">{rates.vida}% de comisión</strong></span>
                  <span>Genera: <strong className="text-[#34D399]">${gananciaVida.toLocaleString()} USD/mes</strong></span>
                </div>
              </div>

              {/* Pólizas de Viaje (35%) */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-white">Pólizas de Viaje Vital Safe al mes:</span>
                  </div>
                  <span className="text-base font-bold text-blue-400 font-mono">{numPolizasViaje} pólizas</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={numPolizasViaje}
                  onChange={(e) => setNumPolizasViaje(parseInt(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Tasa oficial: <strong className="text-white">{rates.viaje}% de comisión</strong></span>
                  <span>Genera: <strong className="text-[#34D399]">${gananciaViaje.toLocaleString()} USD/mes</strong></span>
                </div>
              </div>

              {/* Pólizas de Salud (25%) */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">Seguros Médicos VIP al mes:</span>
                  </div>
                  <span className="text-base font-bold text-emerald-400 font-mono">{numPolizasSalud} pólizas</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={numPolizasSalud}
                  onChange={(e) => setNumPolizasSalud(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Tasa oficial: <strong className="text-white">{rates.salud}% de comisión</strong></span>
                  <span>Genera: <strong className="text-[#34D399]">${gananciaSalud.toLocaleString()} USD/mes</strong></span>
                </div>
              </div>
            </div>

            {/* Tarjeta de Resultado */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#12121A] to-[#1A1A24] border-2 border-[#C9A84C]/40 p-8 text-center space-y-6 shadow-2xl shadow-[#C9A84C]/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Ingreso Estimado Mensual</span>
                <div className="text-4xl md:text-5xl font-serif font-extrabold text-[#34D399] mt-2">
                  ${ingresoMensual.toLocaleString("en-US")} <span className="text-base text-slate-400 font-sans">USD</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Equivalente a <strong className="text-white">${ingresoAnual.toLocaleString("en-US")} USD</strong> al año en comisiones directas.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 text-left text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Vida ({rates.vida}%):</span>
                  <strong className="text-white">${gananciaVida.toLocaleString()} USD</strong>
                </div>
                <div className="flex justify-between">
                  <span>Asistencia en Viaje ({rates.viaje}%):</span>
                  <strong className="text-white">${gananciaViaje.toLocaleString()} USD</strong>
                </div>
                <div className="flex justify-between">
                  <span>Salud VIP ({rates.salud}%):</span>
                  <strong className="text-white">${gananciaSalud.toLocaleString()} USD</strong>
                </div>
              </div>

              <a
                href="#admision"
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all"
              >
                Comenzar Mi Certificación Hoy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Postulación & Admisión */}
      <section id="admision" className="py-20 px-6 max-w-3xl mx-auto">
        <div className="bg-[#12121A] border border-white/10 rounded-3xl p-8 md:p-10 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
              Formulario de Admisión a la Escuela
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              Cupos limitados por cohorte. Completa tus datos para coordinar una entrevista de admisión con la dirección académica.
            </p>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>¡Postulación recibida! Registrado en el CRM de Vital Seguros. Te contactaremos en menos de 24h.</span>
            </div>
          )}

          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre y apellido"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Teléfono</label>
                <input
                  type="text"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+593 99 123 4567"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad de Residencia</label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Programa de Preferencia</label>
                <select
                  value={programaInteres}
                  onChange={(e) => setProgramaInteres(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                >
                  <option value="Certificación Internacional Asesor de Viajes & Asistencia">Asesor de Viajes & Asistencia</option>
                  <option value="Especialización en Seguros de Vida & Blindaje Patrimonial">Seguros de Vida & Blindaje (60%)</option>
                  <option value="Masterclass de Crecimiento & Prospección Outbound">Ventas & Outbound Digital</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 pt-3"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Postulación a la Academia de Seguros</span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
