"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { Lock, ShieldCheck, AlertCircle } from "lucide-react";
import Grain from "@/components/ui/Grain";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { userProfile } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      
      if (!user || !user.email) {
        throw new Error("No hay usuario autenticado");
      }

      // Reautenticar antes de cambiar contraseña
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Actualizar en Firebase Auth
      await updatePassword(user, newPassword);

      // Marcar en Firestore que ya cambió la contraseña
      const cleanEmail = user.email.toLowerCase().trim();
      const userRef = doc(db, "usuarios", cleanEmail);
      await updateDoc(userRef, { passwordChanged: true });

      setSuccess(true);
      
      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        router.push("/academia/dashboard");
      }, 2000);
      
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("La contraseña actual es incorrecta");
      } else {
        setError("Error al cambiar la contraseña. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
      <Grain />
      
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#12121A] border border-white/10 relative z-10 shadow-2xl">
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto border border-[#C9A84C]/20">
            <Lock className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Seguridad de la Cuenta</h1>
          <p className="text-sm text-slate-400">
            Por seguridad, debes cambiar tu contraseña inicial (cédula) por una nueva.
          </p>
        </div>

        {success ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-3">
            <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
            <div className="font-bold text-emerald-400">¡Contraseña actualizada!</div>
            <p className="text-xs text-slate-400">Redirigiendo a tu aula virtual...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Contraseña Actual (Tu Cédula)</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nueva Contraseña</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Repite la contraseña"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#0A0A0F] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Actualizar Contraseña"
              )}
            </button>
            
            <div className="text-center pt-2">
              <Link href="/academia/dashboard" className="text-xs text-slate-500 hover:text-white transition-colors">
                Omitir por ahora
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
