"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { useAuth } from "@/context/AuthContext";

export default function TrabajaConNosotrosPage() {
  const { register } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("Quito");
  const [experiencia, setExperiencia] = useState("Sin experiencia (Deseo capacitarme)");
  const [metaIngreso, setMetaIngreso] = useState("$2,000 - $4,000 USD/mes");
  const [enviado, setEnviado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (cedula.length < 10) {
      setErrorMsg("La cédula debe tener al menos 10 dígitos.");
      setLoading(false);
      return;
    }

    const res = await register({
      name: nombre,
      email: email,
      pass: cedula, // La cédula es la contraseña inicial
      cedula: cedula,
      phone: telefono,
      ciudad: ciudad,
      role: "aspirante"
    });

    if (res.success) {
      setEnviado(true);
      setNombre("");
      setCedula("");
      setTelefono("");
      setEmail("");
    } else {
      setErrorMsg(res.error || "Ocurrió un error al enviar tu solicitud.");
    }
    setLoading(false);
  };

  // Previene el error de hidratación en Server Components (Next.js 14+)
  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0F] text-zinc-900 dark:text-slate-100 selection:bg-[#C9A84C] selection:text-[#0A0A0F] transition-colors duration-500">
      <Grain />
      <Navbar />

      {/* ===== HERO SECTION: EPIC BACKGROUND + GLASSMORPHISM ===== */}
      <section className="relative -mt-[74px] pt-[74px] overflow-hidden">
        {/* EPIC Background Image - Fully visible */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/equipo_asesores.jpg"
            alt="Asesores de VitalSeguros colaborando"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-[#0A0A0F]/10 dark:bg-[#0A0A0F]/30" />
          <div className="absolute inset-0 bg-[#F5F5F7]/30 dark:bg-transparent transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] dark:from-[#0A0A0F] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F7]/40 dark:from-[#0A0A0F]/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 py-16 lg:py-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 dark:bg-white/[0.06] backdrop-blur-xl border border-white/30 dark:border-white/10 text-emerald-600 dark:text-[#34D399] text-xs font-semibold uppercase tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5" /> Convocatoria Abierta • Asesores de Seguros
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-zinc-950 dark:text-white tracking-tight leading-[1.1]">
            Construye una <span className="bg-gradient-to-r from-[#C9A84C] to-[#E0C068] dark:from-[#E0C068] dark:via-[#C9A84C] dark:to-[#8C6D23] bg-clip-text text-transparent">Carrera Sólida y Rentable</span> <br className="hidden sm:inline" />
            como Asesor de VitalSeguros
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Te entregamos la <strong className="text-zinc-900 dark:text-white">Academia de Seguros gratuita</strong>, prospectos calificados desde nuestras campañas publicitarias y la plataforma tecnológica CRM para que generes <strong className="text-emerald-700 dark:text-[#34D399]">ingresos de alto nivel</strong> con horarios flexibles.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#formulario"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto"
            >
              <span>Postularme Ahora (Entrevista en 24h)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/20 dark:bg-white/[0.06] backdrop-blur-xl border border-white/40 dark:border-white/10 text-zinc-900 dark:text-white font-bold text-sm hover:bg-white/30 dark:hover:bg-white/10 active:scale-95 transition-all w-full sm:w-auto shadow-lg"
            >
              <Users className="w-4 h-4" />
              <span>Acceso para Asesores</span>
            </Link>
          </div>

          {/* ===== 4 STATS GLASSMORPHISM CARDS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8">
            {[
              { value: "Top", label: "Esquema de Compensación", color: "text-[#C9A84C] dark:text-[#E0C068]" },
              { value: "CRM", label: "Plataforma Tecnológica", color: "text-blue-600 dark:text-blue-400" },
              { value: "100%", label: "Capacitación Gratuita", color: "text-emerald-600 dark:text-[#34D399]" },
              { value: "Leads", label: "Prospectos Listos para Cotizar", color: "text-purple-600 dark:text-purple-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/50 dark:bg-white/[0.04] backdrop-blur-xl border border-white/50 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#C9A84C]/30 transition-all duration-500"
              >
                <div className={`text-2xl sm:text-3xl font-serif font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[11px] text-zinc-600 dark:text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOS 4 PILARES: GLASSMORPHISM CARDS ===== */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C9A84C]">¿Por qué unirte a Vital Seguros?</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
            Un Modelo Diseñado para que Ganes desde el Primer Mes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/50 dark:border-white/10 hover:border-[#C9A84C]/40 transition-all duration-500 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Las Mejores Comisiones</h3>
            <p className="text-xs text-zinc-600 dark:text-slate-400 leading-relaxed">
              En Vital Seguros recibes el nivel de comisión más alto del mercado de pólizas de vida, directo y sin intermediarios de menor nivel.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/50 dark:border-white/10 hover:border-blue-500/40 transition-all duration-500 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Academia de Seguros</h3>
            <p className="text-xs text-zinc-600 dark:text-slate-400 leading-relaxed">
              Aprende venta de seguros internacionales, protección patrimonial y estrategias de ahorro con certificación oficial.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/50 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-500 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Clientes Pre-Calificados</h3>
            <p className="text-xs text-zinc-600 dark:text-slate-400 leading-relaxed">
              No tienes que rogarle a familiares. Te derivamos personas que cotizaron en nuestra web y buscan contratar hoy.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/50 dark:border-white/10 hover:border-purple-500/40 transition-all duration-500 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">Plataforma CRM Propia</h3>
            <p className="text-xs text-zinc-600 dark:text-slate-400 leading-relaxed">
              Controla tus prospectos, estado de pólizas y cobro de comisiones directamente desde el panel administrativo.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FORMULARIO: GLASSMORPHISM ===== */}
      <section id="formulario" className="py-12 px-6 max-w-xl mx-auto">
        <div className="rounded-3xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 mb-8 relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C9A84C]/15 text-[#C9A84C] mb-2">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white">
              Postúlate como Asesor de Vital Seguros
            </h2>
            <p className="text-xs text-zinc-600 dark:text-slate-400">
              Completa el formulario en 1 minuto. Te contactaremos hoy mismo para coordinar tu entrevista y bienvenida.
            </p>
          </div>

          {enviado && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs text-center flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span className="font-bold text-sm">¡Postulación enviada correctamente!</span>
              </div>
              <p className="mt-1">
                Hemos creado tu cuenta. Tu solicitud está en revisión por la administración. Una vez aprobada, podrás ingresar con tu cédula.
              </p>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-300 text-xs text-center">
              {errorMsg}
            </div>
          )}

          {!enviado && (
            <form onSubmit={handleSubmit} className="space-y-3 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">Nombre y Apellido</label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Ing. Carlos Alarcón"
                    className="w-full px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">Cédula (Tu futura clave)</label>
                  <input
                    type="text"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="17xxxxxxxx"
                    className="w-full px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">WhatsApp / Celular</label>
                  <input
                    type="text"
                    required
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+593 99 123 4567"
                    className="w-full px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                  />
                </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">Ciudad</label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">Meta Mensual de Ingresos</label>
                <select
                  value={metaIngreso}
                  onChange={(e) => setMetaIngreso(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
                >
                  <option value="$1,500 - $3,000 USD/mes">$1,500 - $3,000 USD/mes</option>
                  <option value="$3,000 - $6,000 USD/mes">$3,000 - $6,000 USD/mes</option>
                  <option value="Más de $6,000 USD/mes">Más de $6,000 USD/mes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">¿Tienes experiencia previa?</label>
              <select
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all"
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
                className="w-full mt-4 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-[#0A0A0F] font-bold text-sm uppercase tracking-widest hover:bg-[#C9A84C] dark:hover:bg-[#C9A84C] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? "Procesando..." : "Enviar Postulación Oficial"}
                {!loading && <Send className="w-4 h-4" />}
              </button>
            </form>
          )}

          <p className="text-[11px] text-zinc-500 dark:text-slate-500 text-center font-mono pt-2">
              🔒 Tus datos son confidenciales y se procesan de forma inmediata por el equipo de selección.
            </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
