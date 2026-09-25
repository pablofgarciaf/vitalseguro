"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      "Tuve un choque en la autopista y en menos de 20 minutos ya tenía la grúa y el perito coordinados por VitalSeguros. Me asignaron auto sustituto mientras reparaban el mío en el concesionario. Impecable servicio.",
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
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-white/10 bg-[#08080C] text-slate-100 relative overflow-hidden"
      aria-labelledby="testimonios-title"
    >
      {/* Aetherion Background Radial Gold Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#E0C068] font-mono font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                Casos de Éxito &bull; Experiencias Reales
              </span>
            </div>
            <h2
              id="testimonios-title"
              className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white"
            >
              Lo que opinan las{" "}
              <span className="text-gold-gradient font-light italic">
                familias que protegemos
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Testimonio anterior"
              className="w-11 h-11 rounded-2xl border border-[#C9A84C]/30 bg-[#08080C]/80 backdrop-blur-md flex items-center justify-center text-slate-200 hover:border-[#C9A84C] hover:text-[#E0C068] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente testimonio"
              className="w-11 h-11 rounded-2xl border border-[#C9A84C]/30 bg-[#08080C]/80 backdrop-blur-md flex items-center justify-center text-slate-200 hover:border-[#C9A84C] hover:text-[#E0C068] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => {
            const isFeatured = idx === currentIndex;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-3xl border p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between cursor-pointer relative overflow-hidden backdrop-blur-xl group ${
                  isFeatured
                    ? "border-[#C9A84C] bg-[#08080C]/90 shadow-[0_10px_40px_rgba(201,168,76,0.2)] -translate-y-1 scale-[1.02]"
                    : "border-white/10 bg-[#08080C]/60 hover:border-[#C9A84C]/50 hover:bg-[#08080C]/80 hover:-translate-y-0.5"
                }`}
              >
                {/* Background Quote Icon Overlay */}
                <Quote className="absolute -bottom-4 -right-4 w-28 h-28 text-white/[0.03] pointer-events-none group-hover:text-[#C9A84C]/5 transition-colors duration-500" />

                <div>
                  {/* Rating Stars in Vital Gold */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#E0C068]" aria-label="5 estrellas">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current drop-shadow-sm" />
                      ))}
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#E0C068] font-mono text-[10px] uppercase tracking-[0.15em] font-bold">
                      {t.insurance}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-200 text-sm leading-relaxed mb-6 font-sans italic font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white">
                      {t.author}
                    </h3>
                    <p className="font-mono text-xs text-[#E0C068] mt-0.5 font-semibold">
                      {t.role} &bull; {t.city}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-serif font-bold text-sm flex items-center justify-center shadow-md shadow-[#C9A84C]/20">
                    {t.author[0]}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i
                  ? "w-8 bg-gradient-to-r from-[#C9A84C] to-[#E0C068]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
