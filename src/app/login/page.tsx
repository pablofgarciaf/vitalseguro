"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  KeyRound, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Compass, 
  User, 
  Phone, 
  MapPin, 
  GraduationCap,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Grain from "@/components/ui/Grain";

type AuthTab = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loginDemo, userProfile } = useAuth();

  const [tab, setTab] = useState<AuthTab>("login");

  // Estados de Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Estados de Registro
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCiudad, setRegCiudad] = useState("Quito");
  const [regRole, setRegRole] = useState<"asesor" | "estudiante">("asesor");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Por favor completa tu correo y contraseña.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await login(email, password);
      if (!res.success) {
        setErrorMsg(res.error || "Credenciales inválidas. Puedes usar los accesos rápidos demo.");
        setLoading(false);
        return;
      }

      setSuccessMsg("¡Acceso verificado con éxito! Redirigiendo...");
      setTimeout(() => {
        if (res.role === "super" || res.role === "admin" || res.role === "asesor") {
          router.push("/admin");
        } else {
          router.push("/academia");
        }
      }, 700);
    } catch {
      setErrorMsg("Error al iniciar sesión.");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      setRegError("Por favor completa los campos requeridos.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setRegLoading(true);
    setRegError("");
    setRegSuccess("");

    try {
      const res = await register({
        name: regName,
        email: regEmail,
        pass: regPassword,
        phone: regPhone,
        ciudad: regCiudad,
        role: regRole
      });

      if (!res.success) {
        setRegError(res.error || "Error al crear cuenta.");
        setRegLoading(false);
        return;
      }

      setRegSuccess("¡Cuenta creada exitosamente! Bienvenido a Vital Seguros.");
      setTimeout(() => {
        if (regRole === "asesor") {
          router.push("/admin");
        } else {
          router.push("/escuela-viajes");
        }
      }, 800);
    } catch {
      setRegError("Error inesperado en el registro.");
      setRegLoading(false);
    }
  };

  const handleQuickDemo = (role: "admin" | "asesor" | "estudiante") => {
    loginDemo(role);
    setSuccessMsg(`Sesión iniciada como ${role.toUpperCase()}`);
    setTimeout(() => {
      if (role === "admin" || role === "asesor") {
        router.push("/admin");
      } else {
        router.push("/escuela-viajes");
      }
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-[#C9A84C] selection:text-[#0A0A0F] flex flex-col justify-between">
      <Grain />

      {/* Header Minimal Luxury */}
      <header className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Portal</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono text-slate-400">Firebase Auth Conectado</span>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Card Principal */}
          <div className="rounded-3xl border border-white/10 bg-[#12121A]/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-[#C9A84C]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            {/* Brand Title */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#8C6D23] shadow-lg shadow-[#C9A84C]/25 text-[#0A0A0F] font-serif text-2xl font-bold mb-2">
                V
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                Vital <span className="bg-gradient-to-r from-[#E0C068] via-[#C9A84C] to-[#8C6D23] bg-clip-text text-transparent">Seguros</span>
              </h1>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">
                Portal de Asesores & Escuela de Viajes
              </p>
            </div>

            {/* Selector de Pestañas: Login vs Registro */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-white/5 border border-white/5 mb-6">
              <button
                type="button"
                onClick={() => { setTab("login"); setErrorMsg(""); setSuccessMsg(""); }}
                className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  tab === "login"
                    ? "bg-[#C9A84C] text-[#0A0A0F] shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => { setTab("register"); setRegError(""); setRegSuccess(""); }}
                className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  tab === "register"
                    ? "bg-[#C9A84C] text-[#0A0A0F] shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Registrar Nuevo Asesor
              </button>
            </div>

            {/* Formulario 1: Login */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@vitalseguros.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contraseña</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{loading ? "Verificando..." : "Acceder al Sistema"}</span>
                </button>

                {/* Accesos Rápidos Demo 1-Click */}
                <div className="pt-6 border-t border-white/10 space-y-2">
                  <span className="text-[11px] text-slate-400 uppercase tracking-widest block text-center font-mono">
                    ⚡ Accesos Rápidos con 1 Clic
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemo("admin")}
                      className="p-2 rounded-xl bg-white/5 hover:bg-[#C9A84C]/15 text-slate-300 hover:text-[#E0C068] border border-white/10 text-xs font-mono transition-all text-center"
                    >
                      👑 Director (Admin)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemo("asesor")}
                      className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/15 text-slate-300 hover:text-[#34D399] border border-white/10 text-xs font-mono transition-all text-center"
                    >
                      💼 Asesor (60%)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemo("estudiante")}
                      className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/15 text-slate-300 hover:text-blue-300 border border-white/10 text-xs font-mono transition-all text-center"
                    >
                      ✈️ Estudiante
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Formulario 2: Registro */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="space-y-4">
                {regError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}
                {regSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{regSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ej. Dr. Mauricio Villacís"
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Teléfono</label>
                    <input
                      type="text"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+593 99 123 4567"
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Perfil / Rol</label>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value as "asesor" | "estudiante")}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                    >
                      <option value="asesor">Asesor de Seguros (Comisión 60%)</option>
                      <option value="estudiante">Estudiante Escuela de Viajes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad</label>
                    <input
                      type="text"
                      value={regCiudad}
                      onChange={(e) => setRegCiudad(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contraseña</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all mt-2"
                >
                  {regLoading ? "Registrando..." : "Completar Registro Oficial"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="px-6 py-4 border-t border-white/5 text-center text-xs text-slate-500 font-mono">
        Vital Seguros & Escuela de Viajes &bull; Firebase Project: studio-9268277525-3e4c7
      </footer>
    </div>
  );
}
