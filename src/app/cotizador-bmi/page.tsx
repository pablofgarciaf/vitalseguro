import CotizadorVida from "@/components/CotizadorVida";
import CotizadorSalud from "@/components/CotizadorSalud";
import AiConcierge from "@/components/AiConcierge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VitalSeguros | Cotizadores Oficiales BMI Vida y Salud",
  description: "Emulador y cotizador oficial de pólizas de vida indexada y salud internacional de BMI Companies y Vital Seguros. Coberturas desde $100,000 USD.",
};

export default function CotizadorBMIPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08080C] text-zinc-900 dark:text-white pt-24 pb-16">
      <Navbar />
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Navigation Quick Pills between both sections */}
        <div className="flex justify-center gap-3 mb-8">
          <a
            href="#cotizador-vida"
            className="px-5 py-2.5 rounded-full bg-[#C9A84C] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            Ir a Cotizador de Vida
          </a>
          <a
            href="#cotizador-salud"
            className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
          >
            Ir a Cotizador de Salud
          </a>
        </div>

        {/* Sección 1: Cotizador Vida */}
        <CotizadorVida />

        <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent my-16" />

        {/* Sección 2: Cotizador Salud */}
        <CotizadorSalud />

      </div>
      <Footer />
      <AiConcierge />
    </main>
  );
}
