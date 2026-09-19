import Link from "next/link";
import ObfuscatedEmail from "./ObfuscatedEmail";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/8 dark:border-white/8 bg-[#FDFBF7] dark:bg-[#0A0A0F] pt-16 pb-12 px-4 sm:px-8 lg:px-16" aria-label="Pie de página corporativo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-black/8 dark:border-white/8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="Vital Seguros Inicio"
              className="flex items-center gap-3 no-underline"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center border border-[#C9A84C]/40 bg-[#0A0A0F] overflow-hidden p-0.5">
                <img
                  src="/images/vitalseguros-logo.webp"
                  alt="Logo Vital Seguros"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-serif font-normal text-lg tracking-tight text-zinc-900 dark:text-[#D4D4D4]">
                Vital <span className="text-gold-gradient font-medium">Seguros</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-[#8E8E93] text-xs sm:text-sm leading-relaxed font-sans">
              Ecosistema integral de Seguros de Vida, Salud, Asistencia en Viajes de Lujo y Escuela Oficial de Formación para Asesores.
            </p>
            {/* Real Social Media Profiles */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.instagram.com/vitalseguros_ec"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Gabriel Jácome"
                className="w-8 h-8 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center text-[#A9A9A9] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1EaJd4d6Tp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Gabriel Jácome"
                className="w-8 h-8 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center text-[#A9A9A9] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-mono text-[#A9A9A9] hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"
              >
                in
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold">
                Ecosistema Vital
              </span>
            </div>
            <ul className="space-y-2 list-none p-0 m-0">
              <li>
                <Link href="/" className="font-mono text-xs text-zinc-600 dark:text-[#A9A9A9] hover:text-[#C9A84C] transition-colors no-underline">
                  Inicio &bull; Pólizas
                </Link>
              </li>
              <li>
                <Link href="/escuela-viajes" className="font-mono text-xs text-[#E0C068] hover:text-[#C9A84C] font-semibold transition-colors no-underline">
                  ✈️ Escuela de Viajes & Asistencia
                </Link>
              </li>
              <li>
                <Link href="/#simulador" className="font-mono text-xs text-zinc-600 dark:text-[#A9A9A9] hover:text-[#C9A84C] transition-colors no-underline">
                  Simulador de Coberturas
                </Link>
              </li>
              <li>
                <Link href="/admin" className="font-mono text-xs text-[#34D399] hover:text-emerald-400 font-semibold transition-colors no-underline">
                  💼 Panel CRM de Ventas
                </Link>
              </li>
              <li>
                <Link href="/admin/configuracion" className="font-mono text-xs text-[#C9A84C] hover:underline font-mono transition-colors no-underline">
                  ⚙️ Configuración de Comisiones (60%)
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold">
                Ramos Principales
              </span>
            </div>
            <ul className="space-y-2 list-none p-0 m-0 font-mono text-xs text-zinc-600 dark:text-[#8E8E93]">
              <li>Seguro de Vida & Jubilación (60% com.)</li>
              <li>Vital Travel Safe (Asistencia en Viaje)</li>
              <li>Salud Médica VIP Internacional</li>
              <li>Pólizas Colectivas & Flotas B2B</li>
              <li>Seguro Vehicular Integral</li>
              <li>Defensa Jurídica de Siniestros</li>
            </ul>
          </div>

          {/* Direct Office & Contact Column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-6 bg-gradient-to-r from-[#C9A84C] to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-semibold">
                Contacto Directo
              </span>
            </div>
            <div className="space-y-2 text-xs font-mono text-zinc-600 dark:text-[#8E8E93]">
              <p>Quito, Ecuador & Cobertura Nacional</p>
              <p>WhatsApp 24/7: +593 99 545 1814</p>
              <div className="pt-1">
                <ObfuscatedEmail />
              </div>
              <p className="text-[11px] text-[#A9A9A9] pt-2">
                Asesor Senior: Gabriel Jácome & Equipo Certificado
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-[#666] font-mono gap-4">
          <div>
            &copy; {currentYear} Vital Seguros & Escuela de Viajes. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Firebase DB: studio-9268277525-3e4c7</span>
            <span>&bull;</span>
            <Link href="/admin" className="hover:text-[#C9A84C]">
              Portal Interno
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}