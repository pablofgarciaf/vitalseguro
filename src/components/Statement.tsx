export default function Statement() {
  return (
    <section
      id="esencia"
      className="relative min-h-[560px] flex items-center px-4 sm:px-8 lg:px-16 py-20 overflow-hidden"
      aria-label="Declaración de valor de VitalSeguros"
    >
      {/* Background Image with Cinematic Luxury Warmth */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=85')",
          filter: "brightness(0.35) saturate(0.65)",
        }}
        aria-hidden="true"
      />

      {/* Dark overlay for contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/90 via-[#0A0A0F]/70 to-[#0A0A0F]/40"
        aria-hidden="true"
      />

      {/* Luxury Glass Floating Panel */}
      <div className="relative z-10 max-w-2xl ml-auto rounded-[24px] border border-white/10 bg-[#0A0A0F]/80 backdrop-blur-md p-8 sm:p-12 lg:p-14 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-mono font-medium">
            Compromiso Profesional &bull; Gabriel Jácome
          </span>
        </div>

        <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#D4D4D4] mb-6 leading-tight">
          Todo lo que has construido con esfuerzo merece una protección a su nivel.
        </h2>

        <p className="text-[#A9A9A9] text-sm sm:text-base leading-relaxed mb-8 font-sans">
          Escuchamos antes de recomendar. Analizamos cada variable médica y patrimonial antes de estructurar una póliza.
          Porque proteger a tu familia o tu empresa debe brindarte certidumbre absoluta, sin vacíos ni letra pequeña.
        </p>

        <div className="pt-6 border-t border-white/8 flex items-center justify-between">
          <div>
            <p className="font-serif font-normal text-base text-[#D4D4D4]">
              Gabriel Jácome
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">
              Socio Estratégico DC Asesores &bull; Ecuador
            </p>
          </div>

          <a
            href="#contacto"
            className="btn-gold-luxury px-5 py-2.5 text-xs uppercase font-mono tracking-[0.1em]"
          >
            Agendar Consulta
          </a>
        </div>
      </div>
    </section>
  );
}