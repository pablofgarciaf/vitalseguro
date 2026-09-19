"use client";

import { useState } from "react";
import { Check } from "lucide-react";

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
    waMsg: "Hola Gabriel, deseo asesoría para un Seguro de Vida con Ahorro e Inversión.",
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
    waMsg: "Hola Gabriel, quiero información y cotización de un Seguro de Vida Tradicional.",
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
    waMsg: "Hola Gabriel, deseo cotizar el Seguro Vehicular para mi auto.",
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
    waMsg: "Hola Gabriel, quiero cotizar la protección de mi Casa/Hogar y bienes patrimoniales.",
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
    waMsg: "Hola Gabriel, solicito una reunión para evaluar los Seguros Empresariales de mi compañía.",
  },
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="servicios"
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-black/5 dark:border-white/5 relative"
      aria-labelledby="soluciones-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 pb-8 border-b border-black/8 dark:border-white/8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-mono font-medium">
                Portafolio Integral &bull; DC Asesores
              </span>
            </div>
            <h2
              id="soluciones-heading"
              className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-[#D4D4D4]"
            >
              Descubre todas nuestras{" "}
              <span className="text-gold-gradient font-normal italic">
                soluciones en seguros
              </span>
            </h2>
          </div>
          <p className="text-zinc-600 dark:text-[#A9A9A9] text-sm sm:text-base max-w-md font-sans leading-relaxed">
            Analizamos tus prioridades reales para estructurar pólizas personalizadas con las aseguradoras más sólidas de Ecuador y del mundo.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-10 no-scrollbar" role="tablist">
          {SOLUTIONS.map((sol, index) => (
            <button
              key={sol.id}
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                activeTab === index
                  ? "bg-gradient-to-r from-[#C9A84C] via-[#F5D78A] to-[#B8860B] text-[#0A0A0F] font-bold border-transparent shadow-md shadow-[#C9A84C]/20"
                  : "border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] text-zinc-600 dark:text-[#A9A9A9] hover:border-[#C9A84C]/30"
              }`}
            >
              {sol.category}
            </button>
          ))}
        </div>

        {/* Active Solution Feature Box */}
        <div className="rounded-[24px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-sm p-8 sm:p-12 mb-12 relative overflow-hidden group shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] font-mono text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">
                <span>✦</span>
                <span>{SOLUTIONS[activeTab].badge}</span>
              </div>
              <h3 className="font-serif font-light text-2xl sm:text-3xl lg:text-4xl text-zinc-900 dark:text-[#D4D4D4] mb-4 leading-tight">
                {SOLUTIONS[activeTab].title}
              </h3>
              <p className="text-zinc-600 dark:text-[#A9A9A9] text-base leading-relaxed mb-6 font-sans">
                {SOLUTIONS[activeTab].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {SOLUTIONS[activeTab].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#C9A84C]/20 text-[#C9A84C] shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-800 dark:text-[#D4D4D4] font-sans">
                      {h}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/593991938754?text=${encodeURIComponent(
                    SOLUTIONS[activeTab].waMsg
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-luxury px-6 py-3 text-xs uppercase font-mono tracking-[0.1em] active:scale-95"
                >
                  <span>{SOLUTIONS[activeTab].ctaText}</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a
                  href="#cotizador"
                  className="px-6 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/[0.03] text-zinc-800 dark:text-[#A9A9A9] hover:border-[#C9A84C]/40 font-mono text-xs uppercase tracking-[0.1em] transition-all inline-flex items-center gap-2 no-underline cursor-pointer"
                >
                  <span>Ver cotizador rápido</span>
                </a>
              </div>
            </div>

            {/* 3-Step Process Box */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-[20px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold block mb-4">
                PROCESO DE ASESORÍA EN 3 PASOS
              </span>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#C9A84C] text-[#0A0A0F] font-mono text-xs font-bold shrink-0">
                    01
                  </span>
                  <div>
                    <h4 className="font-serif font-normal text-sm text-zinc-900 dark:text-[#D4D4D4] mb-1">
                      Análisis de Necesidades
                    </h4>
                    <p className="text-zinc-600 dark:text-[#8E8E93] text-xs leading-relaxed font-sans">
                      Evaluamos tu perfil clínico, familiar o empresarial sin costo alguno.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#C9A84C] text-[#0A0A0F] font-mono text-xs font-bold shrink-0">
                    02
                  </span>
                  <div>
                    <h4 className="font-serif font-normal text-sm text-zinc-900 dark:text-[#D4D4D4] mb-1">
                      Diseño Multicompañía
                    </h4>
                    <p className="text-zinc-600 dark:text-[#8E8E93] text-xs leading-relaxed font-sans">
                      Comparamos coberturas y deducibles entre aseguradoras líderes (BMI, Saludsa, Chubb, Sweaden).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#C9A84C] text-[#0A0A0F] font-mono text-xs font-bold shrink-0">
                    03
                  </span>
                  <div>
                    <h4 className="font-serif font-normal text-sm text-zinc-900 dark:text-[#D4D4D4] mb-1">
                      Acompañamiento en Siniestros
                    </h4>
                    <p className="text-zinc-600 dark:text-[#8E8E93] text-xs leading-relaxed font-sans">
                      Si ocurre una emergencia, nos encargamos de todo el trámite ante la aseguradora para tu reembolso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Services Grid Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SOLUTIONS.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setActiveTab(idx)}
              className={`rounded-[20px] border p-6 transition-all duration-300 cursor-pointer ${
                activeTab === idx
                  ? "border-[#C9A84C] bg-white dark:bg-white/[0.05] shadow-lg shadow-[#C9A84C]/10"
                  : "border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] hover:border-[#C9A84C]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-semibold text-[#C9A84C]">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/[0.05] text-[#A9A9A9]">
                  {s.badge}
                </span>
              </div>
              <h4 className="font-serif font-light text-lg text-zinc-900 dark:text-[#D4D4D4] mb-2">
                {s.title}
              </h4>
              <p className="text-zinc-600 dark:text-[#8E8E93] text-xs line-clamp-2 mb-4 leading-relaxed font-sans">
                {s.description}
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold flex items-center gap-1.5">
                <span>Ver detalles</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}