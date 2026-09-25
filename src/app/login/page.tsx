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
import { Building } from "lucide-react";
import Grain from "@/components/ui/Grain";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type AuthTab = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loginDemo, userProfile } = useAuth();

  const [tab, setTab] = useState<AuthTab>("login");

  // Estados de Login
  const [email, setEmail] = useState("admin@vitalseguros.com");
  const [password, setPassword] = useState("admin2026");
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

      if (res.forcePasswordChange) {
        router.push("/cambiar-clave");
        return;
      }

      if (res.role === "admin" || res.role === "super") {
        router.push("/admin");
      } else if (res.role === "estudiante" || res.role === "asesor") {
        router.push("/academia/dashboard");
      } else {
        router.push("/admin"); // fallback
      }
    } catch {
      setErrorMsg("Error al iniciar sesión.");
      setLoading(false);
    }
  };



  const handleQuickDemo = (role: "admin" | "asesor" | "estudiante") => {
    loginDemo(role);
    setSuccessMsg(`Sesión iniciada como ${role.toUpperCase()}`);
    setTimeout(() => {
      if (role === "admin" || role === "asesor") {
        router.push("/admin");
      } else {
        router.push("/academia/dashboard");
      }
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0F] text-zinc-900 dark:text-slate-100 font-sans selection:bg-[#C9A84C] selection:text-[#0A0A0F] flex flex-col justify-between transition-colors duration-500">
      <Grain />

      {/* Header Minimal Luxury */}
      <header className="px-6 py-5 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
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
          <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#12121A]/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-black/5 dark:shadow-[#C9A84C]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            {/* Brand Title */}
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#8C6D23] shadow-lg shadow-[#C9A84C]/25 text-[#0A0A0F] font-serif text-2xl font-bold mb-2">
                V
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 dark:text-white tracking-wide">
                Vital <span className="bg-gradient-to-r from-[#C9A84C] to-[#E0C068] dark:from-[#E0C068] dark:via-[#C9A84C] dark:to-[#8C6D23] bg-clip-text text-transparent">Seguros</span>
              </h1>
              <p className="text-xs text-zinc-500 dark:text-slate-400 font-mono uppercase tracking-widest">
                Portal de Asesores & Academia
              </p>
            </div>

            {/* Selector de Pestañas: Login vs Registro (Oculto, solo Login) */}
            <div className="grid grid-cols-1 gap-1 p-1 rounded-2xl bg-white/5 border border-white/5 mb-6">
              <button
                type="button"
                onClick={() => { setTab("login"); setErrorMsg(""); setSuccessMsg(""); }}
                className={`py-2.5 rounded-xl text-xs font-semibold transition-all bg-[#C9A84C] text-[#0A0A0F] shadow-md font-bold`}
              >
                Iniciar Sesión
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
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">Cédula o Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-400 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ej. 1712345678 o correo"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5">Contraseña (Cédula la primera vez)</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-zinc-400 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-zinc-400 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
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
                <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-2">
                  <span className="text-[11px] text-zinc-500 dark:text-slate-400 uppercase tracking-widest block text-center font-mono">
                    ⚡ Accesos Rápidos con 1 Clic
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemo("admin")}
                      className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#C9A84C]/15 text-zinc-700 dark:text-slate-300 hover:text-[#C9A84C] dark:hover:text-[#E0C068] border border-black/10 dark:border-white/10 text-xs font-mono transition-all text-center"
                    >
                      👑 Director (Admin)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemo("asesor")}
                      className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-emerald-500/15 text-zinc-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-[#34D399] border border-black/10 dark:border-white/10 text-xs font-mono transition-all text-center"
                    >
                      💼 Asesor Especializado
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemo("estudiante")}
                      className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-blue-500/15 text-zinc-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 border border-black/10 dark:border-white/10 text-xs font-mono transition-all text-center"
                    >
                      ✈️ Estudiante
                    </button>
                  </div>
                </div>
              </form>
            )}


          </div>
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="px-6 py-4 border-t border-white/5 text-center text-xs text-slate-500 font-mono">
        Vital Seguros & Academia &bull; Firebase Project: studio-9268277525-3e4c7
      </footer>
    </div>
  );
}
