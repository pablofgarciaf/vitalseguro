import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | Vital Seguros",
  description: "Aviso legal y disclaimers de Vital Seguros",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#08080C] text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Aviso Legal y Disclaimers</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Información de la Empresa</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded space-y-2">
              <p><strong>Nombre Comercial:</strong> Vital Seguros</p>
              <p><strong>Ubicación:</strong> Quito, Ecuador</p>
              <p><strong>Correo Electrónico:</strong> contacto@vitalseguros.com</p>
              <p><strong>Teléfono/WhatsApp:</strong> +593 99 545 1814</p>
              <p><strong>Asegurador Principal:</strong> BMI Financial Group</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Disclaimer de Seguros</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded">
              <p className="font-bold text-red-600 dark:text-red-400 mb-2">⚠️ IMPORTANTE:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Los seguros ofrecidos están respaldados por aseguradoras autorizadas por la Superintendencia de Compañías de Ecuador</li>
                <li>Las cotizaciones son estimadas; el precio final depende de evaluación de riesgo y aprobación de la aseguradora</li>
                <li>La cobertura específica, límites y exclusiones se encuentran en las Condiciones Generales y Particulares de cada póliza</li>
                <li>Es responsabilidad del asegurado leer y entender los términos de su póliza antes de aceptarla</li>
                <li>Las pólizas pueden contener cláusulas de exclusión que limitan la cobertura en ciertos casos</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. No es Asesoramiento Financiero o Médico</h2>
            <p>
              La información proporcionada en este sitio es educativa y no constituye asesoramiento financiero, médico o legal profesional. Consulte con profesionales calificados antes de tomar decisiones importantes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Exactitud de Cotizaciones</h2>
            <p>
              Aunque utilizamos datos precisos para generar cotizaciones, pueden ocurrir errores. Las cotizaciones son válidas por 30 días. Para asegurar precisión, la aseguradora realizará una evaluación de riesgo antes de emitir la póliza.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Información sobre Siniestros</h2>
            <p>
              Para presentar un siniestro, contacte inmediatamente a través de nuestros canales oficiales. Retrasos en la notificación pueden afectar la cobertura. Consulte los términos específicos de su póliza.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Disponibilidad del Sitio Web</h2>
            <p>
              Aunque nos esforzamos por mantener el sitio disponible 24/7, no garantizamos disponibilidad sin interrupciones. Las actualizaciones o mantenimiento pueden causar indisponibilidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Regulación y Supervisión</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded">
              <p className="mb-2">Las operaciones de seguros en Ecuador están supervisadas por:</p>
              <p className="font-bold">Superintendencia de Compañías, Valores y Seguros</p>
              <p className="text-sm">Sitio web: www.supercias.gob.ec</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Derecho de Revocatoria</h2>
            <p>
              Conforme a la ley ecuatoriana, los consumidores pueden tener derecho a revocar pólizas dentro de plazos específicos. Consulte los términos de su póliza para detalles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Datos de Terceros</h2>
            <p>
              Al proporcionar datos de terceros (beneficiarios, dependientes), usted confirma tener su consentimiento y autorización. Vital Seguros no es responsable por uso no autorizado de datos de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Limitación de Responsabilidad</h2>
            <p>
              Vital Seguros actúa como correduría de seguros. La responsabilidad final de coberturas y pagos recae en las aseguradoras autorizadas. Vital Seguros no es responsable por rechazos de reclamaciones o incumplimientos de aseguradoras.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Cambios en este Aviso</h2>
            <p>
              Reservamos el derecho de actualizar este aviso legal en cualquier momento. El acceso continuado al sitio implica aceptación de cambios.
            </p>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            Última actualización: 1 de Octubre de 2026
          </p>
        </div>
      </div>
    </main>
  );
}
