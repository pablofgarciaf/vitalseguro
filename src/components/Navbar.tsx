"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { ShieldCheck, Briefcase, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/#bento",                 label: "Pólizas" },
  { href: "/academia",               label: "Academia" },
  { href: "/trabaja-con-nosotros",   label: "Únete al Equipo" },
  { href: "/blog",                   label: "Blog" },
  { href: "/#contacto",              label: "Contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userProfile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Floating WhatsApp Action */}
      <a
        href="https://wa.me/593995451814?text=Hola%2C%20deseo%20asesor%C3%ADa%20personalizada%20en%20seguros"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp con VitalSeguros"
        className="wa-float-luxury"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Floating Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-black/8 dark:border-white/8 bg-[#FDFBF7]/90 dark:bg-[#0A0A0F]/90 backdrop-blur-xl shadow-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Vital Seguros Inicio"
            className="flex items-center gap-3 no-underline group"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#C9A84C]/40 bg-[#0A0A0F] overflow-hidden p-0.5 shadow-sm">
              <img
                src="/images/vitalseguros-logo.webp"
                alt="Logo Vital Seguros"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-normal text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-[#D4D4D4]">
                Vital <span className="text-gold-gradient font-medium">Seguros</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A9A9A9] leading-none">
                Protección &bull; Seguros &bull; Vida
              </span>
            </div>
          </Link>

          {/* Navigation Links (Limpio y Enfocado) */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-semibold text-zinc-600 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors relative group"
              >
                <span>{label}</span>
                {/* Underline animado */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </Link>
            ))}
            
            {/* Si el usuario está logueado y es estudiante o admin, mostrar 'Mi Aula' */}
            {userProfile && (
              <Link
                href="/academia/dashboard"
                className="text-sm font-bold text-[#E0C068] hover:text-white transition-colors relative group flex items-center gap-1.5"
              >
                <span>Mi Aula</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C9A84C]/30 transition-all group-hover:bg-[#C9A84C]"></span>
              </Link>
            )}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* BOTÓN DE COTIZAR */}
            <a
              href="/#simulador"
              className="hidden sm:inline-flex btn-gold-luxury px-4 py-2 font-mono text-xs uppercase tracking-[0.1em]"
            >
              <span>Cotizar</span>
              <span className="text-sm font-sans" aria-hidden="true">&rarr;</span>
            </a>

            {/* User Profile / Logout */}
            {userProfile && (
              <button
                onClick={logout}
                title={`Sesión activa: ${userProfile.name} (${userProfile.role}). Clic para salir.`}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="lg:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 border border-zinc-200 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] cursor-pointer"
            >
              <span
                className={`w-5 h-[1.5px] bg-zinc-800 dark:bg-zinc-200 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-zinc-800 dark:bg-zinc-200 transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-black/8 dark:border-white/8 bg-[#FDFBF7] dark:bg-[#0A0A0F] ${
            menuOpen ? "max-h-[30rem] opacity-100 py-4 px-6" : "max-h-0 opacity-0 py-0 px-6"
          }`}
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-800 dark:text-[#D4D4D4] hover:text-[#C9A84C] py-2.5 border-b border-black/5 dark:border-white/5 no-underline flex items-center justify-between"
              >
                <span>{label}</span>
                <span className="text-xs text-slate-500">→</span>
              </Link>
            ))}

          </div>
        </div>
      </header>

      <div className="h-[74px]" aria-hidden="true" />
    </>
  );
}