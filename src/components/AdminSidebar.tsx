"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Users, 
  Sliders, 
  Compass, 
  LogOut, 
  ShieldCheck, 
  User, 
  Menu, 
  X,
  TrendingUp,
  Briefcase,
  UserCheck,
  Building2,
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export type AdminTab = "bi" | "crm" | "aspirantes";

interface AdminSidebarProps {
  adminTab?: AdminTab;
  setAdminTab?: (tab: AdminTab) => void;
  aspirantesCount?: number;
  leadsCount?: number;
  totalGMV?: number;
}

export default function AdminSidebar({ 
  adminTab = "bi", 
  setAdminTab,
  aspirantesCount = 0,
  leadsCount = 0,
  totalGMV = 0
}: AdminSidebarProps) {
  const { userProfile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userRole = userProfile?.role || "super";
  const userEmail = userProfile?.email || "admin@vitalseguros.com";

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-[#0A0E17] border-b border-white/10 w-full sticky top-0 z-40 shadow-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] via-[#E0C068] to-[#9A6E0A] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#0E1726] rounded-[10px] flex items-center justify-center font-serif font-black text-[#E0C068] text-sm">
              V
            </div>
          </div>
          <div>
            <span className="font-serif text-xs font-bold text-white block leading-tight tracking-wide">
              VITAL <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
            </span>
            <span className="text-[10px] text-[#C9A84C] font-mono tracking-wider flex items-center gap-1">
              <span className="text-emerald-400">●</span> Master CRM
            </span>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 bg-[#0A0E17]/98 backdrop-blur-2xl z-50 lg:hidden flex flex-col p-5 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] via-[#E0C068] to-[#9A6E0A] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0E1726] rounded-[10px] flex items-center justify-center font-serif font-black text-[#E0C068] text-sm">
                  V
                </div>
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-white block">
                  VITAL <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
                </span>
                <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono">
                  Master Command CRM
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.03] border border-[#C9A84C]/25 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Tu Rol Autorizado</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C9A84C]/20 text-[#E0C068] border border-[#C9A84C]/30">
                {userRole}
              </span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {userEmail}
            </p>
          </div>

          <nav className="mt-5 space-y-1.5 flex-1">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 px-3 block mb-2">
              Módulos Departamentales
            </span>

            <button
              onClick={() => { if (setAdminTab) setAdminTab("bi"); setMobileOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminTab === "bi"
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] shadow-lg font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>Tablero Ejecutivo (BI)</span>
              </div>
              <span className="text-[10px] font-mono opacity-90">${Math.round(totalGMV / 1000)}k</span>
            </button>

            <button
              onClick={() => { if (setAdminTab) setAdminTab("crm"); setMobileOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminTab === "crm"
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] shadow-lg font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Ventas & Pipeline</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold">
                {leadsCount}
              </span>
            </button>

            <button
              onClick={() => { if (setAdminTab) setAdminTab("aspirantes"); setMobileOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminTab === "aspirantes"
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] shadow-lg font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4" />
                <span>Equipo & Aspirantes</span>
              </div>
              {aspirantesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {aspirantesCount}
                </span>
              )}
            </button>

            <div className="pt-3 pb-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 px-3 block mb-2">
                Herramientas & Configuración
              </span>
            </div>

            <Link
              href="/admin/configuracion"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-[#C9A84C]" />
                <span>Tasas de Comisión</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/10 space-y-2 mt-6">
            <button
              onClick={logout}
              className="w-full py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Luxury Master Command Sidebar */}
      <aside className="hidden lg:flex lg:w-72 bg-[#0A0E17] border-r border-white/10 p-5 flex-col justify-between shrink-0 shadow-2xl z-20">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-white/10">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#C9A84C] via-[#E0C068] to-[#9A6E0A] p-0.5 shadow-lg shadow-[#C9A84C]/15">
              <div className="w-full h-full bg-[#0E1726] rounded-[14px] flex items-center justify-center font-serif font-black text-[#E0C068] text-lg">
                V
              </div>
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-tight text-white block">
                VITAL <span className="text-[#C9A84C] font-normal">ENTERPRISE</span>
              </span>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono">
                Master Command CRM
              </span>
            </div>
          </div>

          {/* User Profile & Role Indicator Card */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-[#C9A84C]/25 space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Tu Rol Autorizado</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C9A84C]/20 text-[#E0C068] border border-[#C9A84C]/30">
                {userRole.toUpperCase()}
              </span>
            </div>
            <p className="text-xs font-semibold text-white truncate" title={userEmail}>
              {userEmail}
            </p>
          </div>

          {/* Departmental Navigation Modules */}
          <nav className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 px-3 block mb-2">
              Módulos Departamentales
            </span>

            <button
              onClick={() => { if (setAdminTab) setAdminTab("bi"); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminTab === "bi"
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] shadow-lg font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4" />
                <span>Tablero Ejecutivo (BI)</span>
              </div>
              <span className="text-[10px] font-mono opacity-90">${Math.round(totalGMV / 1000)}k</span>
            </button>

            <button
              onClick={() => { if (setAdminTab) setAdminTab("crm"); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminTab === "crm"
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] shadow-lg font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Ventas & Pipeline</span>
              </div>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                adminTab === "crm" ? "bg-[#0A0E17]/25 text-[#0A0E17]" : "bg-white/10 text-slate-300"
              }`}>
                {leadsCount}
              </span>
            </button>

            <button
              onClick={() => { if (setAdminTab) setAdminTab("aspirantes"); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                adminTab === "aspirantes"
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] shadow-lg font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4" />
                <span>Equipo & Aspirantes</span>
              </div>
              {aspirantesCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {aspirantesCount}
                </span>
              )}
            </button>

            <div className="pt-3 pb-1">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 px-3 block mb-2">
                Herramientas & Configuración
              </span>
            </div>

            <Link
              href="/admin/configuracion"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#C9A84C]" />
                <span>Tasas de Comisión</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer with Logout & Live Status */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between px-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Firebase Activo
            </span>
            <span className="font-mono text-[10px] text-slate-500">v2.4 CRM</span>
          </div>

          <button
            onClick={logout}
            className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
