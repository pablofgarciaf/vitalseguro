import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Cotizador from "@/components/Cotizador";
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
      <Cotizador />
      <Intro />
      <Statement />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
