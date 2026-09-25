"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import Grain from "@/components/ui/Grain";
import MinimalNavbar from "@/components/MinimalNavbar";

export default function CambiarClavePage() {
  const router = useRouter();
  const { userProfile, currentUser, logout } = useAuth();
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Si no está logueado o si no necesita cambiar clave, enviarlo al home/admin
    if (userProfile && userProfile.forcePasswordChange === false) {
      router.push("/admin");
    }
  }, [userProfile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      if (currentUser) {
        // 1. Actualizar contraseña en Firebase Auth
        await updatePassword(currentUser, newPassword);

        // 2. Actualizar estado en Firestore
        const userRef = doc(db, "usuarios", userProfile!.email);
        await updateDoc(userRef, {
          forcePasswordChange: false
        });

        setSuccess(true);
        setTimeout(() => {
          if (userProfile?.role === "admin" || userProfile?.role === "super") {
            router.push("/admin");
          } else {
            router.push("/academia/dashboard");
          }
        }, 2000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Error al actualizar la contraseña. Por favor, ingresa de nuevo.");
      // Si Firebase Auth requiere "recent login", cerramos sesión y mandamos al login
      if (err.code === "auth/requires-recent-login") {
        await logout();
        router.push("/login?reauth=1");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0F] text-zinc-900 dark:text-slate-100 flex flex-col font-sans relative selection:bg-[#C9A84C] selection:text-[#0A0A0F] transition-colors duration-500">
      <Grain />
      <MinimalNavbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 pt-24">
        <div className="w-full max-w-md bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C9A84C]/20 shadow-[0_0_20px_rgba(201,168,76,0.15)]">
              <ShieldCheck className="w-8 h-8 text-[#C9A84C]" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-zinc-950 dark:text-white mb-2">Cambio de Contraseña</h1>
            <p className="text-sm text-zinc-600 dark:text-[#A9A9A9]">Por seguridad, debes cambiar tu contraseña inicial antes de continuar.</p>
          </div>

          {success ? (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-center text-sm font-medium">
              Contraseña actualizada correctamente. Redirigiendo...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-slate-400 pl-1">Nueva Contraseña</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#C9A84C] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/50 transition-all text-sm"
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-slate-400 pl-1">Confirmar Contraseña</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-[#C9A84C] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/50 transition-all text-sm"
                    placeholder="Repetir contraseña"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-xs flex items-center justify-center">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-semibold text-sm uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A84C]/20 disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? "Actualizando..." : "Actualizar Contraseña"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
