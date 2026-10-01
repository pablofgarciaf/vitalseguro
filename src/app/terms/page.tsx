import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Vital Seguros",
  description: "Términos y condiciones de uso del sitio web de Vital Seguros",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#08080C] text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceptación de Términos</h2>
            <p>
              Al acceder y usar www.vitalseguros.vercel.app, usted acepta estar vinculado por estos Términos y Condiciones. Si no está de acuerdo, por favor no utilice nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Servicios Ofrecidos</h2>
            <p>Vital Seguros ofrece:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cotizaciones de seguros de vida, salud y ahorro</li>
              <li>Emisión de pólizas de seguros</li>
              <li>Academia de Seguros (formación de asesores)</li>
              <li>Asesoría y gestión de pólizas</li>
              <li>Portal de siniestros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Responsabilidades del Usuario</h2>
            <p>Usted se compromete a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proporcionar información veraz y completa en las cotizaciones</li>
              <li>No usar el sitio con propósitos ilícitos</li>
              <li>No intentar acceder a áreas restringidas sin autorización</li>
              <li>Cumplir todas las leyes y regulaciones aplicables</li>
              <li>Respetar los derechos de propiedad intelectual</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Cotizaciones y Propuestas</h2>
            <p>
              Las cotizaciones proporcionadas son estimadas y no constituyen una oferta vinculante. El contrato de seguro se formaliza únicamente cuando se emite la póliza y se paga la primera prima.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Exactitud de la Información</h2>
            <p>
              El usuario es responsable de la exactitud de la información proporcionada. Cualquier declaración falsa o incompleta podría resultar en rechazo de reclamaciones o cancelación de la póliza según regulaciones de seguros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitación de Responsabilidad</h2>
            <p>
              Vital Seguros NO es responsable por:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Errores o inexactitudes en cotizaciones (antes de emisión de póliza)</li>
              <li>Daños causados por malware o acceso no autorizado</li>
              <li>Interrupciones del servicio por fuerza mayor</li>
              <li>Daños indirectos, incidentales o consecuentes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Política de Cambios y Cancelaciones</h2>
            <p>
              Los cambios y cancelaciones de pólizas están sujetos a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Las condiciones especificadas en cada póliza</li>
              <li>La regulación ecuatoriana de seguros</li>
              <li>Plazos mínimos de notificación</li>
              <li>Posibles penalidades según términos contractuales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Propiedad Intelectual</h2>
            <p>
              Todo contenido del sitio (textos, imágenes, diseños, logos) es propiedad de Vital Seguros o sus licenciantes. Está prohibido reproducir, distribuir o usar sin autorización explícita.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Links Externos</h2>
            <p>
              El sitio puede contener links a sitios externos. Vital Seguros no es responsable por el contenido de sitios terceros ni por políticas de privacidad que no sean las nuestras.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Modificación de Términos</h2>
            <p>
              Reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio implica aceptación de cambios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Jurisdicción y Ley Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de Ecuador. Cualquier disputa será resuelta según los códigos y procedimientos ecuatorianos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">12. Contacto</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <p><strong>Vital Seguros</strong></p>
              <p>Email: contacto@vitalseguros.com</p>
              <p>WhatsApp: +593 99 545 1814</p>
            </div>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            Última actualización: 1 de Octubre de 2026
          </p>
        </div>
      </div>
    </main>
  );
}
