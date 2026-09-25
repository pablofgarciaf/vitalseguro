"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  Award, 
  FileText, 
  Home, 
  LogOut, 
  User, 
  Menu, 
  X,
  BookOpen
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AcademiaSidebar() {
  const { userProfile, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    {
      href: "/academia/dashboard",
      label: "Mi Dashboard",
      icon: GraduationCap,
      exact: true
    },
    {
      href: "/academia/dashboard/calificaciones",
      label: "Mis Certificados",
      icon: Award,
      exact: false
    },
    {
      href: "/academia/manuales",
      label: "Manuales y Guías",
      icon: FileText,
      exact: false
    },
  ];

  return (
    <>
      {/* Mobile Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#12121A] border-b border-white/10 w-full sticky top-0 z-40">
        <Link href="/academia" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C9A84C]/40 bg-[#0A0A0F] overflow-hidden p-0.5">
            <img
              src="/images/vitalseguros-logo.webp"
              alt="Logo Vital Seguros"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="font-serif font-bold text-white text-base">Academia Vital</span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-[#12121A] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header / Brand */}
        <div className="p-6 border-b border-white/10">
          <Link href="/academia" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#C9A84C]/40 bg-[#0A0A0F] overflow-hidden p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <img
                src="/images/vitalseguros-logo.webp"
                alt="Logo Vital Seguros"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="text-base font-serif font-bold text-white block tracking-wide">Vital Academia</span>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">Formación de Asesores</span>
            </div>
          </Link>

          <div className="mt-4 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C9A84C]/10 text-[#E0C068] border border-[#C9A84C]/20 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3 text-[#C9A84C]" />
              Campus Virtual
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
            Menú de Estudio
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.exact 
              ? pathname === link.href 
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#C9A84C]/20 to-[#C9A84C]/5 text-[#E0C068] border border-[#C9A84C]/30 shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#C9A84C]" : "text-slate-400"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
            Navegación Sitio
          </div>

          <Link
            href="/"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Volver a Inicio</span>
          </Link>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02]">
          {userProfile ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                  {userProfile.name.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-white block truncate">{userProfile.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono block truncate">{userProfile.email}</span>
                </div>
              </div>

              <button
                onClick={logout}
                title="Cerrar sesión"
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-all shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-all"
            >
              <User className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Acceder</span>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
