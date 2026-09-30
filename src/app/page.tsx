import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Cotizador from "@/components/Cotizador";
import CotizadorVida from "@/components/CotizadorVida";
import CotizadorSalud from "@/components/CotizadorSalud";
import AiConcierge from "@/components/AiConcierge";
import Intro from "@/components/Intro";
import Statement from "@/components/Statement";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Grain from "@/components/ui/Grain";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-[#C9A84C] selection:text-[#0A0A0F]">
      <Grain />
      <Navbar />
      <Hero />
      <BentoGrid />
      
      {/* SECCIÓN 1: Cotizador Especializado de Seguro de Vida & Ahorro */}
      <CotizadorVida />

      {/* Separador Sutil */}
      <div className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-10" />

      {/* SECCIÓN 2: Cotizador Especializado de Seguro de Salud Internacional */}
      <CotizadorSalud />

      <Intro />
      <Statement />
      <Testimonials />
      <Contact />
      <Footer />
      <AiConcierge />
    </main>
  );
}
