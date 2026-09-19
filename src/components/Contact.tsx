"use client";

import { useState } from "react";
import { Phone, Mail, ShieldCheck } from "lucide-react";

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "Plan de Ahorro e Inversión",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola VitalSeguros, deseo contactarme desde su landing page:

👤 *Nombre:* ${formData.name}
📱 *Teléfono:* ${formData.phone}
🛡️ *Póliza de Interés:* ${formData.type}
💬 *Mensaje:* ${formData.message || "Solicito reunión o cotización personalizada."}`;

    const waUrl = `https://wa.me/593995451814?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setSent(true);
  };

  return (
    <section
      id="contacto"
      className="py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-t border-black/5 dark:border-white/5 relative"
      aria-labelledby="contacto-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Social Profiles */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-mono font-semibold">
                  Atención Directa &bull; Ecuador
                </span>
              </div>
              <h2
                id="contacto-title"
                className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-zinc-900 dark:text-[#D4D4D4] mb-4 leading-tight"
              >
                Hablemos hoy de lo que{" "}
                <span className="text-gold-gradient font-normal italic">
                  más valoras cuidar
                </span>
              </h2>
              <p className="text-zinc-600 dark:text-[#A9A9A9] text-sm sm:text-base leading-relaxed max-w-lg font-sans">
                Protección patrimonial, salud médica integral y planes de capitalización diseñados por Gabriel Jácome. Respuesta inmediata las 24 horas del día.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Card with real Gabo number */}
              <div className="rounded-[20px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-sm p-5 hover:border-[#C9A84C]/30 transition-all">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#86868B] mb-1">
                  Móvil y WhatsApp Directo
                </p>
                <a
                  href="https://wa.me/593995451814?text=Hola%20Gabriel,%20deseo%20asesoria%20personalizada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base font-normal text-zinc-900 dark:text-[#D4D4D4] hover:text-[#C9A84C] transition-colors no-underline block"
                >
                  099 545 1814
                </a>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block mt-1">
                  ● +593 99 545 1814
                </span>
              </div>

              {/* Verified Social Profiles Card */}
              <div className="rounded-[20px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-sm p-5 hover:border-[#C9A84C]/30 transition-all">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] mb-3">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#86868B] mb-2">
                  Redes Oficiales de Gabo
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/gabriel_jacome_seguros_?utm_source=qr&stkn=MTMyeGZzOW13dHJ0MA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-[#D4D4D4] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all no-underline"
                  >
                    <InstagramIcon className="w-3 h-3" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1EaJd4d6Tp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-[#D4D4D4] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all no-underline"
                  >
                    <FacebookIcon className="w-3 h-3" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

              {/* Obfuscated Emails Card */}
              <div className="rounded-[20px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-sm p-5 sm:col-span-2 hover:border-[#C9A84C]/30 transition-all">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#C9A84C]/10 text-[#C9A84C] mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#86868B] mb-2">
                  Correo Electrónico Oficial
                </p>
                <div className="font-mono text-xs text-zinc-800 dark:text-[#D4D4D4]">
                  <span className="text-[#86868B]">Gabriel Jácome: </span>
                  <span>contacto</span>
                  <span className="text-[#C9A84C]">&#64;</span>
                  <span>gabrieljacome.com</span>
                </div>
              </div>
            </div>

            {/* Trust Banner */}
            <div className="rounded-[20px] border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/20 p-4 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs text-zinc-600 dark:text-[#8E8E93] leading-relaxed m-0 font-sans">
                Asesoría acreditada para pólizas con <strong className="text-zinc-900 dark:text-[#D4D4D4]">BMI del Ecuador</strong>, Saludsa, Humana y aseguradoras multinacionales de primera línea.
              </p>
            </div>
          </div>

          {/* Right Column: Fast Form */}
          <div className="lg:col-span-6 rounded-[24px] border border-black/8 dark:border-white/8 bg-white dark:bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10 shadow-sm">
            <h3 className="font-serif font-light text-2xl text-zinc-900 dark:text-[#D4D4D4] mb-2">
              Solicitar Consulta Personalizada
            </h3>
            <p className="text-zinc-600 dark:text-[#A9A9A9] text-xs sm:text-sm mb-6 leading-relaxed font-sans">
              Envía tus datos y Gabriel Jácome revisará tus requerimientos para enviarte opciones comparadas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-700 dark:text-[#A9A9A9] mb-1.5"
                >
                  Nombre Completo
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tu nombre y apellido"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-700 dark:text-[#A9A9A9] mb-1.5"
                  >
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="099 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-type"
                    className="block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-700 dark:text-[#A9A9A9] mb-1.5"
                  >
                    Póliza de Interés
                  </label>
                  <select
                    id="contact-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] focus:outline-none transition-colors"
                  >
                    <option value="Plan de Ahorro e Inversión" className="bg-zinc-900 text-white">Ahorro e Inversión / Retiro</option>
                    <option value="Seguro de Vida Tradicional" className="bg-zinc-900 text-white">Seguro de Vida Tradicional</option>
                    <option value="Salud Médica Integral" className="bg-zinc-900 text-white">Salud Médica Integral</option>
                    <option value="Seguro Vehicular" className="bg-zinc-900 text-white">Seguro Vehicular</option>
                    <option value="Patrimonio y Hogar" className="bg-zinc-900 text-white">Hogar y Patrimonio</option>
                    <option value="Empresarial Colectivo" className="bg-zinc-900 text-white">Seguros Empresariales</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-msg"
                  className="block font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-700 dark:text-[#A9A9A9] mb-1.5"
                >
                  Mensaje o Especificación (Opcional)
                </label>
                <textarea
                  id="contact-msg"
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntanos brevemente tus dudas o requerimientos..."
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gold-luxury w-full py-3 font-mono text-xs uppercase tracking-[0.1em] active:scale-95 cursor-pointer"
              >
                <span>Enviar Solicitud por WhatsApp</span>
                <span aria-hidden="true">&rarr;</span>
              </button>

              {sent && (
                <p className="text-xs font-mono text-[#C9A84C] text-center mt-2">
                  ✓ Solicitud enviada directamente al WhatsApp de Gabriel Jácome.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}