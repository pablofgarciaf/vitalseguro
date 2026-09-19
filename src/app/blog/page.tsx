import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Seguros | VitalSeguros Asesoría Oficial 24/7",
  description: "Aprende sobre seguros de salud, vida, autos y patrimonio en Ecuador con Gabriel Jácome. Artículos de educación financiera y consejos clave.",
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen t-bg py-24 px-6 t-text">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-[var(--gold-primary)] font-mono text-xs uppercase tracking-wider font-semibold mb-6 inline-flex items-center gap-2 no-underline">
            &larr; Volver al Inicio
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold-primary)] font-semibold block mb-2">
            EDUCACIÓN FINANCIERA &bull; GABRIEL JÁCOME
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 t-text">
            Blog y Guías de Seguros
          </h1>
          <p className="text-base t-muted max-w-xl leading-relaxed">
            Explora artículos especializados sobre coberturas médicas, protección familiar, gestión de siniestros y patrimonio en Ecuador.
          </p>
        </div>

        <div className="grid gap-8">
          <Link href="/blog/origen-de-los-seguros" className="group no-underline">
            <article className="t-bg-card p-8 rounded-3xl shadow-sm border t-border-card hover:border-[var(--gold-border)] hover:shadow-xl transition-all duration-300">
              <span className="text-xs font-mono font-bold text-[var(--gold-primary)] uppercase tracking-widest mb-3 block">
                Historia &bull; Fundamentos
              </span>
              <h2 className="text-2xl font-serif font-bold mb-3 t-text group-hover:text-[var(--gold-primary)] transition-colors">
                El Origen de los Seguros
              </h2>
              <p className="t-muted mb-6 line-clamp-2 text-sm leading-relaxed">
                Descubre cómo comenzaron los seguros hace más de 4,000 años en Babilonia, pasando por Grecia, Roma y el Gran Incendio de Londres.
              </p>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--gold-primary)] inline-flex items-center gap-2">
                <span>Leer artículo completo</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </article>
          </Link>
        </div>
      </div>
    </main>
  );
}
