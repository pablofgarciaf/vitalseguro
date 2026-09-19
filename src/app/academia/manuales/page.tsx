"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, FileText, Download, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grain from "@/components/ui/Grain";

const MANUALS = [
  { id: "m1", title: "Manual de Venta Consultiva", category: "Ventas", date: "Sep 2024", size: "2.4 MB" },
  { id: "m2", title: "Condiciones Generales - Vida", category: "Vida", date: "Ago 2024", size: "1.8 MB" },
  { id: "m3", title: "Guía de Reclamos y Siniestros", category: "General", date: "Oct 2024", size: "3.1 MB" },
  { id: "m4", title: "Condiciones Generales - Salud", category: "Salud", date: "Sep 2024", size: "2.2 MB" },
  { id: "m5", title: "Guía de Suscripción Médica", category: "Salud", date: "Jul 2024", size: "1.5 MB" },
  { id: "m6", title: "Calculadora Actuarial Rápida (PDF)", category: "Vida", date: "Nov 2024", size: "0.9 MB" },
];

export default function ManualesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", "Vida", "Salud", "Ventas", "General"];

  const filtered = MANUALS.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filter === "Todos" || m.category === filter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100">
      <Grain />
      <Navbar />

      <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto space-y-8 relative z-10">
        <Link href="/academia/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#C9A84C] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
        </Link>

        <header className="space-y-4">
          <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-400" />
            Repositorio de Manuales
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Documentación oficial, condiciones generales y guías operativas de VitalSeguros. 
            El material se mantiene actualizado; asegúrate de descargar la última versión.
          </p>
        </header>

        {/* Buscador y Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-[#12121A] border border-white/10 rounded-xl">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar documento..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0A0F] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filter === cat 
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                    : "bg-white/5 text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Manuales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 text-sm border border-dashed border-white/10 rounded-xl">
              No se encontraron documentos con esos criterios.
            </div>
          ) : (
            filtered.map(manual => (
              <div key={manual.id} className="p-5 bg-[#12121A] border border-white/10 hover:border-blue-400/30 rounded-xl transition-colors space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded text-slate-300">
                      {manual.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{manual.date}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-snug">{manual.title}</h3>
                  <p className="text-xs text-slate-500 mt-2">Tamaño: {manual.size}</p>
                </div>
                
                <div className="flex gap-2 pt-3 border-t border-white/5">
                  <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Ver
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-xs font-bold text-blue-400 flex items-center justify-center gap-2 transition-colors border border-blue-500/20">
                    <Download className="w-3.5 h-3.5" /> Descargar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
}
