"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { ShieldCheck, Briefcase, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/#bento",                 label: "Pólizas" },
  { href: "/#cotizador-vida",        label: "Cotizar Vida" },
  { href: "/#cotizador-salud",       label: "Cotizar Salud" },
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


      {/* Floating Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-black/8 dark:border-white/8 bg-[#FDFBF7]/90 dark:bg-[#08080C]/90 backdrop-blur-xl shadow-md"
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
              <span className={`font-serif font-normal text-lg sm:text-xl tracking-tight transition-colors ${
                isScrolled ? "text-zinc-900 dark:text-[#D4D4D4]" : "text-white"
              }`}>
                Vital <span className="text-gold-gradient font-medium">Seguros</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9A84C] leading-none">
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
                className={`text-sm font-semibold transition-colors relative group ${
                  isScrolled
                    ? "text-zinc-600 dark:text-slate-300 hover:text-black dark:hover:text-white"
                    : "text-slate-200 hover:text-white"
                }`}
              >
                <span>{label}</span>
                {/* Underline animado */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* BOTÓN DE COTIZAR */}
            <a
              href="/#cotizador-salud"
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
              className={`lg:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isScrolled
                  ? "border border-zinc-200 dark:border-white/10 bg-black/5 dark:bg-white/[0.03]"
                  : "border border-white/20 bg-white/10 backdrop-blur-sm"
              }`}
            >
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isScrolled ? "bg-zinc-800 dark:bg-zinc-200" : "bg-white"
                } ${menuOpen ? "rotate-45 translate-y-[4.5px]" : ""}`}
              />
              <span
                className={`w-5 h-[1.5px] transition-all duration-300 ${
                  isScrolled ? "bg-zinc-800 dark:bg-zinc-200" : "bg-white"
                } ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-black/8 dark:border-white/8 bg-[#FDFBF7] dark:bg-[#08080C] ${
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