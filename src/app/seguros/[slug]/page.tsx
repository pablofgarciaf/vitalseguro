import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, HeartPulse, CheckCircle2, ArrowRight, PhoneCall, Calendar, Building2, Award, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `${name} | Beneficios y Coberturas Vital Seguros • BMI`,
    description: `Conoce a detalle la cobertura, deducibles, red hospitalaria y beneficios del plan ${name} de BMI Companies y Vital Seguros.`,
  };
}

export default async function PlanDetallePage({ params }: Props) {
  const { slug } = await params;
  const isHealth = [
    "meridian-ii",
    "azure",
    "ideal",
    "support",
    "sigma",
    "gastos-medicos-mayores",
    "innova"
  ].some(h => slug.toLowerCase().includes(h));

  const planTitles: Record<string, string> = {
    "best-indexed-100-sp500": "Best Indexed 100 BMII S&P 500",
    "best-indexed-sp500": "Best Indexed BMII S&P 500",
    "best-indexed-100-nasdaq": "Best Indexed 100 BMII NASDAQ",
    "best-indexed-nasdaq": "Best Indexed BMII NASDAQ",
    "lifetime": "LifeTime - Seguro de Vida Entera Garantizado",
    "nova-ii": "Nova II - Plan de Jubilación y Ahorro",
    "term-nrnc": "Term NRNC - Seguro a Término Puro",
    "meridian-ii": "Meridian II - Cobertura Médica Internacional ($7,000,000 USD)",
    "azure": "Azure - Seguro de Salud Internacional ($5,000,000 USD)",
    "ideal": "Ideal - Cobertura Médica Familiar y Corporativa ($2,000,000 USD)",
    "support": "Support - Cobertura Médica Internacional ($500,000 USD)",
    "sigma": "Sigma - Plan Médico Familiar con Copago Compartido",
    "gastos-medicos-mayores": "Gastos Médicos Mayores - Protección Clínica Completa",
    "innova": "Innova - Salud Global Digital con Telemedicina"
  };

  const currentTitle = planTitles[slug] || slug.replace(/-/g, " ").toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08080C] text-zinc-900 dark:text-white pt-24 pb-20">
      <Navbar />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-zinc-600 dark:text-zinc-300">Planes BMI</span>
          <span>/</span>
          <span className="text-[#C9A84C] font-bold">{currentTitle}</span>
        </div>

        {/* Hero Section of the Plan - Always Dark Luxury Mode */}
        <div className="rounded-[32px] border border-[#C9A84C]/30 bg-[#08080C] text-white backdrop-blur-xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-xs font-mono text-[#E0C068] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>{isHealth ? "Ramo Salud Internacional" : "Ramo Vida & Inversión Indexada"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
              <Award className="w-4 h-4 text-[#C9A84C]" />
              <span>Calificación A.M. Best • BMI Companies</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            {currentTitle}
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            {isHealth
              ? "Plan médico internacional con beneficios, red, deducibles y condiciones que varían según el producto y la propuesta emitida por la aseguradora."
              : "Alternativa de seguro de vida cuya cobertura, acumulación y condiciones dependen del producto seleccionado y de la propuesta emitida por la aseguradora."}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/593995451814?text=Hola%20VitalSeguros,%20deseo%20asesoria%20personalizada%20sobre%20el%20plan%20"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Hablar con un Asesor Senior</span>
            </a>
            <Link
              href={isHealth ? "/#cotizador-salud" : "/#cotizador-vida"}
              className="px-6 py-3.5 rounded-xl border border-[#C9A84C]/30 bg-[#0D0D13] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#15151F] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Cotizar este plan ahora</span>
              <ArrowRight className="w-4 h-4 text-[#C9A84C]" />
            </Link>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-3xl border border-zinc-200 dark:border-[#C9A84C]/25 bg-white dark:bg-[#0D0D13] p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
                Ventajas Competitivas Clave
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              {isHealth ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Libre elección médica:</strong> Consulta al especialista de tu confianza en cualquier parte del planeta sin intermediarios.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Deducibles por plan:</strong> su aplicación y posibles reducciones dependen del prestador, territorio y condicionado emitido.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Tratamientos complejos:</strong> beneficios, límites y autorizaciones se confirman en el plan contratado.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Evacuación médica:</strong> disponible en productos y anexos que incluyan expresamente este beneficio.</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Piso Garantizado del 1.0%:</strong> Si el mercado o Wall Street cae, tu capital no pierde valor jamás.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Rendimiento Histórico Ponderado:</strong> Rentabilidad estimada de 6.5% a 8.5% anual en dólares líquidos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Retiros y Préstamos Libres de Impuestos:</strong> Acceso a liquidez sin descapitalizar la protección de tu familia.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C9A84C] font-bold">✓</span>
                    <span><strong>Bono de Fidelidad a los 20 Años:</strong> Tasa de interés adicional del +1.50% permanente sobre tu saldo acumulado.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-[#C9A84C]/25 bg-white dark:bg-[#0D0D13] p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
                {isHealth ? "Red Hospitalaria Destacada" : "Respaldo y Solvencia BMI"}
              </h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isHealth
                ? "La red de prestadores, el mecanismo de pago y las autorizaciones se confirman para cada plan, territorio y atención antes de coordinar el servicio."
                : "Suscrito por Best Meridian International Insurance Company I.I., parte del Grupo Financiero BMI con más de 50 años de trayectoria ininterrumpida y presencia en más de 12 países de América y Europa."}
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/593995451814?text=Deseo%20agendar%20una%20reunion%20de%2015%20minutos%20para%20conocer%20mas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A84C] hover:underline"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar reunión de 15 min con un especialista ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-[#0D0D13] p-8 sm:p-12 text-center text-white border border-[#C9A84C]/30 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />
          <h2 className="font-serif text-2xl sm:text-3xl font-light mb-3">
            ¿Listo para calcular tu cotización personalizada?
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-6">
            Utiliza nuestro simulador inteligente para configurar tu edad, deducible y ver el estimado actuarial exacto.
          </p>
          <Link
            href={isHealth ? "/#cotizador-salud" : "/#cotizador-vida"}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#C9A84C] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl"
          >
            <span>Ir al Simulador {isHealth ? "de Salud" : "de Vida"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
