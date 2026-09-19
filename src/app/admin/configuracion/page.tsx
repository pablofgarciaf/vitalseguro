"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sliders, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft, 
  DollarSign, 
  Compass, 
  HeartHandshake, 
  Car, 
  Building2,
  Lock,
  Database,
  User,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  getCommissionRates, 
  saveCommissionRates, 
  DEFAULT_COMMISSION_RATES, 
  type CommissionRates 
} from "@/lib/commissionService";

export default function AdminConfiguracionPage() {
  const { userProfile, logout } = useAuth();
  const [rates, setRates] = useState<CommissionRates>(DEFAULT_COMMISSION_RATES);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function loadRates() {
      const data = await getCommissionRates();
      setRates(data);
      setLoading(false);
    }
    loadRates();
  }, []);

  const handleRateChange = (field: keyof Omit<CommissionRates, "updatedAt" | "updatedBy">, value: number) => {
    const cleanVal = Math.min(100, Math.max(0, isNaN(value) ? 0 : value));
    setRates(prev => ({
      ...prev,
      [field]: cleanVal
    }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Guardando en Firebase Firestore y sincronizando CRM...");
    const res = await saveCommissionRates(rates);
    if (res.success) {
      setSaved(true);
      setStatusMessage("¡Tasas de comisión actualizadas con éxito en Firebase!");
      setTimeout(() => setSaved(false), 4000);
    }
  };

  const handleReset = () => {
    if (confirm("¿Deseas restaurar las comisiones oficiales (Vida al 60%)?")) {
      setRates(DEFAULT_COMMISSION_RATES);
      saveCommissionRates(DEFAULT_COMMISSION_RATES);
      setSaved(true);
      setStatusMessage("Se restauraron las tasas oficiales (Vida 60%).");
      setTimeout(() => setSaved(false), 3000);
    }
  };

  // Ejemplo de cálculo para el simulador de impacto
  const sampleLifePremium = 3000;
  const lifeCommissionDollar = Math.round(sampleLifePremium * (rates.vida / 100));

  const sampleTravelPremium = 1200;
  const travelCommissionDollar = Math.round(sampleTravelPremium * (rates.viaje / 100));

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-[#C9A84C] selection:text-[#0A0A0F]">
      {/* Header Superior Luxury */}
      <header className="border-b border-white/10 bg-[#12121A]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-95 flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al CRM</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#C9A84C]/20 text-[#E0C068] border border-[#C9A84C]/30 flex items-center gap-1">
                  <Sliders className="w-3 h-3" /> Panel Administrativo
                </span>
                <span className="text-xs font-mono text-slate-400">admin/configuracion</span>
              </div>
              <h1 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                Configuración de Tasas de Comisión
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all active:scale-95 flex items-center gap-1.5 border border-white/10"
              title="Restaurar valores predeterminados (Vida 60%)"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Valores Oficiales</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-semibold text-sm transition-all shadow-lg shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar en Firebase</span>
            </button>

            {userProfile ? (
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <div className="hidden lg:flex flex-col text-right text-xs">
                  <span className="font-semibold text-white truncate max-w-[110px]">{userProfile.name}</span>
                  <span className="text-[#C9A84C] font-mono text-[10px] uppercase">{userProfile.role}</span>
                </div>
                <button
                  onClick={logout}
                  title="Cerrar sesión"
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <User className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Acceder</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Banner de Estado / Notificación */}
      {saved && (
        <div className="bg-[#10B981]/20 border-b border-[#10B981]/30 px-6 py-2.5 text-center text-sm text-[#34D399] flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Tarjeta de Ramo Estrella: Seguro de Vida (60%) */}
        <section className="relative overflow-hidden rounded-2xl border-2 border-[#C9A84C]/40 bg-gradient-to-br from-[#C9A84C]/10 via-[#12121A] to-[#0A0A0F] p-6 md:p-8 shadow-2xl shadow-[#C9A84C]/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#E0C068] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> Ramo Estrella de Facturación
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                Comisión Oficial Seguro de Vida: <span className="text-[#E0C068]">{rates.vida}%</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                El Seguro de Vida con Ahorro y Blindaje Familiar es el motor principal de rentabilidad para la agencia y para los alumnos de la Academia de Seguros y Asesores. Una póliza promedio de <strong className="text-white">$3,000 USD/año</strong> genera <strong className="text-[#34D399]">${lifeCommissionDollar} USD</strong> de comisión directa en el primer año.
              </p>
            </div>

            <div className="flex flex-col items-center bg-[#0A0A0F]/80 p-5 rounded-2xl border border-[#C9A84C]/30 min-w-[240px]">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Tasa Ramo Vida</span>
              <div className="flex items-center gap-1 my-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={rates.vida}
                  onChange={(e) => handleRateChange("vida", parseFloat(e.target.value))}
                  className="w-24 text-center font-serif text-4xl font-extrabold text-[#E0C068] bg-white/5 border border-white/10 rounded-xl py-1 focus:border-[#C9A84C] focus:outline-none"
                />
                <span className="text-2xl font-bold text-[#E0C068]">%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rates.vida}
                onChange={(e) => handleRateChange("vida", parseFloat(e.target.value))}
                className="w-full accent-[#C9A84C] cursor-pointer mt-2"
              />
              <span className="text-[11px] text-slate-400 mt-2">Valor predeterminado: 60%</span>
            </div>
          </div>
        </section>

        {/* Matriz de Todos los Ramos */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-[#C9A84C]" /> Matriz de Comisiones por Ramo y Producto
              </h3>
              <p className="text-xs text-slate-400">
                Estas tasas modifican automáticamente el cálculo en el CRM, cotizadores y comisiones de asesores.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Persistencia activa: Firestore + LocalStorage</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Asistencia en Viajes (Vital Travel Safe) */}
            <div className="bg-[#12121A] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">Sinergia Corporativa</span>
                </div>
                <h4 className="font-semibold text-white text-base">Asistencia al Viajero</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Vital Travel Safe, cobertura médica internacional, Schengen y expediciones.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Comisión Asesor:</span>
                  <span className="text-lg font-bold text-blue-400">{rates.viaje}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rates.viaje}
                  onChange={(e) => handleRateChange("viaje", parseFloat(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 mt-1 text-right">
                  Ejemplo $1,200/año → <strong className="text-white">${travelCommissionDollar}</strong>
                </div>
              </div>
            </div>

            {/* Seguro de Salud VIP */}
            <div className="bg-[#12121A] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">BMI / Bupa</span>
                </div>
                <h4 className="font-semibold text-white text-base">Seguro de Salud VIP</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Medicina internacional y local, cobertura ambulatoria, hospitalaria y maternidad.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Comisión Asesor:</span>
                  <span className="text-lg font-bold text-emerald-400">{rates.salud}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rates.salud}
                  onChange={(e) => handleRateChange("salud", parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 mt-1 text-right">
                  Ejemplo $3,000/año → <strong className="text-white">${Math.round(3000 * (rates.salud / 100))}</strong>
                </div>
              </div>
            </div>

            {/* Seguro Vehicular */}
            <div className="bg-[#12121A] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Car className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">Autos & Suvs</span>
                </div>
                <h4 className="font-semibold text-white text-base">Seguro Vehicular</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Pérdida total, daños a terceros, auxilio mecánico y reposición de llave.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Comisión Asesor:</span>
                  <span className="text-lg font-bold text-amber-400">{rates.auto}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rates.auto}
                  onChange={(e) => handleRateChange("auto", parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 mt-1 text-right">
                  Ejemplo $900/año → <strong className="text-white">${Math.round(900 * (rates.auto / 100))}</strong>
                </div>
              </div>
            </div>

            {/* Corporativo & Pymes */}
            <div className="bg-[#12121A] border border-white/10 hover:border-white/20 transition-all rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono">B2B Flotas</span>
                </div>
                <h4 className="font-semibold text-white text-base">Corporativo & Pymes</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Planes colectivos de accidentes, responsabilidad civil y blindaje de socios.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Comisión Asesor:</span>
                  <span className="text-lg font-bold text-purple-400">{rates.corporativo}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rates.corporativo}
                  onChange={(e) => handleRateChange("corporativo", parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 mt-1 text-right">
                  Ejemplo $5,000/año → <strong className="text-white">${Math.round(5000 * (rates.corporativo / 100))}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panel de Auditoría & Resumen Técnico */}
        <section className="bg-[#12121A]/60 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#C9A84C]" /> Estado de Conexión & Firebase Config
            </h4>
            <p className="text-xs text-slate-400">
              Proyecto Firebase: <code className="text-[#E0C068]">studio-9268277525-3e4c7</code> | Documento: <code className="text-[#E0C068]">configuracion/comisiones</code>
            </p>
            <p className="text-[11px] text-slate-500">
              Última actualización: {new Date(rates.updatedAt).toLocaleString("es-EC")} por {rates.updatedBy}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-lg shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Todos los Cambios</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
