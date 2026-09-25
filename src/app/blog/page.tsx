"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grain from "@/components/ui/Grain";
import { ArrowRight } from "lucide-react";

export default function BlogIndex() {
  const POSTS = [
    {
      id: "origen-de-los-seguros",
      tag: "Historia & Fundamentos",
      title: "El Origen de los Seguros",
      excerpt: "Descubre cómo comenzaron los seguros hace más de 4,000 años en Babilonia, pasando por Grecia, Roma y el Gran Incendio de Londres.",
      date: "Octubre 2026",
    },
    {
      id: "blindaje-patrimonial-ceo",
      tag: "Protección Familiar",
      title: "Blindaje Patrimonial para Altos Ejecutivos",
      excerpt: "Estrategias de liquidez inmediata y sucesión estructurada para proteger el capital familiar ante contingencias inesperadas.",
      date: "Noviembre 2026",
    },
    {
      id: "seguros-salud-internacional",
      tag: "Salud Médica",
      title: "La Importancia de la Cobertura Internacional",
      excerpt: "Por qué una póliza local no es suficiente cuando se trata de tratamientos especializados y acceso a las mejores clínicas del mundo.",
      date: "Diciembre 2026",
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0F] text-zinc-900 dark:text-slate-100 selection:bg-[#C9A84C] selection:text-[#0A0A0F] transition-colors duration-500 font-sans">
      <Grain />
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={stagger}
          className="space-y-16"
        >
          {/* Header Section */}
          <motion.header variants={fadeUp} className="max-w-2xl space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold">
              Perspectivas & Análisis
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
              Visión <span className="font-light italic text-[#C9A84C]">Estratégica</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-[#A9A9A9] max-w-xl leading-relaxed font-sans pt-2">
              Explora artículos especializados sobre coberturas médicas de clase mundial, protección familiar, gestión de siniestros y preservación del patrimonio.
            </p>
          </motion.header>

          {/* Posts List */}
          <motion.div variants={stagger} className="grid grid-cols-1 gap-6 md:gap-8">
            {POSTS.map((post) => (
              <motion.article 
                key={post.id} 
                variants={fadeUp}
                className="group block"
              >
                <Link href={`/blog/${post.id}`} className="block no-underline">
                  <div className="p-6 md:p-8 rounded-[24px] bg-white dark:bg-[#12121A]/80 border border-black/5 dark:border-white/5 hover:border-[#C9A84C]/30 hover:shadow-2xl dark:hover:shadow-[#C9A84C]/5 transition-all duration-500 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="space-y-4 md:max-w-2xl">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-slate-400">
                            {post.tag}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#C9A84C]"></span>
                          <span className="font-mono text-[10px] text-zinc-400 dark:text-slate-500">
                            {post.date}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-white group-hover:text-[#C9A84C] transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-[#A9A9A9] leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="hidden md:flex shrink-0 items-center justify-center w-12 h-12 rounded-full border border-black/10 dark:border-white/10 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-black text-zinc-400 dark:text-slate-500 transition-all duration-500 mt-2">
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
