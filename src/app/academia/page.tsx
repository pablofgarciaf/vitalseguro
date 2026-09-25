"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Send,
  Laptop,
  Users,
  BriefcaseBusiness,
  Clock,
  Target,
  BadgeCheck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grain from "@/components/ui/Grain";
import { getCommissionRates, type CommissionRates, DEFAULT_COMMISSION_RATES } from "@/lib/commissionService";
import { saveLead } from "@/lib/crmService";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useAuth } from "@/context/AuthContext";

export default function AcademiaPage() {
  const { userProfile } = useAuth();
  const [rates, setRates] = useState<CommissionRates>(DEFAULT_COMMISSION_RATES);
  const [activeTab, setActiveTab] = useState<"todos" | "vida" | "salud" | "ventas">("todos");
  
  // Formulario de Inscripción
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [ciudad, setCiudad] = useState("Quito");
  const [programaInteres, setProgramaInteres] = useState("Certificación en Seguros de Vida & Blindaje Patrimonial");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRates() {
      const data = await getCommissionRates();
      setRates(data);
    }
    loadRates();
  }, []);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
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
      pass: cedula, // Clave inicial
      cedula: cedula,
      phone: telefono,
      ciudad: ciudad,
      role: "aspirante"
    });

    if (res.success) {
      setSubmitted(true);
      setNombre("");
      setEmail("");
      setTelefono("");
      setCedula("");
    } else {
      setErrorMsg(res.error || "Hubo un error al procesar tu inscripción.");
    }
    setLoading(false);
  };

  const PROGRAMAS = [
    {
      id: "prog-1",
      categoria: "vida",
      tag: "Alta Rentabilidad",
      titulo: "Certificación en Seguros de Vida & Blindaje Patrimonial",
      duracion: "8 Semanas (120 Horas)",
      modalidad: "Online en Vivo + Talleres Prácticos",
      destacado: true,
      descripcion: "Domina la venta consultiva del producto más rentable del mercado asegurador. Aprende a estructurar planes de ahorro, seguros de vida con componente de inversión y blindaje familiar con comisiones líderes en la industria.",
      modulos: [
        "Módulo 1: Psicología del Blindaje Familiar y Análisis de Necesidades Financieras",
        "Módulo 2: Matemática Actuarial Aplicada y Proyecciones de Ahorro para Retiro",
        "Módulo 3: Técnicas de Cierre Consultivo y Manejo de las 7 Objeciones Más Frecuentes",
        "Módulo 4: Fidelización, Renovaciones y Construcción de Cartera Vitalicia"
      ]
    },
    {
      id: "prog-2",
      categoria: "salud",
      tag: "Alta Demanda",
      titulo: "Especialización en Seguros Médicos & Cobertura Internacional",
      duracion: "6 Semanas (90 Horas)",
      modalidad: "Online Híbrido",
      destacado: false,
      descripcion: "Conviértete en experto en planes médicos VIP, cobertura hospitalaria, maternidad, enfermedades graves y asistencia médica internacional. Un ramo con renovaciones automáticas y clientes de por vida.",
      modulos: [
        "Módulo 1: Anatomía de una Póliza Médica: Deducibles, Copagos, Redes y Exclusiones",
        "Módulo 2: Planes Individuales vs Corporativos: Cotización y Comparativas entre Aseguradoras",
        "Módulo 3: Preexistencias, Períodos de Espera y Manejo de Reclamos Complejos",
        "Módulo 4: Cobertura Internacional, Evacuación Médica y Productos Multinacionales"
      ]
    },
    {
      id: "prog-3",
      categoria: "ventas",
      tag: "Máquina de Ventas",
      titulo: "Masterclass de Prospección Digital & Crecimiento para Asesores",
      duracion: "4 Semanas (60 Horas)",
      modalidad: "100% Práctico con Casos Reales",
      destacado: false,
      descripcion: "Domina estrategias de prospección en frío por LinkedIn, anuncios segmentados en Meta y WhatsApp conversacional para llenar tu agenda con mínimo 10 cotizaciones semanales sin perseguir clientes.",
      modulos: [
        "Módulo 1: Marca Personal de Autoridad en LinkedIn e Instagram para Asesores",
        "Módulo 2: Embudos de Captación con Lead Magnets y Cotizadores Interactivos",
        "Módulo 3: Protocolo de WhatsApp Business para Cerrar en los Primeros 3 Mensajes",
        "Módulo 4: Automatización de Seguimiento con CRM y Métricas de Conversión"
      ]
    }
  ];

  const filteredPrograms = activeTab === "todos" 
    ? PROGRAMAS 
    : PROGRAMAS.filter(p => p.categoria === activeTab);

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0F] text-zinc-900 dark:text-slate-100 selection:bg-[#C9A84C] selection:text-[#0A0A0F] transition-colors duration-500 font-sans">
      <Grain />
      <Navbar />

      {/* ===== HERO SECTION: EPIC BACKGROUND + GLASSMORPHISM ===== */}
      <section className="relative -mt-[74px] pt-[74px] overflow-hidden border-b border-black/5 dark:border-white/10">
        {/* EPIC Background Image - Fully visible */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/academia_asesores.jpg"
            alt="Profesionales estudiando en la Academia VitalSeguros con IA"
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

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6 px-6 py-16 lg:py-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 dark:bg-white/[0.06] backdrop-blur-xl border border-white/30 dark:border-white/10 text-[#C9A84C] dark:text-[#E0C068] text-xs font-semibold uppercase tracking-wider shadow-lg">
            <GraduationCap className="w-4 h-4" /> Academia VitalSeguros
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-zinc-950 dark:text-white tracking-tight leading-[1.1]">
            Forjamos a los <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E0C068] dark:from-[#E0C068] dark:via-[#C9A84C] dark:to-[#8C6D23]">Asesores de Seguros</span> más Exitosos
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-700 dark:text-slate-300 md:text-lg leading-relaxed font-sans">
            No vendemos cursos, creamos carreras. Aprende las estrategias exactas para facturar ingresos de alto nivel 
            vendiendo Vida, Salud y blindaje patrimonial en el mercado ecuatoriano.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {userProfile ? (
              <Link 
                href="/academia/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Ir a Mi Aula <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link 
                href="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Ingresar a la Academia <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <a 
              href="#programas"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/20 dark:bg-white/[0.06] backdrop-blur-xl border border-white/40 dark:border-white/10 text-zinc-900 dark:text-white font-bold text-sm hover:bg-white/30 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Ver Programas & Certificaciones</span>
            </a>
            
          </div>

          {/* Glassmorphism Stats Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-4xl mx-auto text-left">
            {[
              { value: "VIP", label: "Mejores Comisiones", color: "text-[#C9A84C] dark:text-[#E0C068]" },
              { value: "3 Ramos", label: "Vida · Salud · Vehículos", color: "text-blue-600 dark:text-blue-400" },
              { value: "100%", label: "Soporte y CRM en Vivo", color: "text-emerald-600 dark:text-emerald-400" },
              { value: "Práctica", label: "Casos Reales con Aseguradoras", color: "text-purple-600 dark:text-purple-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/50 dark:bg-white/[0.04] backdrop-blur-xl border border-white/50 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#C9A84C]/30 transition-all duration-500"
              >
                <div className={`text-2xl font-serif font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[11px] text-zinc-600 dark:text-slate-400 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué la Academia? - Glassmorphism Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">¿Por qué VitalSeguros?</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
            Lo que nos diferencia de cualquier otra capacitación
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Formación Práctica, No Teórica", desc: "Desde la semana 1 trabajas con cotizadores reales, aseguradoras reales y clientes reales. Nada de PDFs aburridos." },
            { icon: DollarSign, title: "Ingresos desde el Día Uno", desc: "No esperas a graduarte. Mientras aprendes, ya puedes colocar pólizas con tu código de asesor." },
            { icon: Users, title: "Mentoría con Directores Activos", desc: "Tus profesores no son teóricos: son asesores expertos que lideran el mercado." },
            { icon: Laptop, title: "100% Online y a Tu Ritmo", desc: "Clases en vivo grabadas, material descargable y comunidad WhatsApp exclusiva para resolver dudas 24/7." },
            { icon: BriefcaseBusiness, title: "CRM y Herramientas Incluidas", desc: "Acceso gratuito al CRM de VitalSeguros, cotizadores automáticos y sistema de seguimiento de prospectos." },
            { icon: BadgeCheck, title: "Certificación con Respaldo", desc: "Diploma avalado por VitalSeguros y las aseguradoras aliadas. Credencial verificable para tu perfil profesional." }
          ].map((item, i) => (
            <div key={i} className="group p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/50 dark:border-white/[0.08] hover:border-[#C9A84C]/30 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
              <item.icon className="w-8 h-8 text-[#C9A84C] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-serif font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programas Académicos */}
      <section id="programas" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-6">
          <div>
            <div className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">Formación Ejecutiva</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-950 dark:text-white mt-1">
              Planes de Estudio & Certificaciones
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/10">
            <button
              onClick={() => setActiveTab("todos")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "todos" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab("vida")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "vida" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Vida & Blindaje
            </button>
            <button
              onClick={() => setActiveTab("salud")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "salud" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Salud & Médico
            </button>
            <button
              onClick={() => setActiveTab("ventas")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "ventas" ? "bg-[#C9A84C] text-[#0A0A0F]" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Ventas & Outbound
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <SpotlightCard 
              key={prog.id}
              className={`flex flex-col justify-between overflow-hidden relative group bg-white dark:bg-transparent ${
                prog.destacado ? "border-[#C9A84C]/40 shadow-xl shadow-[#C9A84C]/5" : "border-black/5 dark:border-white/10"
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[#C9A84C] dark:text-[#E0C068] border border-black/5 dark:border-white/5">
                    {prog.tag}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-slate-400 flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5" /> {prog.modalidad}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white group-hover:text-[#C9A84C] dark:group-hover:text-[#E0C068] transition-colors">
                  {prog.titulo}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-slate-300 leading-relaxed">
                  {prog.descripcion}
                </p>

                <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {prog.duracion}</span>
                </div>

                <div className="pt-3 border-t border-black/5 dark:border-white/5 space-y-2">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-slate-400 uppercase tracking-wider">Plan de Aprendizaje:</div>
                  {prog.modulos.map((mod, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="#admision"
                  onClick={() => setProgramaInteres(prog.titulo)}
                  className="w-full py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#C9A84C] hover:text-[#0A0A0F] text-zinc-900 dark:text-white text-xs font-bold text-center transition-all border border-black/10 dark:border-white/10 hover:border-[#C9A84C] flex items-center justify-center gap-2"
                >
                  <span>Inscribirme en esta Certificación</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Testimonios de Asesores */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider">Resultados Reales</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
            Lo que dicen nuestros asesores certificados
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "En mi primer mes coloqué 4 pólizas de vida y generé excelentes ingresos. La mentoría directa con los directores hace toda la diferencia.", name: "Andrea M.", role: "Asesora de Vida · Quito" },
            { quote: "Venía del sector bancario sin saber nada de seguros. La academia me dio las herramientas, los contactos y la confianza para generar ingresos desde la semana 3.", name: "Carlos R.", role: "Asesor de Salud · Guayaquil" },
            { quote: "La Academia de seguros funciona. Hoy facturo mensualmente vendiendo seguros médicos y vehiculares gracias a la formación de VitalSeguros.", name: "Daniela P.", role: "Asesora Integral · Cuenca" }
          ].map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl border border-white/50 dark:border-white/[0.08] space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-[#C9A84C]/20 transition-all duration-500">
              <p className="text-sm text-zinc-600 dark:text-slate-300 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white">{t.name}</div>
                <div className="text-xs text-[#C9A84C]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formulario de Postulación & Admisión */}
      <section id="admision" className="py-20 px-6 max-w-3xl mx-auto">
        <div className="bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-3xl p-8 md:p-10 space-y-6 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-950 dark:text-white">
              Formulario de Inscripción a la Academia
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-slate-400">
              Cupos limitados por cohorte. Completa tus datos para coordinar una entrevista de admisión con la dirección académica.
            </p>
          </div>

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-sm text-center flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <span className="font-bold">¡Inscripción recibida!</span>
              </div>
              <p className="text-xs mt-1">Hemos creado tu cuenta. Tu solicitud está en revisión. Te notificaremos cuando sea aprobada para que ingreses con tu cédula.</p>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-300 text-sm text-center">
              {errorMsg}
            </div>
          )}

          {!submitted && (
            <form onSubmit={handleEnrollSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre y apellido"
                    className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1">Cédula (Tu clave futura)</label>
                  <input
                    type="text"
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="17xxxxxxxx"
                    className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1">WhatsApp / Teléfono</label>
                <input
                  type="text"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="+593 99 123 4567"
                  className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1">Ciudad de Residencia</label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1">Programa de Preferencia</label>
                <select
                  value={programaInteres}
                  onChange={(e) => setProgramaInteres(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-[#C9A84C]"
                >
                  <option value="Certificación en Seguros de Vida & Blindaje Patrimonial">Seguros de Vida & Blindaje Patrimonial</option>
                  <option value="Especialización en Seguros Médicos & Cobertura Internacional">Seguros Médicos & Cobertura Internacional</option>
                  <option value="Masterclass de Prospección Digital & Crecimiento">Ventas & Prospección Digital</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? "Procesando..." : "Enviar Solicitud"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
