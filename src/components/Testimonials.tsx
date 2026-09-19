"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    author: "Carlos Andrade",
    role: "Empresario y Padre de Familia",
    city: "Guayaquil",
    insurance: "Seguro Médico y Siniestro",
    quote:
      "Cuando mi hijo necesitó una cirugía de emergencia en Guayaquil, el equipo de VitalSeguros gestionó la preautorización en cuestión de minutos. No tuvimos que pagar ni un solo centavo de más. Ese nivel de acompañamiento humano no lo encuentras en ningún call center.",
    rating: 5,
  },
  {
    author: "Dra. María Fernanda Torres",
    role: "Médico Especialista",
    city: "Quito",
    insurance: "Seguro Médico Internacional",
    quote:
      "Como médico, sé perfectamente lo importante que es tener una póliza con libre elección hospitalaria. VitalSeguros me estructuró un plan con cobertura en EE.UU. y Ecuador que supera por mucho lo que me ofrecían otras agencias tradicionales.",
    rating: 5,
  },
  {
    author: "Jorge Paredes",
    role: "Director de Operaciones",
    city: "Cuenca",
    insurance: "Vida con Ahorro & Retiro",
    quote:
      "Buscaba una opción que no fuera solo un gasto, sino un instrumento de capitalización para los estudios universitarios de mis hijas y mi propia jubilación. La asesoría de VitalSeguros fue clara, numérica y con cero letra chica.",
    rating: 5,
  },
  {
    author: "Andrea Molina",
    role: "Arquitecta Independiente",
    city: "Cumbayá / Quito",
    insurance: "Seguro Vehicular & Hogar",
    quote:
      "Tuve un choque en la autopista y en menos de 20 minutos ya tenía la grúa y el perito coordinados por VitalSeguros y el equipo de VitalSeguros. Me asignaron auto sustituto mientras reparaban el mío en el concesionario. Impecable servicio.",
    rating: 5,
  },
  {
    author: "Ing. Luis Cárdenas",
    role: "Gerente de Operaciones",
    city: "Quito",
    insurance: "Seguro Empresarial Colectivo",
    quote:
      "Aseguramos la salud y vida de más de 45 colaboradores con VitalSeguros. Nos redujo costos administrativos y mejoró las coberturas. La atención 24/7 para emergencias laborales ha sido insuperable.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="testimonios"
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-black/5 dark:border-white/5 relative"
      aria-labelledby="testimonios-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-black/8 dark:border-white/8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-mono font-medium">
                Casos de Éxito &bull; Experiencias Reales
              </span>
            </div>
            <h2
              id="testimonios-title"
              className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-[#D4D4D4]"
            >
              Lo que opinan las{" "}
              <span className="text-gold-gradient font-normal italic">
                familias que protegemos
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Testimonio anterior"
              className="w-10 h-10 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-[#A9A9A9] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors cursor-pointer bg-white dark:bg-white/[0.03]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente testimonio"
              className="w-10 h-10 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-[#A9A9A9] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors cursor-pointer bg-white dark:bg-white/[0.03]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((t, idx) => {
            const isFeatured = idx === currentIndex;
            return (
              <div
                key={idx}
                className={`rounded-[20px] border p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between ${
                  isFeatured
                    ? "border-[#C9A84C] bg-white dark:bg-white/[0.05] shadow-xl shadow-[#C9A84C]/10"
                    : "border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] hover:border-[#C9A84C]/30"
                }`}
              >
                <div>
                  {/* Rating Stars in Vermilion Gold */}
                  <div className="flex items-center gap-1 text-[#C9A84C] mb-4" aria-label="5 estrellas">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] font-mono text-[10px] uppercase tracking-[0.15em] font-medium mb-4">
                    {t.insurance}
                  </span>

                  {/* Quote */}
                  <p className="text-zinc-700 dark:text-[#D4D4D4] text-sm leading-relaxed mb-6 font-sans italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-normal text-base text-zinc-900 dark:text-[#D4D4D4]">
                      {t.author}
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 dark:text-[#8E8E93]">
                      {t.role} &bull; {t.city}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 flex items-center justify-center font-serif font-bold text-xs">
                    {t.author[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
