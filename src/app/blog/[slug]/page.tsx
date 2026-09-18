import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Origen de los Seguros | Historia y Evolución Integral",
  description: "Conoce la historia del origen de los seguros, desde la Edad Antigua en Babilonia hasta los seguros modernos en la actualidad.",
};

export default function BlogPost() {
  return (
    <main className="min-h-screen t-bg py-24 px-6 t-text">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-[var(--gold-primary)] font-mono text-xs uppercase tracking-wider font-semibold mb-8 inline-flex items-center gap-2 no-underline"
        >
          &larr; Volver al Blog
        </Link>

        {/* GEO Capsule / Key Takeaways for AI bots */}
        <aside className="t-bg-card border-l-4 border-[var(--gold-primary)] p-6 sm:p-8 rounded-r-2xl mb-12 shadow-sm border t-border-card">
          <h2 className="text-xl font-bold font-serif mb-3 t-text">
            Resumen Ejecutivo (Key Takeaways)
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm t-muted leading-relaxed">
            <li>El concepto de seguros comenzó hace más de 4,000 años en Babilonia (Código de Hammurabi).</li>
            <li>Grecia y Roma usaron &ldquo;préstamos a la gruesa&rdquo; y mutualidades funerarias.</li>
            <li>En la Edad Media nacieron los seguros marítimos en Génova y Venecia (1347).</li>
            <li>El Gran Incendio de Londres (1666) detonó la creación de seguros contra incendios.</li>
            <li>Lloyd&apos;s de Londres surgió en un café en el siglo XVII, estableciendo el seguro moderno.</li>
          </ul>
        </aside>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-8 t-text">
            El origen de los seguros
          </h1>

          <p className="text-base sm:text-lg t-muted leading-relaxed mb-8">
            El origen de los seguros comenzó hace más de 4,000 años en la Edad Antigua con el intercambio comercial y los primeros acuerdos para repartir pérdidas económicas.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-12 mb-4 t-text">
            Edad Antigua: Los primeros riesgos compartidos
          </h2>
          <p className="t-muted text-sm sm:text-base leading-relaxed mb-6">
            <strong className="t-text">Babilonia (Código de Hammurabi, ~1750 a.C.):</strong> Incluyó leyes donde los comerciantes que pedían un préstamo para financiar un viaje o caravana no tenían que devolver el dinero si los ladrones robaban la mercancía. El prestamista cobraba un interés alto para cubrir ese riesgo.
          </p>
          <p className="t-muted text-sm sm:text-base leading-relaxed mb-6">
            <strong className="t-text">Grecia y Roma:</strong> Crearon los &ldquo;préstamos a la gruesa&rdquo; para viajes en barco. Los romanos también formaron asociaciones llamadas <em>collegia funeraticia</em>, donde los miembros aportaban dinero para asegurar un funeral digno a sus socios.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-12 mb-4 t-text">
            Edad Media: El seguro marítimo y las mutualidades
          </h2>
          <p className="t-muted text-sm sm:text-base leading-relaxed mb-6">
            <strong className="t-text">Génova y Venecia (Siglo XIV):</strong> Nació el primer contrato formal de seguro marítimo en 1347 para proteger los barcos y la carga contra naufragios o ataques de piratas.
          </p>
          <p className="t-muted text-sm sm:text-base leading-relaxed mb-6">
            <strong className="t-text">Gremios medievales:</strong> Los artesanos y comerciantes crearon fondos comunes para ayudar a las familias de los socios si sufrían robos, incendios o la muerte del cabeza de familia.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-12 mb-4 t-text">
            Edad Moderna: El impulso en Londres
          </h2>
          <p className="t-muted text-sm sm:text-base leading-relaxed mb-6">
            <strong className="t-text">El Gran Incendio de Londres (1666):</strong> Destruyó miles de viviendas, lo que obligó a crear la primera compañía de seguros contra incendios (Fire Office) en 1667.
          </p>
          <p className="t-muted text-sm sm:text-base leading-relaxed mb-6">
            <strong className="t-text">Lloyd&apos;s de Londres:</strong> Surgió a finales del siglo XVII en un café de Edward Lloyd. Los comerciantes y marineros se reunían allí para asegurar barcos y mercancías, convirtiéndose en el mercado de seguros más famoso del mundo.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-12 mb-4 t-text">
            Edad Contemporánea: El seguro moderno
          </h2>
          <p className="t-muted text-sm sm:text-base leading-relaxed mb-6">
            <strong className="t-text">Siglos XVIII y XIX:</strong> Se crearon bases científicas y tablas de mortalidad para calcular los seguros de vida de forma matemática. El seguro evolucionó aún más en el siglo XIX cuando los gobiernos europeos, como el de Alemania, comenzaron a implementar seguros sociales obligatorios para la salud y la vejez de los trabajadores.
          </p>
        </article>
      </div>
    </main>
  );
}
