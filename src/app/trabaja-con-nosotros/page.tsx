"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  Send, 
  Users, 
  ShieldCheck, 
  Compass, 
  ArrowRight,
  Clock,
  Laptop,
  Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grain from "@/components/ui/Grain";
import { saveLead } from "@/lib/crmService";
import { getCommissionRates, type CommissionRates, DEFAULT_COMMISSION_RATES } from "@/lib/commissionService";

export default function TrabajaConNosotrosPage() {
  const [rates, setRates] = useState<CommissionRates>(DEFAULT_COMMISSION_RATES);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("Quito");
  const [experiencia, setExperiencia] = useState("Sin experiencia (Deseo capacitarme)");
  const [metaIngreso, setMetaIngreso] = useState("$2,000 - $4,000 USD/mes");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getCommissionRates();
      setRates(data);
    }
    load();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waText = `¡Hola VitalSeguros! Me postulé en la página *Trabaja con Nosotros*:

👤 *Nombre:* ${nombre}
📱 *WhatsApp:* ${telefono}
✉️ *Email:* ${email}
📍 *Ciudad:* ${ciudad}
💼 *Experiencia:* ${experiencia}
🎯 *Meta de Ingresos:* ${metaIngreso}

Deseo unirme a la Escuela de Viajes y comenzar como Asesor con la comisión del ${rates.vida}% en seguros de vida. ¿Cuándo podemos coordinar la entrevista?`;

    // 1. Abrir WhatsApp de inmediato para cero fricción
    const waUrl = `https://wa.me/593995451814?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setEnviado(true);

    // 2. Guardar en el CRM de Firebase en segundo plano
    saveLead({
      nombre,
      email,
      telefono,
      ciudad,
      ramo: "vida",
      planDetalle: `Postulación Asesor: Meta ${metaIngreso} - Exp: ${experiencia}`,
      cobertura: "Aspirante a Asesor Oficial",
      primaAnual: 3000,
      estado: "nuevo",
      asesor: "Gabriel Jácome",
      notas: `Lead de Reclutamiento Asesores. Experiencia: ${experiencia}. Meta deseada: ${metaIngreso}.`,
      origen: "campana_ads"
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-slate-100 selection:bg-[#C9A84C] selection:text-[#0A0A0F]">
      <Grain />
      <Navbar />

      {/* Hero Section Especial para Campañas de Pauta (Meta / Google / TikTok Ads) */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#C9A84C]/20 via-[#10B981]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#34D399] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" /> Convocatoria Abierta • Asesores de Seguros & Viajes
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.1]">
            Gana hasta el <span className="bg-gradient-to-r from-[#E0C068] via-[#C9A84C] to-[#8C6D23] bg-clip-text text-transparent">{rates.vida}% de Comisión</span> <br className="hidden sm:inline" />
            como Asesor de Vital Seguros
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Te entregamos la <strong className="text-white">Escuela de Viajes gratuita</strong>, prospectos calificados desde nuestras campañas publicitarias y la plataforma tecnológica CRM para que generes entre <strong className="text-[#34D399]">$2,000 y $8,000+ USD mensuales</strong> con horarios flexibles.
          </p>

          <div className="pt-2">
            <a
              href="#formulario"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Postularme Ahora (Entrevista en 24h)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* 4 Métricas de Impacto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 text-left">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-serif font-bold text-[#E0C068]">{rates.vida}%</div>
              <div className="text-xs text-slate-400 mt-1">Comisión en Seguro de Vida</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-serif font-bold text-blue-400">{rates.viaje}%</div>
              <div className="text-xs text-slate-400 mt-1">Comisión en Asistencia en Viajes</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-serif font-bold text-[#34D399]">100%</div>
              <div className="text-xs text-slate-400 mt-1">Capacitación Gratuita</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <div className="text-3xl font-serif font-bold text-purple-400">Leads</div>
              <div className="text-xs text-slate-400 mt-1">Prospectos Listos para Cotizar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Los 4 Pilares de la Oportunidad */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A84C]">¿Por qué unirte a Vital Seguros?</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Un Modelo Diseñado para que Ganes desde el Primer Mes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#12121A] border border-white/10 hover:border-[#C9A84C]/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Comisión Récord del {rates.vida}%</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mientras otras agencias pagan 15% o 20%, en Vital Seguros recibes el {rates.vida}% directo en pólizas de vida.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12121A] border border-white/10 hover:border-blue-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Escuela de Viajes Gratis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aprende turismo de lujo (estilo Vermilion), normas Schengen y venta de seguros internacionales con certificación oficial.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12121A] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Clientes Pre-Calificados</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No tienes que rogarle a familiares. Te derivamos personas que cotizaron en nuestra web y buscan contratar hoy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12121A] border border-white/10 hover:border-purple-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Plataforma CRM Propia</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Controla tus prospectos, estado de pólizas y cobro de comisiones directamente desde el panel administrativo.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario de Postulación de Alta Conversión */}
      <section id="formulario" className="py-20 px-6 max-w-2xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-[#12121A] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C9A84C]/15 text-[#C9A84C] mb-2">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Postúlate como Asesor de Vital Seguros
            </h2>
            <p className="text-xs text-slate-400">
              Completa el formulario en 1 minuto. Te contactaremos hoy mismo para coordinar tu entrevista y bienvenida.
            </p>
          </div>

          {enviado && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>¡Postulación enviada! Se abrió WhatsApp para tu confirmación y tus datos ya están en el CRM.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nombre y Apellido</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Ing. Carlos Alarcón"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp / Celular</label>
                <input
                  type="text"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+593 99 123 4567"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ciudad</label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Meta Mensual de Ingresos</label>
                <select
                  value={metaIngreso}
                  onChange={(e) => setMetaIngreso(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                >
                  <option value="$1,500 - $3,000 USD/mes">$1,500 - $3,000 USD/mes</option>
                  <option value="$3,000 - $6,000 USD/mes">$3,000 - $6,000 USD/mes</option>
                  <option value="Más de $6,000 USD/mes">Más de $6,000 USD/mes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">¿Tienes experiencia previa?</label>
              <select
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
              >
                <option value="Sin experiencia (Deseo capacitarme en la Escuela)">Sin experiencia (Deseo capacitarme en la Escuela)</option>
                <option value="Tengo experiencia en ventas comerciales">Tengo experiencia en ventas comerciales</option>
                <option value="Tengo experiencia en seguros o agencias de viajes">Tengo experiencia en seguros o agencias de viajes</option>
                <option value="Soy asesor activo de otra aseguradora">Soy asesor activo de otra aseguradora</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Registrando..." : "Enviar Postulación a Gabriel Jácome"}</span>
            </button>

            <p className="text-[11px] text-slate-500 text-center font-mono pt-2">
              🔒 Tus datos son confidenciales y se procesan de forma inmediata por el equipo de selección.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
