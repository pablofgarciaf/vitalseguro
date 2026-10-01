import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Vital Seguros",
  description: "Política de privacidad y protección de datos de Vital Seguros",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#08080C] text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Información General</h2>
            <p>
              Vital Seguros ("Empresa"), con domicilio en Quito, Ecuador, se compromete a proteger la privacidad de los datos personales de sus usuarios, clientes y visitantes del sitio web www.vitalseguros.vercel.app ("Sitio Web").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Datos que Recopilamos</h2>
            <p>Recopilamos datos personales cuando usted:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cotiza seguros a través de nuestros formularios</li>
              <li>Se registra en Academia Vital Seguros</li>
              <li>Nos contacta por WhatsApp, email o formularios de contacto</li>
              <li>Accede al panel administrativo</li>
              <li>Navega por nuestro sitio web</li>
            </ul>
            <p className="mt-4">Los datos incluyen: nombre, email, teléfono, edad, cédula de identidad, información de salud (para cotizaciones), ubicación geográfica y datos de navegación.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Base Legal del Tratamiento</h2>
            <p>Tratamos sus datos basados en:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consentimiento:</strong> Otorgado explícitamente al usar nuestros servicios</li>
              <li><strong>Contrato:</strong> Emisión de pólizas y cotizaciones de seguros</li>
              <li><strong>Obligación Legal:</strong> Cumplimiento de regulaciones de seguros en Ecuador</li>
              <li><strong>Interés Legítimo:</strong> Mejorar nuestros servicios y seguridad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Finalidad del Tratamiento</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cotizar y emitir pólizas de seguros</li>
              <li>Procesar pagos de primas</li>
              <li>Cumplimiento de obligaciones regulatorias</li>
              <li>Gestión de siniestros</li>
              <li>Comunicaciones sobre sus pólizas</li>
              <li>Análisis y mejora de servicios</li>
              <li>Marketing y comunicaciones comerciales (con consentimiento)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Compartición de Datos</h2>
            <p>Compartimos datos con:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Aseguradoras:</strong> BMI Financial Group y aliadas</li>
              <li><strong>Proveedores de servicios:</strong> Procesamiento de pagos, hosting (Firebase)</li>
              <li><strong>Autoridades regulatorias:</strong> Cuando lo exija la ley</li>
              <li><strong>Proveedores médicos:</strong> Para verificación de cobertura de salud</li>
            </ul>
            <p className="mt-4">No vendemos datos personales a terceros sin su consentimiento explícito.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Seguridad de Datos</h2>
            <p>
              Implementamos medidas técnicas y organizativas para proteger sus datos, incluyendo cifrado SSL/TLS, acceso restringido, auditorías de seguridad regulares y monitoreo de actividades anómalas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies</h2>
            <p>
              Nuestro sitio web utiliza cookies técnicas y de análisis. Por favor, consulte nuestra Política de Cookies para más información.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Derechos del Usuario</h2>
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Acceso:</strong> Solicitar qué datos poseemos sobre usted</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
              <li><strong>Eliminación:</strong> Solicitar la supresión de datos (bajo ciertas condiciones)</li>
              <li><strong>Limitación:</strong> Restringir el procesamiento de datos</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
              <li><strong>Objeción:</strong> Oponerse a ciertos tipos de procesamiento</li>
            </ul>
            <p className="mt-4">Para ejercer estos derechos, contacte a <strong>contacto@vitalseguros.com</strong></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Retención de Datos</h2>
            <p>
              Mantenemos datos personales durante el período necesario para prestar servicios de seguros (mínimo 7 años según regulaciones ecuatorianas de seguros), a menos que la ley requiera mantenerlos más tiempo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política en cualquier momento. Los cambios significativos serán notificados mediante email o aviso prominente en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Contacto</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <p><strong>Vital Seguros</strong></p>
              <p>Email: contacto@vitalseguros.com</p>
              <p>WhatsApp: +593 99 545 1814</p>
              <p>Ubicación: Quito, Ecuador</p>
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
