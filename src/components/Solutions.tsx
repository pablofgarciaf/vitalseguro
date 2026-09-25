"use client";

import { useState } from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SOLUTIONS = [
  {
    id: "salud",
    category: "Salud Médica",
    title: "Seguro Médico Integral",
    badge: "Más Solicitado",
    description:
      "Cobertura médica completa ambulatoria y hospitalaria para ti y tu familia. Acceso preferencial a las clínicas más prestigiosas del Ecuador y convenios internacionales de alta especialidad.",
    highlights: [
      "Cobertura hospitalaria y ambulatoria al 100%",
      "Maternidad y cuidados pediátricos",
      "Red médica internacional (EE.UU. y Europa)",
      "Medicinas continuas y terapias de rehabilitación",
    ],
    ctaText: "Cotizar Seguro Médico",
    waMsg: "Hola, deseo cotizar un Seguro Médico Integral para mi familia.",
  },
  {
    id: "vida-ahorro",
    category: "Vida & Ahorro",
    title: "Seguro de Vida con Ahorro & Retiro",
    badge: "Patrimonial",
    description:
      "Combina la tranquilidad de proteger a tus seres queridos con un fondo de inversión y ahorro capitalizable a largo plazo. Ideal para planificar el retiro o la universidad de tus hijos.",
    highlights: [
      "Capitalización con rendimientos competitivos",
      "Ahorro garantizado ante imprevistos",
      "Indemnización libre de impuestos sucesorios",
      "Flexibilidad de aportaciones periódicas",
    ],
    ctaText: "Planificar Fondo de Ahorro",
    waMsg: "Hola VitalSeguros, deseo asesoría para un Seguro de Vida con Ahorro e Inversión.",
  },
  {
    id: "vida-tradicional",
    category: "Protección Familiar",
    title: "Seguro de Vida Tradicional",
    badge: "Esencial",
    description:
      "Respaldo financiero inmediato para tu familia en caso de fallecimiento o invalidez total y permanente. Garantiza que sus metas sigan vivas sin importar lo que ocurra.",
    highlights: [
      "Alta suma asegurada con primas accesibles",
      "Cobertura por muerte accidental y sepelio",
      "Adelanto de capital ante enfermedades graves",
      "Renovación garantizada anual o temporal",
    ],
    ctaText: "Cotizar Seguro de Vida",
    waMsg: "Hola VitalSeguros, quiero información y cotización de un Seguro de Vida Tradicional.",
  },
  {
    id: "vehicular",
    category: "Movilidad",
    title: "Seguro Vehicular Integral",
    badge: "24/7 Asistencia",
    description:
      "Protección contra pérdidas totales o parciales por choque, robo o vandalismo. Con asistencia vial en todo el territorio ecuatoriano los 365 días del año.",
    highlights: [
      "Pérdida total por accidente o robo",
      "Daños a terceros y responsabilidad civil",
      "Auxilio mecánico, grúa y auto sustituto",
      "Talleres de marca autorizados",
    ],
    ctaText: "Cotizar Seguro de Auto",
    waMsg: "Hola VitalSeguros, deseo cotizar el Seguro Vehicular para mi auto.",
  },
  {
    id: "patrimonial",
    category: "Hogar & Patrimonio",
    title: "Seguros Patrimoniales & Casa Hogar",
    badge: "Patrimonio",
    description:
      "Protege tu hogar, departamentos y bienes de valor contra eventos catastróficos como terremotos, inundaciones, incendios y robo con allanamiento.",
    highlights: [
      "Cobertura de estructura y contenidos",
      "Protección ante terremoto y erupción volcánica",
      "Responsabilidad civil del hogar y mascotas",
      "Asistencia de plomería, cerrajería y electricidad",
    ],
    ctaText: "Proteger Mi Hogar",
    waMsg: "Hola VitalSeguros, quiero cotizar la protección de mi Casa/Hogar y bienes patrimoniales.",
  },
  {
    id: "empresarial",
    category: "Corporativo",
    title: "Seguros Empresariales y Colectivos",
    badge: "Empresas",
    description:
      "Soluciones diseñadas para proteger la continuidad de tu negocio, los activos de la empresa y la salud de tus colaboradores con planes grupales competitivos.",
    highlights: [
      "Planes médicos y de vida corporativos",
      "Lucro cesante y daños a maquinaria/equipos",
      "Responsabilidad civil para directores y patronal",
      "Protección ante eventos fortuitos y ciberriesgo",
    ],
    ctaText: "Asesoría Empresarial",
    waMsg: "Hola VitalSeguros, solicito una reunión para evaluar los Seguros Empresariales de mi compañía.",
  },
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="servicios"
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-white/10 bg-[#08080C] text-slate-100 relative overflow-hidden"
      aria-labelledby="soluciones-heading"
    >
      {/* Radial Gold Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#E0C068] font-mono font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                Portafolio Integral &bull; VitalSeguros
              </span>
            </div>
            <h2
              id="soluciones-heading"
              className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
            >
              Descubre todas nuestras{" "}
              <span className="text-gold-gradient font-light italic">
                soluciones en seguros
              </span>
            </h2>
          </div>
          <p className="text-slate-300 text-sm sm:text-base max-w-md font-sans leading-relaxed">
            Analizamos tus prioridades reales para estructurar pólizas personalizadas con las aseguradoras más sólidas de Ecuador y del mundo.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-3 mb-10 no-scrollbar" role="tablist">
          {SOLUTIONS.map((sol, index) => (
            <button
              key={sol.id}
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                activeTab === index
                  ? "bg-gradient-to-r from-[#C9A84C] via-[#E0C068] to-[#C9A84C] text-[#0A0A0F] font-extrabold border-transparent shadow-lg shadow-[#C9A84C]/30 scale-[1.02]"
                  : "border-white/15 bg-white/5 text-slate-300 hover:border-[#C9A84C]/40 hover:text-white"
              }`}
            >
              {sol.category}
            </button>
          ))}
        </div>

        {/* Active Solution Feature Box with Framer Motion AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-[#C9A84C]/40 bg-[#08080C]/85 backdrop-blur-2xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.6)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/15 text-[#E0C068] font-mono text-xs uppercase tracking-[0.2em] font-bold mb-4">
                  <Sparkles className="w-3 h-3 text-[#C9A84C]" />
                  <span>{SOLUTIONS[activeTab].badge}</span>
                </div>
                <h3 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mb-4 leading-tight">
                  {SOLUTIONS[activeTab].title}
                </h3>
                <p className="text-slate-200 text-base leading-relaxed mb-6 font-sans">
                  {SOLUTIONS[activeTab].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {SOLUTIONS[activeTab].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#C9A84C]/25 text-[#E0C068] border border-[#C9A84C]/40 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://wa.me/593995451814?text=${encodeURIComponent(
                      SOLUTIONS[activeTab].waMsg
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E0C068] to-[#C9A84C] text-[#0A0A0F] font-bold text-xs uppercase tracking-[0.15em] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#C9A84C]/30 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{SOLUTIONS[activeTab].ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#cotizador"
                    className="px-6 py-4 rounded-xl border border-white/20 bg-white/5 text-white hover:border-[#C9A84C] font-mono text-xs uppercase tracking-[0.1em] transition-all inline-flex items-center gap-2 cursor-pointer backdrop-blur-md active:scale-95"
                  >
                    <span>Ver cotizador rápido</span>
                  </a>
                </div>
              </div>

              {/* 3-Step Process Box */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-[#C9A84C]/30 bg-black/40 backdrop-blur-md relative overflow-hidden">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E0C068] font-bold block mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#C9A84C]" />
                  PROCESO DE ASESORÍA EN 3 PASOS
                </span>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#C9A84C] text-[#0A0A0F] font-mono text-xs font-bold shrink-0 shadow-md">
                      01
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white mb-1">
                        Análisis de Necesidades
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Evaluamos tu perfil clínico, familiar o empresarial sin costo alguno.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#C9A84C] text-[#0A0A0F] font-mono text-xs font-bold shrink-0 shadow-md">
                      02
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white mb-1">
                        Diseño Multicompañía
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Comparamos coberturas y deducibles entre aseguradoras líderes (BMI, Saludsa, Chubb, Sweaden).
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#C9A84C] text-[#0A0A0F] font-mono text-xs font-bold shrink-0 shadow-md">
                      03
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white mb-1">
                        Acompañamiento en Siniestros
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Si ocurre una emergencia, nos encargamos de todo el trámite ante la aseguradora para tu reembolso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 6 Services Grid Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setActiveTab(idx)}
              className={`rounded-2xl border p-6 transition-all duration-500 cursor-pointer backdrop-blur-md ${
                activeTab === idx
                  ? "border-[#C9A84C] bg-[#08080C]/90 shadow-[0_10px_35px_rgba(201,168,76,0.15)] -translate-y-1"
                  : "border-white/10 bg-[#08080C]/60 hover:border-[#C9A84C]/50 hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#E0C068]">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                  {s.badge}
                </span>
              </div>
              <h4 className="font-serif font-bold text-lg text-white mb-2">
                {s.title}
              </h4>
              <p className="text-slate-300 text-xs line-clamp-2 mb-4 leading-relaxed">
                {s.description}
              </p>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E0C068] font-bold flex items-center gap-1.5 group-hover:text-white">
                <span>Ver detalles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}