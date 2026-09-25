/**
 * academyCourses.ts — Catálogo curricular de la Academia VitalSeguros
 * 3 Tracks × 4 Submódulos = 12 Lecciones
 * Cada lección incluye: teoría, key takeaways, quiz rápido y examen oficial.
 */

// ─── Tipos ───────────────────────────────────────────────

export type CourseLevel = "comercial" | "tecnico";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  id: string;               // 'l1', 'l2', 'l3', 'l4'
  title: string;
  level: CourseLevel;
  durationMinutes: number;
  theoryHtml: string;        // Contenido teórico en HTML
  keyTakeaways: string[];    // Puntos clave
  simulatorConfig?: {
    type: "calculator" | "scenario";
    title: string;
    description: string;
    fields: { label: string; placeholder: string; defaultValue: string; unit: string }[];
    formula?: string;
  };
  quickCheck: QuizQuestion[];      // 3 preguntas de autoevaluación
  examQuestions: QuizQuestion[];   // 5 preguntas de examen oficial
}

export interface AcademyTrack {
  id: string;                // 'vida', 'salud', 'ventas'
  code: string;              // 'VIDA-001', 'SALUD-001', 'VENTAS-001'
  title: string;
  shortTitle: string;
  category: string;
  iconName: string;          // Lucide icon name
  badge: string;
  description: string;
  targetAudience: string;
  totalDurationHours: number;
  commissionRate: string;
  lessons: LessonContent[];
}

// ─── Catálogo de Tracks ──────────────────────────────────

export const ACADEMY_TRACKS: AcademyTrack[] = [
  // ═══════════════════════════════════════════════════════
  // TRACK 1: SEGUROS DE VIDA & BLINDAJE PATRIMONIAL
  // ═══════════════════════════════════════════════════════
  {
    id: "vida",
    code: "VIDA-001",
    title: "Certificación en Seguros de Vida & Blindaje Patrimonial",
    shortTitle: "Vida & Blindaje",
    category: "Ramo Estrella",
    iconName: "ShieldCheck",
    badge: "Alta Rentabilidad",
    description: "Domina la venta consultiva del producto más rentable del mercado asegurador ecuatoriano. Aprende a estructurar planes de ahorro, seguros de vida con componente de inversión y blindaje patrimonial familiar.",
    targetAudience: "Asesores comerciales nuevos y experimentados que buscan maximizar sus ganancias con el producto de mayor ticket promedio.",
    totalDurationHours: 16,
    commissionRate: "Variable",
    lessons: [
      {
        id: "l1",
        title: "Psicología del Blindaje Familiar y Análisis de Necesidades",
        level: "comercial",
        durationMinutes: 45,
        theoryHtml: `
          <h3>¿Por qué la gente NO compra seguros de vida?</h3>
          <p>El principal enemigo del asesor no es la competencia: es la <strong>procrastinación del cliente</strong>. El 78% de los ecuatorianos sabe que necesita un seguro de vida pero lo posterga indefinidamente. Tu trabajo no es vender una póliza, sino <strong>despertar la urgencia emocional</strong> del blindaje familiar.</p>
          
          <h3>El Marco SPIN para Seguros de Vida</h3>
          <p>Adaptamos la metodología SPIN Selling al contexto asegurador ecuatoriano:</p>
          <ul>
            <li><strong>Situación:</strong> "¿Cuántas personas dependen económicamente de usted?" / "¿Tiene hipoteca activa?"</li>
            <li><strong>Problema:</strong> "Si mañana no pudiera trabajar, ¿cuántos meses podría su familia mantener el mismo nivel de vida?"</li>
            <li><strong>Implicación:</strong> "¿Ha considerado que el promedio de ahorro de emergencia en Ecuador cubre solo 2.3 meses de gastos?"</li>
            <li><strong>Necesidad-Beneficio:</strong> "¿Qué significaría para usted saber que su familia tiene 10 años de ingresos garantizados sin importar qué pase?"</li>
          </ul>
          
          <h3>Los 5 Perfiles de Cliente de Vida</h3>
          <ol>
            <li><strong>El Padre Proveedor (35-50 años):</strong> Hipoteca + hijos en edad escolar. Motivador: protección de patrimonio.</li>
            <li><strong>El Emprendedor (30-45 años):</strong> Persona clave en su empresa. Motivador: continuidad del negocio.</li>
            <li><strong>El Planificador de Retiro (45-60 años):</strong> Busca ahorro garantizado. Motivador: independencia financiera.</li>
            <li><strong>La Pareja Joven (25-35 años):</strong> Primer crédito hipotecario. Motivador: requisito bancario + protección.</li>
            <li><strong>El Heredero Estratégico (50+ años):</strong> Planificación sucesoria. Motivador: eficiencia fiscal.</li>
          </ol>
        `,
        keyTakeaways: [
          "El 78% de ecuatorianos posterga la compra de seguros de vida — tu trabajo es crear urgencia emocional",
          "La metodología SPIN (Situación-Problema-Implicación-Necesidad) es la más efectiva para venta consultiva",
          "Existen 5 perfiles de cliente de vida, cada uno con motivadores y objeciones distintas",
          "Nunca vendas una póliza: vende la tranquilidad de 10 años de ingresos garantizados"
        ],
        simulatorConfig: {
          type: "calculator",
          title: "Calculadora de Necesidad de Cobertura",
          description: "Calcula cuánta cobertura necesita tu prospecto basándote en sus gastos mensuales y dependientes.",
          fields: [
            { label: "Ingreso mensual familiar", placeholder: "3000", defaultValue: "3000", unit: "USD" },
            { label: "Años de protección deseados", placeholder: "10", defaultValue: "10", unit: "años" },
            { label: "Deudas pendientes (hipoteca, auto)", placeholder: "50000", defaultValue: "50000", unit: "USD" },
            { label: "Fondo educativo por hijo", placeholder: "25000", defaultValue: "25000", unit: "USD" },
            { label: "Número de hijos", placeholder: "2", defaultValue: "2", unit: "" }
          ],
          formula: "(ingresoMensual * 12 * añosProtección) + deudas + (fondoEducativo * numHijos)"
        },
        quickCheck: [
          {
            id: "qc-vida-1-1",
            question: "¿Cuál es el principal enemigo del asesor de seguros de vida según el módulo?",
            options: ["La competencia de otras aseguradoras", "La procrastinación del cliente", "Los precios altos de las primas", "La falta de regulación"],
            correctIndex: 1,
            explanation: "El 78% de los ecuatorianos sabe que necesita un seguro pero lo posterga. La procrastinación, no la competencia, es el principal obstáculo."
          },
          {
            id: "qc-vida-1-2",
            question: "En la metodología SPIN, ¿qué tipo de pregunta es '¿Cuántos meses podría su familia mantener su nivel de vida sin sus ingresos?'",
            options: ["Situación", "Problema", "Implicación", "Necesidad-Beneficio"],
            correctIndex: 1,
            explanation: "Es una pregunta de Problema porque busca que el cliente reconozca una vulnerabilidad concreta en su situación actual."
          },
          {
            id: "qc-vida-1-3",
            question: "¿Cuál es el perfil de cliente que compra seguros principalmente por requisito bancario?",
            options: ["El Emprendedor", "El Planificador de Retiro", "La Pareja Joven", "El Heredero Estratégico"],
            correctIndex: 2,
            explanation: "La Pareja Joven (25-35 años) suele comprar su primer seguro de vida como requisito para el crédito hipotecario."
          }
        ],
        examQuestions: [
          {
            id: "ex-vida-1-1",
            question: "Un prospecto de 40 años con ingresos de $4,000 USD mensuales, hipoteca de $80,000 y 2 hijos quiere protección de 10 años. ¿Cuál es la cobertura mínima recomendada?",
            options: ["$480,000 USD", "$560,000 USD", "$610,000 USD", "$640,000 USD"],
            correctIndex: 2,
            explanation: "($4,000 × 12 × 10) + $80,000 + ($25,000 × 2) = $480,000 + $80,000 + $50,000 = $610,000 USD"
          },
          {
            id: "ex-vida-1-2",
            question: "¿Qué pregunta SPIN es más efectiva para un emprendedor que dice 'mi negocio puede funcionar sin mí'?",
            options: ["¿Cuántos empleados tiene? (Situación)", "¿Quién toma las decisiones clave en su ausencia? (Problema)", "¿Ha calculado cuánto costaría reemplazar su expertise? (Implicación)", "¿Le gustaría saber que su empresa sobreviviría? (Necesidad)"],
            correctIndex: 2,
            explanation: "La pregunta de Implicación es la más poderosa porque fuerza al prospecto a cuantificar el costo real de su ausencia."
          },
          {
            id: "ex-vida-1-3",
            question: "¿Cuál es el motivador principal del perfil 'Heredero Estratégico'?",
            options: ["Proteger a hijos pequeños", "Requisito de crédito bancario", "Eficiencia fiscal y planificación sucesoria", "Continuidad del negocio"],
            correctIndex: 2,
            explanation: "El Heredero Estratégico (50+ años) busca optimizar la transmisión de patrimonio con eficiencia fiscal."
          },
          {
            id: "ex-vida-1-4",
            question: "Según las estadísticas del módulo, ¿cuántos meses de gastos cubre el ahorro de emergencia promedio en Ecuador?",
            options: ["1.5 meses", "2.3 meses", "3.8 meses", "5 meses"],
            correctIndex: 1,
            explanation: "El promedio de ahorro de emergencia en Ecuador cubre solo 2.3 meses de gastos familiares."
          },
          {
            id: "ex-vida-1-5",
            question: "¿Qué porcentaje de ecuatorianos posterga la compra de seguros de vida?",
            options: ["45%", "62%", "78%", "85%"],
            correctIndex: 2,
            explanation: "El 78% de los ecuatorianos sabe que necesita un seguro de vida pero lo posterga indefinidamente."
          }
        ]
      },
      {
        id: "l2",
        title: "Matemática Actuarial Aplicada y Proyecciones de Ahorro",
        level: "tecnico",
        durationMinutes: 60,
        theoryHtml: `
          <h3>Cómo se calcula una prima de seguro de vida</h3>
          <p>La prima de un seguro de vida depende de 4 factores clave que todo asesor debe dominar para explicar y justificar el precio al cliente:</p>
          <ul>
            <li><strong>Edad del asegurado:</strong> A mayor edad, mayor probabilidad de siniestro y mayor prima. La tabla de mortalidad CSO 2017 es la referencia estándar.</li>
            <li><strong>Suma asegurada:</strong> El monto de cobertura solicitado. A mayor cobertura, mayor prima proporcional.</li>
            <li><strong>Plazo de la póliza:</strong> Temporal (10, 20, 30 años) vs Vitalicia. La temporal es más económica.</li>
            <li><strong>Estado de salud:</strong> Fumador vs No fumador, enfermedades preexistentes, IMC, historial familiar.</li>
          </ul>
          
          <h3>Fórmula Simplificada de Prima Anual</h3>
          <p>Para efectos comerciales (no actuariales exactos), la fórmula de estimación rápida es:</p>
          <p><strong>Prima Anual ≈ (Suma Asegurada × Tasa por Millar según Edad) + Gastos de Emisión + IVA</strong></p>
          <p>Ejemplo: Hombre de 35 años, no fumador, $500,000 de cobertura:</p>
          <ul>
            <li>Tasa por millar (edad 35, no fumador): $1.20 por cada $1,000</li>
            <li>Prima base: 500 × $1.20 = $600 USD/año</li>
            <li>Gastos de emisión (3.5%): $21</li>
            <li>Subtotal: $621</li>
            <li>IVA (15%): $93.15</li>
            <li><strong>Prima Anual Total: $714.15 USD</strong></li>
          </ul>
          
          <h3>Componente de Ahorro (Vida con Inversión)</h3>
          <p>Los seguros de vida con componente de ahorro (Universal Life) destinan una porción de la prima a un fondo de inversión:</p>
          <ul>
            <li><strong>Costo del seguro (mortalidad):</strong> ~40% de la prima</li>
            <li><strong>Gastos administrativos:</strong> ~15%</li>
            <li><strong>Fondo de ahorro/inversión:</strong> ~45% de la prima</li>
          </ul>
          <p>A 20 años con rendimiento promedio del 4% anual, un aporte de $3,000/año genera un fondo de retiro de aproximadamente <strong>$89,000 USD</strong>.</p>
        `,
        keyTakeaways: [
          "La prima de vida depende de 4 factores: edad, suma asegurada, plazo y estado de salud",
          "Fórmula rápida: Prima ≈ (Suma × Tasa por Millar) + Gastos Emisión + IVA (15%)",
          "En seguros Universal Life, ~45% de la prima va al fondo de ahorro/inversión",
          "A 20 años con 4% de rendimiento, $3,000/año genera ~$89,000 USD de fondo de retiro"
        ],
        simulatorConfig: {
          type: "calculator",
          title: "Cotizador Rápido de Seguro de Vida",
          description: "Estima la prima anual según edad, cobertura y perfil del cliente.",
          fields: [
            { label: "Edad del asegurado", placeholder: "35", defaultValue: "35", unit: "años" },
            { label: "Suma asegurada", placeholder: "500000", defaultValue: "500000", unit: "USD" },
            { label: "¿Fumador? (0=No, 1=Sí)", placeholder: "0", defaultValue: "0", unit: "" },
            { label: "Plazo de la póliza", placeholder: "20", defaultValue: "20", unit: "años" }
          ],
          formula: "Prima = (sumaAsegurada/1000) × tasaPorMillar × (1 + fumador×0.4) × 1.035 × 1.15"
        },
        quickCheck: [
          {
            id: "qc-vida-2-1",
            question: "¿Cuáles son los 4 factores que determinan la prima de un seguro de vida?",
            options: ["Edad, género, ingresos y profesión", "Edad, suma asegurada, plazo y estado de salud", "Cobertura, deducible, copago y prima", "Mortalidad, morbilidad, inversión y gastos"],
            correctIndex: 1,
            explanation: "Los 4 factores clave son: edad del asegurado, suma asegurada, plazo de la póliza y estado de salud."
          },
          {
            id: "qc-vida-2-2",
            question: "En un seguro Universal Life, ¿qué porcentaje aproximado de la prima se destina al fondo de ahorro?",
            options: ["15%", "25%", "45%", "60%"],
            correctIndex: 2,
            explanation: "Aproximadamente el 45% de la prima se destina al componente de ahorro/inversión."
          },
          {
            id: "qc-vida-2-3",
            question: "¿Cuál es la tasa de IVA que se aplica a las primas de seguros en Ecuador?",
            options: ["0%", "12%", "15%", "No aplica IVA"],
            correctIndex: 2,
            explanation: "El IVA vigente en Ecuador es del 15% y se aplica sobre la prima más los gastos de emisión."
          }
        ],
        examQuestions: [
          {
            id: "ex-vida-2-1",
            question: "Calcula la prima anual aproximada para una mujer de 40 años, no fumadora, con cobertura de $300,000 USD (tasa por millar edad 40: $1.80):",
            options: ["$540.00 USD", "$558.90 USD", "$621.00 USD", "$642.74 USD"],
            correctIndex: 3,
            explanation: "Prima base: 300 × $1.80 = $540. Gastos (3.5%): $18.90. Subtotal: $558.90. IVA (15%): $83.84. Total: $642.74 USD"
          },
          {
            id: "ex-vida-2-2",
            question: "¿Cuánto genera un fondo de retiro a 20 años con aporte de $3,000/año y rendimiento del 4% anual?",
            options: ["$60,000 USD", "$72,000 USD", "$89,000 USD", "$105,000 USD"],
            correctIndex: 2,
            explanation: "Con interés compuesto al 4% anual durante 20 años, $3,000/año genera aproximadamente $89,000 USD."
          },
          {
            id: "ex-vida-2-3",
            question: "Un fumador de 35 años paga un recargo aproximado de ¿cuánto más respecto a un no fumador?",
            options: ["10%", "20%", "40%", "60%"],
            correctIndex: 2,
            explanation: "El recargo estándar por tabaquismo es de aproximadamente 40% sobre la prima base."
          },
          {
            id: "ex-vida-2-4",
            question: "En la distribución de la prima de un seguro Universal Life, ¿qué porcentaje se destina a gastos administrativos?",
            options: ["5%", "10%", "15%", "20%"],
            correctIndex: 2,
            explanation: "Aproximadamente el 15% de la prima se destina a gastos administrativos de la aseguradora."
          },
          {
            id: "ex-vida-2-5",
            question: "¿Qué tabla de mortalidad se menciona como referencia estándar?",
            options: ["OMS 2020", "CSO 2017", "NAIC 2015", "SSN Ecuador 2022"],
            correctIndex: 1,
            explanation: "La tabla de mortalidad CSO 2017 (Commissioners Standard Ordinary) es la referencia estándar del sector."
          }
        ]
      },
      {
        id: "l3",
        title: "Técnicas de Cierre Consultivo y las 7 Objeciones Frecuentes",
        level: "comercial",
        durationMinutes: 50,
        theoryHtml: `
          <h3>El Arte del Cierre en Seguros de Vida</h3>
          <p>El cierre no es un momento — es un <strong>proceso que empieza desde la primera pregunta SPIN</strong>. Si hiciste bien el descubrimiento, el cierre es una formalidad natural.</p>
          
          <h3>Las 7 Objeciones Más Frecuentes y Cómo Neutralizarlas</h3>
          <ol>
            <li><strong>"Es muy caro"</strong> → "Entiendo. ¿Cuánto le cuesta actualmente NO tener protección? Si su familia necesitara $500,000 mañana, ¿de dónde saldrían?"</li>
            <li><strong>"Lo voy a pensar"</strong> → "Perfecto. ¿Qué información adicional necesita para tomar la decisión? Le pregunto porque las condiciones de salud actuales pueden cambiar."</li>
            <li><strong>"Tengo un amigo que vende seguros"</strong> → "Excelente. ¿Su amigo le ha hecho un análisis de necesidades personalizado como el que acabamos de hacer?"</li>
            <li><strong>"No creo en los seguros"</strong> → "Es comprensible. ¿Me permite compartirle 3 casos reales de familias ecuatorianas que recibieron el beneficio?"</li>
            <li><strong>"Soy joven, no lo necesito"</strong> → "Precisamente por eso. A los 28 años la prima es 3 veces menor que a los 45. ¿Prefiere pagarlo ahora o triplicar el costo después?"</li>
            <li><strong>"Ya tengo seguro del trabajo"</strong> → "Perfecto. ¿Sabía que el seguro corporativo se pierde al cambiar de empleo? ¿Cuál es su plan B?"</li>
            <li><strong>"Mi esposa no está de acuerdo"</strong> → "La invito a que participe en nuestra siguiente conversación. Normalmente, cuando la pareja entiende los beneficios, es la primera en querer firmar."</li>
          </ol>
          
          <h3>3 Técnicas de Cierre Probadas</h3>
          <ul>
            <li><strong>Cierre por Alternativa:</strong> "¿Prefiere la cobertura de $300,000 o la de $500,000?" (nunca preguntar SI quiere, sino CUÁL quiere).</li>
            <li><strong>Cierre por Urgencia Legítima:</strong> "Las condiciones médicas que aprueba hoy la aseguradora pueden no aprobarse mañana si hay un hallazgo en los exámenes."</li>
            <li><strong>Cierre por Referencia Social:</strong> "El 85% de nuestros clientes en su rango de edad eligen la cobertura de $500,000. ¿Le gustaría la misma protección?"</li>
          </ul>
        `,
        keyTakeaways: [
          "El cierre empieza desde la primera pregunta de descubrimiento, no al final",
          "Las 7 objeciones más frecuentes tienen respuestas específicas y probadas",
          "Nunca preguntar SI quiere comprar — usar el cierre por alternativa (¿cuál prefiere?)",
          "La urgencia legítima médica es la técnica más poderosa en seguros de vida"
        ],
        quickCheck: [
          {
            id: "qc-vida-3-1",
            question: "¿Cuál es la respuesta correcta ante la objeción 'Soy joven, no lo necesito'?",
            options: ["Descartarlo como prospecto", "Explicar que a los 28 la prima es 3 veces menor que a los 45", "Ofrecer un descuento especial", "Decirle que todos los jóvenes dicen lo mismo"],
            correctIndex: 1,
            explanation: "Se neutraliza con el argumento del costo: la prima a los 28 es hasta 3 veces menor que a los 45 años."
          },
          {
            id: "qc-vida-3-2",
            question: "¿En qué consiste el 'Cierre por Alternativa'?",
            options: ["Ofrecer un producto diferente", "Preguntar CUÁL cobertura prefiere en lugar de SI quiere comprar", "Comparar con la competencia", "Dar varias fechas de pago"],
            correctIndex: 1,
            explanation: "El cierre por alternativa elimina la opción de 'no' al ofrecer dos opciones válidas."
          },
          {
            id: "qc-vida-3-3",
            question: "Ante la objeción 'Ya tengo seguro del trabajo', ¿cuál es el contraargumento clave?",
            options: ["Que los seguros corporativos son malos", "Que el seguro corporativo se pierde al cambiar de empleo", "Que es más barato el individual", "Que no cubre a la familia"],
            correctIndex: 1,
            explanation: "El seguro corporativo está vinculado al empleo — al cambiar o perder el trabajo, se pierde la cobertura."
          }
        ],
        examQuestions: [
          {
            id: "ex-vida-3-1",
            question: "Un prospecto dice 'Lo voy a pensar'. ¿Cuál es la respuesta más efectiva?",
            options: ["'Está bien, llámeme cuando decida'", "'Le doy una semana para decidir'", "'¿Qué información adicional necesita? Las condiciones de salud pueden cambiar'", "'Le ofrezco un 10% de descuento si firma hoy'"],
            correctIndex: 2,
            explanation: "La respuesta correcta identifica la información faltante y crea urgencia legítima con las condiciones médicas."
          },
          {
            id: "ex-vida-3-2",
            question: "¿Cuál técnica de cierre usa la frase 'El 85% de nuestros clientes eligen la cobertura de $500,000'?",
            options: ["Cierre por Alternativa", "Cierre por Urgencia", "Cierre por Referencia Social", "Cierre por Descuento"],
            correctIndex: 2,
            explanation: "El Cierre por Referencia Social aprovecha la prueba social para validar la decisión del prospecto."
          },
          {
            id: "ex-vida-3-3",
            question: "Según el módulo, ¿cuándo empieza realmente el proceso de cierre?",
            options: ["Al presentar la cotización", "Desde la primera pregunta de descubrimiento", "Al entregar la propuesta formal", "Cuando el cliente dice que está interesado"],
            correctIndex: 1,
            explanation: "El cierre es un proceso que empieza desde la primera pregunta SPIN, no un momento puntual."
          },
          {
            id: "ex-vida-3-4",
            question: "Ante 'Mi esposa no está de acuerdo', ¿cuál es la estrategia?",
            options: ["Ofrecer más descuento", "Invitar a la esposa a participar en la siguiente conversación", "Insistir con el prospecto solo", "Abandonar la venta"],
            correctIndex: 1,
            explanation: "La estrategia es incluir a la pareja en el proceso: cuando entiende los beneficios, suele ser la primera en querer firmar."
          },
          {
            id: "ex-vida-3-5",
            question: "¿Cuántas objeciones frecuentes se enseñan en este módulo?",
            options: ["3", "5", "7", "10"],
            correctIndex: 2,
            explanation: "El módulo enseña las 7 objeciones más frecuentes en la venta de seguros de vida con respuestas específicas."
          }
        ]
      },
      {
        id: "l4",
        title: "Fidelización, Renovaciones y Construcción de Cartera Vitalicia",
        level: "comercial",
        durationMinutes: 40,
        theoryHtml: `
          <h3>Tu Verdadero Negocio: Las Renovaciones</h3>
          <p>Un asesor novato piensa que su ingreso viene de la venta inicial. Un asesor profesional sabe que <strong>el 80% de sus ingresos a 5 años viene de las renovaciones</strong>. Cada póliza renovada genera comisión anual sin esfuerzo adicional de venta.</p>
          
          <h3>El Protocolo de 12 Toques Anuales</h3>
          <p>Para mantener al cliente activo y evitar cancelaciones, implementa al menos 12 contactos al año:</p>
          <ul>
            <li><strong>Mes 1:</strong> Bienvenida + entrega de póliza explicada</li>
            <li><strong>Mes 2:</strong> Revisión de beneficiarios</li>
            <li><strong>Mes 3:</strong> Artículo educativo sobre protección familiar</li>
            <li><strong>Mes 4:</strong> Felicitación de cumpleaños del asegurado</li>
            <li><strong>Mes 5:</strong> Revisión de coberturas adicionales</li>
            <li><strong>Mes 6:</strong> Check-in semestral + actualización de datos</li>
            <li><strong>Mes 7:</strong> Invitación a webinar de educación financiera</li>
            <li><strong>Mes 8:</strong> Solicitud de referidos</li>
            <li><strong>Mes 9:</strong> Actualización de productos nuevos</li>
            <li><strong>Mes 10:</strong> Revisión pre-renovación</li>
            <li><strong>Mes 11:</strong> Preparación de renovación con mejoras</li>
            <li><strong>Mes 12:</strong> Renovación + upgrade de cobertura</li>
          </ul>
          
          <h3>La Matemática de la Cartera Vitalicia</h3>
          <p>Si colocas <strong>3 pólizas de vida por mes</strong> con prima promedio de $3,000 USD y tu comisión como asesor:</p>
          <ul>
            <li><strong>Año 1:</strong> 36 pólizas × $3,000 = Construcción de Base Sólida</li>
            <li><strong>Año 2:</strong> 36 nuevas + 33 renovaciones (90% retención)</li>
            <li><strong>Año 3:</strong> 36 nuevas + 63 renovaciones</li>
            <li><strong>Año 5:</strong> Con efecto bola de nieve: Crecimiento exponencial de tu cartera</li>
          </ul>
        `,
        keyTakeaways: [
          "El 80% de los ingresos a 5 años proviene de renovaciones, no de ventas nuevas",
          "Implementar el protocolo de 12 toques anuales reduce cancelaciones al mínimo",
          "Con 3 pólizas/mes y 90% de retención, llegas a $280,000+ USD anuales en el año 5",
          "Solicitar referidos en el mes 8 es el momento óptimo (relación consolidada)"
        ],
        quickCheck: [
          {
            id: "qc-vida-4-1",
            question: "¿Qué porcentaje de ingresos a 5 años proviene de renovaciones?",
            options: ["30%", "50%", "65%", "80%"],
            correctIndex: 3,
            explanation: "El 80% de los ingresos a largo plazo viene de renovaciones, no de ventas nuevas."
          },
          {
            id: "qc-vida-4-2",
            question: "¿Cuántos contactos mínimos al año recomienda el protocolo de fidelización?",
            options: ["4", "6", "8", "12"],
            correctIndex: 3,
            explanation: "El Protocolo de 12 Toques Anuales establece al menos 1 contacto por mes."
          },
          {
            id: "qc-vida-4-3",
            question: "¿En qué mes del protocolo se recomienda solicitar referidos?",
            options: ["Mes 2", "Mes 5", "Mes 8", "Mes 12"],
            correctIndex: 2,
            explanation: "El mes 8 es el momento óptimo para referidos: la relación ya está consolidada."
          }
        ],
        examQuestions: [
          {
            id: "ex-vida-4-1",
            question: "Con 3 pólizas/mes × $3,000 prima, ¿qué sucede en tu cartera al Año 1?",
            options: ["Generas 12 renovaciones", "Construyes una base de 36 clientes activos", "Retienes el 50% de la cartera", "El cliente cancela al segundo mes"],
            correctIndex: 1,
            explanation: "3 pólizas por mes te permiten construir una base sólida de 36 clientes activos al primer año."
          },
          {
            id: "ex-vida-4-2",
            question: "¿Cuál es la tasa de retención de clientes objetivo mencionada en el módulo?",
            options: ["70%", "80%", "90%", "95%"],
            correctIndex: 2,
            explanation: "La tasa objetivo de retención es del 90%, lo que maximiza el efecto bola de nieve."
          },
          {
            id: "ex-vida-4-3",
            question: "¿Qué actividad se realiza en el Mes 6 del protocolo?",
            options: ["Felicitación de cumpleaños", "Check-in semestral + actualización de datos", "Solicitud de referidos", "Preparación de renovación"],
            correctIndex: 1,
            explanation: "El Mes 6 es el check-in semestral con actualización de datos del asegurado."
          },
          {
            id: "ex-vida-4-4",
            question: "¿Cuánto puede generar un asesor al Año 5 con el efecto bola de nieve de renovaciones?",
            options: ["$150,000 USD", "$200,000 USD", "$280,000+ USD", "$350,000 USD"],
            correctIndex: 2,
            explanation: "Con el efecto acumulativo de 3 pólizas/mes y 90% retención, se alcanza $280,000+ USD anuales."
          },
          {
            id: "ex-vida-4-5",
            question: "¿Qué debe hacer un asesor profesional en el Mes 11?",
            options: ["Enviar artículo educativo", "Preparar renovación con mejoras", "Revisar beneficiarios", "Invitar a webinar"],
            correctIndex: 1,
            explanation: "El Mes 11 es para preparar la renovación con propuestas de upgrade de cobertura."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // TRACK 2: SEGUROS MÉDICOS & COBERTURA INTERNACIONAL
  // ═══════════════════════════════════════════════════════
  {
    id: "salud",
    code: "SALUD-001",
    title: "Especialización en Seguros Médicos & Cobertura Internacional",
    shortTitle: "Salud & Médico",
    category: "Alta Demanda",
    iconName: "HeartPulse",
    badge: "Renovación Automática",
    description: "Conviértete en experto en planes médicos VIP, cobertura hospitalaria, maternidad, enfermedades graves y asistencia médica internacional. Un ramo con renovaciones automáticas y clientes de por vida.",
    targetAudience: "Asesores que buscan construir una cartera de alta retención con productos de renovación anual automática.",
    totalDurationHours: 12,
    commissionRate: "Variable",
    lessons: [
      {
        id: "l1",
        title: "Anatomía de una Póliza Médica: Deducibles, Copagos y Redes",
        level: "tecnico",
        durationMinutes: 50,
        theoryHtml: `
          <h3>Componentes de una Póliza de Salud</h3>
          <p>Todo asesor debe dominar estos 6 conceptos para explicarle al cliente exactamente qué está comprando:</p>
          <ul>
            <li><strong>Prima:</strong> Lo que el cliente paga anual o mensualmente por mantener activa su cobertura.</li>
            <li><strong>Deducible:</strong> El monto que el asegurado paga de su bolsillo antes de que la aseguradora empiece a cubrir. Rango típico: $500 a $5,000 USD.</li>
            <li><strong>Copago:</strong> El porcentaje que paga el asegurado después de superar el deducible. Generalmente 20% asegurado / 80% aseguradora.</li>
            <li><strong>Coaseguro Máximo (Stop Loss):</strong> El tope anual de copago del asegurado. Una vez alcanzado, la aseguradora cubre el 100%.</li>
            <li><strong>Límite Máximo de Cobertura:</strong> El tope total que pagará la aseguradora en un año. Varía de $100,000 a $5,000,000 USD.</li>
            <li><strong>Red Médica:</strong> Hospitales y clínicas con convenio directo. Dentro de red: atención sin desembolso previo. Fuera de red: reembolso parcial.</li>
          </ul>
          
          <h3>Ejemplo Práctico: Hospitalización de $25,000 USD</h3>
          <p>Póliza con deducible $1,000 y copago 80/20:</p>
          <ol>
            <li>Factura total: $25,000</li>
            <li>Deducible (paga el cliente): $1,000</li>
            <li>Monto sujeto a copago: $24,000</li>
            <li>Aseguradora paga 80%: $19,200</li>
            <li>Cliente paga 20%: $4,800</li>
            <li><strong>Total pagado por el cliente: $5,800</strong> (en vez de $25,000)</li>
          </ol>
        `,
        keyTakeaways: [
          "6 componentes clave: prima, deducible, copago, stop loss, límite máximo y red médica",
          "A mayor deducible, menor prima — pero mayor riesgo para el cliente",
          "El stop loss protege al asegurado de gastos catastróficos",
          "En una hospitalización de $25,000, un seguro con deducible $1,000 y copago 80/20 le ahorra al cliente $19,200"
        ],
        simulatorConfig: {
          type: "calculator",
          title: "Calculadora de Copago en Hospitalización",
          description: "Simula cuánto paga el cliente y cuánto cubre la aseguradora en un evento médico.",
          fields: [
            { label: "Factura médica total", placeholder: "25000", defaultValue: "25000", unit: "USD" },
            { label: "Deducible de la póliza", placeholder: "1000", defaultValue: "1000", unit: "USD" },
            { label: "Copago del asegurado", placeholder: "20", defaultValue: "20", unit: "%" },
            { label: "Stop Loss anual", placeholder: "10000", defaultValue: "10000", unit: "USD" }
          ],
          formula: "clientePaga = deducible + min((factura - deducible) × copago%, stopLoss)"
        },
        quickCheck: [
          { id: "qc-salud-1-1", question: "¿Qué es el deducible en un seguro médico?", options: ["El pago mensual de la póliza", "El monto que paga el asegurado antes de que la aseguradora cubra", "El porcentaje de copago", "El límite máximo de cobertura"], correctIndex: 1, explanation: "El deducible es el monto que paga el asegurado de su bolsillo antes de activar la cobertura." },
          { id: "qc-salud-1-2", question: "En un copago 80/20, ¿quién paga el 80%?", options: ["El asegurado", "La aseguradora", "El hospital", "El corredor"], correctIndex: 1, explanation: "En un copago 80/20, la aseguradora paga el 80% y el asegurado el 20% restante." },
          { id: "qc-salud-1-3", question: "¿Qué es el Stop Loss?", options: ["El deducible máximo", "El tope anual de copago del asegurado", "La prima máxima", "El límite de la red médica"], correctIndex: 1, explanation: "El Stop Loss es el tope anual de copago. Una vez alcanzado, la aseguradora cubre el 100%." }
        ],
        examQuestions: [
          { id: "ex-salud-1-1", question: "Factura de $50,000, deducible $2,000, copago 80/20. ¿Cuánto paga el cliente?", options: ["$9,600", "$11,600", "$12,000", "$15,000"], correctIndex: 1, explanation: "Deducible: $2,000 + Copago 20% de $48,000 = $9,600. Total: $11,600" },
          { id: "ex-salud-1-2", question: "¿Cuál es el rango típico de deducibles en Ecuador?", options: ["$100 - $500", "$500 - $5,000", "$1,000 - $10,000", "$5,000 - $25,000"], correctIndex: 1, explanation: "El rango típico de deducibles en el mercado ecuatoriano es de $500 a $5,000 USD." },
          { id: "ex-salud-1-3", question: "¿Qué ventaja tiene atenderse dentro de la red médica?", options: ["Prima más baja", "Atención sin desembolso previo", "Deducible cero", "Copago cero"], correctIndex: 1, explanation: "Dentro de red, el paciente recibe atención directa sin desembolso previo; la aseguradora paga al hospital directamente." },
          { id: "ex-salud-1-4", question: "¿Cuál es el rango de límites máximos de cobertura mencionado?", options: ["$50,000 - $500,000", "$100,000 - $5,000,000", "$250,000 - $2,000,000", "$1,000,000 - $10,000,000"], correctIndex: 1, explanation: "Los límites máximos varían de $100,000 a $5,000,000 USD dependiendo del plan." },
          { id: "ex-salud-1-5", question: "En el ejemplo práctico, ¿cuánto ahorra el cliente con su seguro en una hospitalización de $25,000?", options: ["$15,200", "$19,200", "$20,000", "$23,000"], correctIndex: 1, explanation: "El cliente pagó $5,800 de $25,000, ahorrando $19,200 gracias a su seguro." }
        ]
      },
      {
        id: "l2",
        title: "Planes Individuales vs Corporativos: Cotización y Comparativas",
        level: "comercial",
        durationMinutes: 45,
        theoryHtml: `
          <h3>Mercado Individual vs Corporativo</h3>
          <p>El mercado de seguros médicos se divide en dos grandes segmentos con lógicas comerciales completamente diferentes:</p>
          
          <h3>Seguro Médico Individual/Familiar</h3>
          <ul>
            <li><strong>Suscripción:</strong> Requiere cuestionario de salud individual y posibles exámenes médicos</li>
            <li><strong>Preexistencias:</strong> Pueden excluirse o tener periodos de espera de 12-24 meses</li>
            <li><strong>Precio:</strong> Basado en edad, sexo y estado de salud de cada asegurado</li>
            <li><strong>Comisión asesor:</strong> Alta rentabilidad por póliza (renovable anualmente)</li>
            <li><strong>Ticket promedio:</strong> $1,500 - $4,500 USD/año por familia</li>
          </ul>
          
          <h3>Seguro Médico Corporativo/Grupal</h3>
          <ul>
            <li><strong>Suscripción:</strong> No requiere cuestionario individual si el grupo es ≥10 personas</li>
            <li><strong>Preexistencias:</strong> Cubiertas desde el día 1 (ventaja masiva para el empleado)</li>
            <li><strong>Precio:</strong> Basado en siniestralidad del grupo, edad promedio y tamaño</li>
            <li><strong>Comisión asesor:</strong> Alta rentabilidad por volumen total</li>
            <li><strong>Ticket promedio:</strong> $15,000 - $200,000 USD/año por empresa</li>
          </ul>
          
          <h3>¿Cuál conviene más al asesor?</h3>
          <p>La respuesta es <strong>ambos</strong>. Los corporativos dan volumen y flujo de caja; los individuales dan margen y estabilidad. La cartera ideal tiene 60% corporativo / 40% individual.</p>
        `,
        keyTakeaways: [
          "Individual: cuestionario médico obligatorio, preexistencias excluibles, rentabilidad por póliza",
          "Corporativo: sin cuestionario si ≥10 personas, preexistencias cubiertas, rentabilidad por volumen",
          "Cartera ideal: 60% corporativo (volumen) + 40% individual (margen)",
          "Ticket promedio corporativo: $15,000 - $200,000 USD/año vs individual: $1,500 - $4,500"
        ],
        quickCheck: [
          { id: "qc-salud-2-1", question: "¿Cuántas personas mínimo debe tener un grupo para no requerir cuestionario médico individual?", options: ["5", "10", "15", "20"], correctIndex: 1, explanation: "Los grupos de 10 o más personas no requieren cuestionario de salud individual." },
          { id: "qc-salud-2-2", question: "¿Cuál es la distribución ideal de cartera según el módulo?", options: ["80% individual / 20% corporativo", "60% corporativo / 40% individual", "50% / 50%", "70% individual / 30% corporativo"], correctIndex: 1, explanation: "La cartera ideal es 60% corporativo (volumen) + 40% individual (margen)." },
          { id: "qc-salud-2-3", question: "¿Cuál es la principal ventaja del seguro corporativo para el empleado?", options: ["Precio más bajo", "Preexistencias cubiertas desde el día 1", "Mayor cobertura", "Sin copago"], correctIndex: 1, explanation: "En seguros corporativos, las preexistencias se cubren desde el día 1 sin periodos de espera." }
        ],
        examQuestions: [
          { id: "ex-salud-2-1", question: "¿Cuál es el rango de comisión típica en seguros médicos individuales?", options: ["5-10%", "10-18%", "15-25%", "25-35%"], correctIndex: 2, explanation: "La comisión en seguros médicos individuales oscila entre 15% y 25% de la prima." },
          { id: "ex-salud-2-2", question: "¿Cuál es el ticket promedio anual de un seguro médico corporativo?", options: ["$5,000 - $15,000", "$15,000 - $200,000", "$50,000 - $500,000", "$100,000 - $1,000,000"], correctIndex: 1, explanation: "El ticket promedio corporativo va de $15,000 a $200,000 USD/año dependiendo del tamaño." },
          { id: "ex-salud-2-3", question: "¿Qué determina el precio del seguro corporativo?", options: ["Edad y sexo individual", "Siniestralidad del grupo, edad promedio y tamaño", "Solo el número de empleados", "El tipo de industria únicamente"], correctIndex: 1, explanation: "El precio se basa en la siniestralidad histórica del grupo, la edad promedio y el tamaño." },
          { id: "ex-salud-2-4", question: "¿Cuál es el período de espera típico para preexistencias en planes individuales?", options: ["3-6 meses", "6-12 meses", "12-24 meses", "No hay período"], correctIndex: 2, explanation: "Las preexistencias en planes individuales suelen tener periodos de espera de 12 a 24 meses." },
          { id: "ex-salud-2-5", question: "Un asesor que solo vende seguros individuales está perdiendo ¿qué ventaja de los corporativos?", options: ["Mayor comisión", "Volumen alto y flujo de caja predecible", "Mejor relación con el cliente", "Menor esfuerzo de venta"], correctIndex: 1, explanation: "Los corporativos aportan volumen alto y flujo de caja predecible, complementando el margen individual." }
        ]
      },
      {
        id: "l3",
        title: "Preexistencias, Períodos de Espera y Manejo de Reclamos",
        level: "tecnico",
        durationMinutes: 45,
        theoryHtml: `
          <h3>Preexistencias: El Tema Más Sensible</h3>
          <p>Las preexistencias son condiciones médicas diagnosticadas o tratadas <strong>antes</strong> de la fecha de inicio de la póliza. Es el tema que más conflictos genera entre clientes y aseguradoras, y el asesor debe manejarlo con total transparencia.</p>
          
          <h3>Clasificación de Preexistencias</h3>
          <ul>
            <li><strong>Declaradas y aceptadas:</strong> El asegurado las declaró en el cuestionario y la aseguradora las aceptó (con o sin exclusión).</li>
            <li><strong>Declaradas y excluidas:</strong> Aceptaron al cliente pero no cubren esa condición específica.</li>
            <li><strong>No declaradas:</strong> Si el asegurado ocultó información, la aseguradora puede <strong>anular la póliza y denegar reclamos</strong>.</li>
          </ul>
          
          <h3>Protocolo de Reclamo de Siniestro Médico</h3>
          <ol>
            <li><strong>Notificación inmediata:</strong> Informar a la aseguradora dentro de 24-72 horas según la póliza.</li>
            <li><strong>Documentación:</strong> Informe médico, factura detallada, recetas, resultados de exámenes.</li>
            <li><strong>Autorización previa:</strong> Para cirugías programadas, solicitar preautorización 48h antes.</li>
            <li><strong>Ajuste:</strong> La aseguradora revisa si el evento está cubierto y calcula el reembolso.</li>
            <li><strong>Pago:</strong> Dentro de red: pago directo al hospital. Fuera de red: reembolso en 15-30 días.</li>
          </ol>
          
          <h3>Tu Rol como Asesor en el Reclamo</h3>
          <p>El asesor que <strong>acompaña al cliente durante el siniestro</strong> asegura la renovación. El que desaparece, pierde al cliente. Tu protocolo debe ser:</p>
          <ul>
            <li>Contactar al cliente en las primeras 2 horas</li>
            <li>Ayudar con la documentación y comunicación con la aseguradora</li>
            <li>Hacer seguimiento diario hasta la resolución</li>
            <li>Comunicar el resultado con transparencia</li>
          </ul>
        `,
        keyTakeaways: [
          "Las preexistencias no declaradas pueden anular la póliza completa — siempre declarar TODO",
          "Protocolo de reclamo: notificación 24-72h, documentación, preautorización, ajuste y pago",
          "El asesor que acompaña durante el siniestro asegura la renovación",
          "Contactar al cliente en las primeras 2 horas de conocer el evento médico"
        ],
        quickCheck: [
          { id: "qc-salud-3-1", question: "¿Qué puede pasar si un asegurado no declara una preexistencia?", options: ["Paga un recargo", "La aseguradora puede anular la póliza y denegar reclamos", "Solo excluyen esa condición", "No pasa nada"], correctIndex: 1, explanation: "Las preexistencias no declaradas pueden llevar a la anulación de la póliza y denegación de reclamos." },
          { id: "qc-salud-3-2", question: "¿En cuánto tiempo debe notificarse un siniestro a la aseguradora?", options: ["1 semana", "24-72 horas", "30 días", "No hay plazo"], correctIndex: 1, explanation: "La notificación debe hacerse dentro de 24 a 72 horas según las condiciones de la póliza." },
          { id: "qc-salud-3-3", question: "¿En cuánto tiempo debe contactar el asesor al cliente tras un siniestro?", options: ["24 horas", "12 horas", "Primeras 2 horas", "1 semana"], correctIndex: 2, explanation: "El protocolo indica contactar al cliente en las primeras 2 horas del evento." }
        ],
        examQuestions: [
          { id: "ex-salud-3-1", question: "¿Cuáles son los 3 tipos de clasificación de preexistencias?", options: ["Leves, moderadas y graves", "Declaradas aceptadas, declaradas excluidas, no declaradas", "Crónicas, agudas y terminales", "Cubiertas, parciales y excluidas"], correctIndex: 1, explanation: "Se clasifican en: declaradas y aceptadas, declaradas y excluidas, y no declaradas." },
          { id: "ex-salud-3-2", question: "¿Con cuánta anticipación se debe solicitar preautorización para cirugía programada?", options: ["24 horas", "48 horas", "72 horas", "1 semana"], correctIndex: 1, explanation: "La preautorización para cirugías programadas debe solicitarse al menos 48 horas antes." },
          { id: "ex-salud-3-3", question: "¿En cuántos días se procesa un reembolso fuera de red?", options: ["5-10 días", "15-30 días", "30-60 días", "60-90 días"], correctIndex: 1, explanation: "Los reembolsos fuera de red tardan típicamente de 15 a 30 días." },
          { id: "ex-salud-3-4", question: "¿Cuál es la principal razón para acompañar al cliente durante un siniestro?", options: ["Cobrar la comisión más rápido", "Asegurar la renovación de la póliza", "Es requisito legal", "Para generar más ventas"], correctIndex: 1, explanation: "El asesor que acompaña durante el siniestro asegura la renovación y retención del cliente." },
          { id: "ex-salud-3-5", question: "¿Qué documentos se requieren para un reclamo médico?", options: ["Solo la factura", "Informe médico, factura detallada, recetas y resultados de exámenes", "Solo el formulario de reclamo", "Factura y cédula"], correctIndex: 1, explanation: "Se necesita informe médico, factura detallada, recetas y resultados de exámenes." }
        ]
      },
      {
        id: "l4",
        title: "Cobertura Internacional, Evacuación Médica y Productos Multinacionales",
        level: "tecnico",
        durationMinutes: 40,
        theoryHtml: `
          <h3>El Mercado Premium: Seguros Médicos Internacionales</h3>
          <p>Los seguros médicos internacionales son el producto de mayor ticket y prestigio. Cubren atención médica en cualquier parte del mundo, incluyendo EE.UU., y son solicitados por:</p>
          <ul>
            <li>Ejecutivos que viajan frecuentemente</li>
            <li>Familias expatriadas</li>
            <li>Empresarios con operaciones internacionales</li>
            <li>Personas que buscan acceso a hospitales de primer nivel mundial (Mayo Clinic, Johns Hopkins, etc.)</li>
          </ul>
          
          <h3>Coberturas Especiales de Planes Internacionales</h3>
          <ul>
            <li><strong>Evacuación médica:</strong> Traslado aéreo de emergencia al hospital más cercano con la especialidad requerida. Costo real: $50,000 - $250,000 USD.</li>
            <li><strong>Repatriación:</strong> Retorno al país de origen para tratamiento o en caso de fallecimiento.</li>
            <li><strong>Segunda opinión médica:</strong> Consulta con especialistas de renombre mundial.</li>
            <li><strong>Asistencia 24/7:</strong> Coordinación global en múltiples idiomas.</li>
          </ul>
          
          <h3>Principales Aseguradoras Internacionales</h3>
          <p>Las más reconocidas en el mercado ecuatoriano y latinoamericano:</p>
          <ul>
            <li><strong>BMI (Best Meridian Insurance):</strong> Fuerte en Latinoamérica, atención personalizada.</li>
            <li><strong>Bupa Global:</strong> Red premium mundial, excelente para expatriados.</li>
            <li><strong>Cigna Global:</strong> Cobertura amplia con opción EE.UU.</li>
            <li><strong>Allianz Care:</strong> Líder europeo con presencia global.</li>
          </ul>
          
          <h3>Tip de Venta para Internacionales</h3>
          <p>El argumento más poderoso: <strong>"¿Sabía que una evacuación médica aérea cuesta entre $50,000 y $250,000 USD? Su póliza internacional la cubre completamente."</strong></p>
        `,
        keyTakeaways: [
          "Los seguros internacionales son el producto de mayor ticket y prestigio del mercado",
          "Evacuación médica aérea: costo real $50,000 - $250,000 USD (cubierto por la póliza)",
          "Principales players: BMI, Bupa, Cigna, Allianz — cada uno con fortalezas diferentes",
          "Argumento de venta: el costo de UNA evacuación supera años de primas"
        ],
        quickCheck: [
          { id: "qc-salud-4-1", question: "¿Cuánto puede costar una evacuación médica aérea?", options: ["$5,000 - $15,000", "$15,000 - $50,000", "$50,000 - $250,000", "$250,000 - $500,000"], correctIndex: 2, explanation: "Una evacuación médica aérea puede costar entre $50,000 y $250,000 USD." },
          { id: "qc-salud-4-2", question: "¿Cuál aseguradora es especialmente fuerte en Latinoamérica?", options: ["Bupa Global", "BMI (Best Meridian Insurance)", "Cigna Global", "Allianz Care"], correctIndex: 1, explanation: "BMI (Best Meridian Insurance) tiene presencia fuerte y atención personalizada en Latinoamérica." },
          { id: "qc-salud-4-3", question: "¿Qué perfil de cliente busca seguros médicos internacionales?", options: ["Estudiantes universitarios", "Ejecutivos, expatriados y empresarios internacionales", "Jubilados exclusivamente", "Solo diplomáticos"], correctIndex: 1, explanation: "Los seguros internacionales son solicitados por ejecutivos viajeros, familias expatriadas y empresarios." }
        ],
        examQuestions: [
          { id: "ex-salud-4-1", question: "¿Qué cubre la 'repatriación' en un seguro internacional?", options: ["Viaje de vacaciones", "Retorno al país de origen para tratamiento o en caso de fallecimiento", "Traslado a un hospital local", "Regreso de equipaje perdido"], correctIndex: 1, explanation: "La repatriación cubre el retorno del asegurado a su país de origen para tratamiento o en caso de fallecimiento." },
          { id: "ex-salud-4-2", question: "¿Qué aseguradora es líder en el mercado europeo con presencia global?", options: ["BMI", "Bupa", "Cigna", "Allianz Care"], correctIndex: 3, explanation: "Allianz Care es el líder europeo con fuerte presencia global en seguros médicos internacionales." },
          { id: "ex-salud-4-3", question: "¿Cuál es el argumento de venta más poderoso para seguros internacionales?", options: ["El precio es competitivo", "El costo de una evacuación supera años de primas", "La red médica es más amplia", "No hay deducible"], correctIndex: 1, explanation: "El costo de una sola evacuación ($50,000-$250,000) supera varios años de primas, lo que justifica la inversión." },
          { id: "ex-salud-4-4", question: "¿Qué servicio incluyen los planes internacionales para consultar con especialistas de renombre?", options: ["Telemedicina básica", "Segunda opinión médica", "Consulta preventiva", "Chequeo anual"], correctIndex: 1, explanation: "Los planes internacionales incluyen segunda opinión médica con especialistas de talla mundial." },
          { id: "ex-salud-4-5", question: "¿Cuál es la principal ventaja de Bupa Global?", options: ["Precio más bajo", "Red premium mundial, excelente para expatriados", "Solo cubre Latinoamérica", "Especializada en cirugías"], correctIndex: 1, explanation: "Bupa Global se destaca por su red premium mundial y es especialmente buena para expatriados." }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // TRACK 3: PROSPECCIÓN DIGITAL & CRECIMIENTO
  // ═══════════════════════════════════════════════════════
  {
    id: "ventas",
    code: "VENTAS-001",
    title: "Masterclass de Prospección Digital & Crecimiento para Asesores",
    shortTitle: "Ventas & Digital",
    category: "Máquina de Ventas",
    iconName: "TrendingUp",
    badge: "100% Práctico",
    description: "Domina estrategias de prospección en frío por LinkedIn, anuncios segmentados en Meta y WhatsApp conversacional para llenar tu agenda con mínimo 10 cotizaciones semanales sin perseguir clientes.",
    targetAudience: "Asesores de cualquier ramo que necesitan generar prospectos calificados de forma predecible y escalable.",
    totalDurationHours: 8,
    commissionRate: "N/A",
    lessons: [
      {
        id: "l1",
        title: "Marca Personal de Autoridad en LinkedIn e Instagram",
        level: "comercial",
        durationMinutes: 40,
        theoryHtml: `
          <h3>Tu Perfil es Tu Vitrina Comercial</h3>
          <p>El 73% de los prospectos investiga al asesor en redes sociales <strong>antes</strong> de responder un mensaje. Si tu perfil de LinkedIn dice "Vendedor de seguros", ya perdiste. Si dice "Especialista en Protección Patrimonial y Blindaje Familiar", ganaste la primera impresión.</p>
          
          <h3>Optimización del Perfil de LinkedIn para Asesores</h3>
          <ul>
            <li><strong>Foto profesional:</strong> Fondo neutro, vestimenta ejecutiva, sonrisa natural. NO selfies, NO fotos de viaje.</li>
            <li><strong>Banner:</strong> Diseño corporativo con tu propuesta de valor y logo de VitalSeguros.</li>
            <li><strong>Titular:</strong> "Ayudo a familias ecuatorianas a blindar su patrimonio | Asesor Certificado VitalSeguros | Seguros de Vida, Salud & Protección"</li>
            <li><strong>Acerca de (About):</strong> Historia personal que conecte → problema que resuelves → resultados → CTA a agendar reunión.</li>
            <li><strong>Experiencia:</strong> No lista de trabajos, sino logros cuantificables: "Más de 120 familias protegidas en 2 años".</li>
          </ul>
          
          <h3>Estrategia de Contenido: La Regla 4-1-1</h3>
          <ul>
            <li><strong>4 posts educativos:</strong> Tips, datos, estadísticas sobre protección familiar</li>
            <li><strong>1 post de prueba social:</strong> Testimonio de cliente (sin datos sensibles)</li>
            <li><strong>1 post de oferta/CTA:</strong> Invitación a cotizar o agendar consulta gratuita</li>
          </ul>
        `,
        keyTakeaways: [
          "El 73% de prospectos investiga al asesor en redes antes de responder",
          "Tu titular de LinkedIn debe describir el problema que resuelves, no tu cargo",
          "Regla 4-1-1: 4 posts educativos + 1 prueba social + 1 oferta por semana",
          "Los logros cuantificables ('120 familias protegidas') valen más que títulos de cargo"
        ],
        quickCheck: [
          { id: "qc-ventas-1-1", question: "¿Qué porcentaje de prospectos investiga al asesor en redes sociales antes de responder?", options: ["45%", "58%", "73%", "85%"], correctIndex: 2, explanation: "El 73% de los prospectos investiga al asesor en redes antes de responder un mensaje." },
          { id: "qc-ventas-1-2", question: "En la Regla 4-1-1, ¿cuántos posts educativos se publican por ciclo?", options: ["1", "2", "3", "4"], correctIndex: 3, explanation: "La regla indica 4 posts educativos por cada post de prueba social y de oferta." },
          { id: "qc-ventas-1-3", question: "¿Qué NO debe incluir la foto de perfil profesional?", options: ["Sonrisa natural", "Fondo neutro", "Selfie o foto de viaje", "Vestimenta ejecutiva"], correctIndex: 2, explanation: "Las selfies y fotos de viaje restan profesionalismo. La foto debe ser con fondo neutro y vestimenta ejecutiva." }
        ],
        examQuestions: [
          { id: "ex-ventas-1-1", question: "¿Cuál es el titular de LinkedIn más efectivo para un asesor?", options: ["'Vendedor de seguros en VitalSeguros'", "'Busco oportunidades laborales en el sector asegurador'", "'Ayudo a familias a blindar su patrimonio | Asesor Certificado'", "'CEO y Fundador | Emprendedor'"], correctIndex: 2, explanation: "El titular debe describir el problema que resuelves y tu credencial, no tu cargo genérico." },
          { id: "ex-ventas-1-2", question: "¿Qué debe incluir la sección 'Acerca de' según el módulo?", options: ["Lista de seguros que vendes", "Historia personal + problema que resuelves + resultados + CTA", "Tu CV completo", "Solo datos de contacto"], correctIndex: 1, explanation: "La sección About debe seguir la estructura: historia → problema → resultados → llamada a la acción." },
          { id: "ex-ventas-1-3", question: "¿Cuántos posts de oferta/CTA se recomienda por ciclo 4-1-1?", options: ["0", "1", "2", "4"], correctIndex: 1, explanation: "En la regla 4-1-1: solo 1 post de oferta/CTA por cada 4 educativos y 1 de prueba social." },
          { id: "ex-ventas-1-4", question: "¿Qué tipo de contenido en la experiencia de LinkedIn es más efectivo?", options: ["Lista de responsabilidades", "Logros cuantificables", "Descripción del puesto", "Nombre de la empresa solamente"], correctIndex: 1, explanation: "Los logros cuantificables como '120 familias protegidas en 2 años' son más persuasivos que descripciones genéricas." },
          { id: "ex-ventas-1-5", question: "¿Qué elemento debe incluir el banner de LinkedIn?", options: ["Foto personal informal", "Diseño corporativo con propuesta de valor y logo", "Solo texto sin imágenes", "Foto del equipo de trabajo"], correctIndex: 1, explanation: "El banner debe ser un diseño profesional con tu propuesta de valor y el logo de VitalSeguros." }
        ]
      },
      {
        id: "l2",
        title: "Embudos de Captación con Lead Magnets y Cotizadores",
        level: "comercial",
        durationMinutes: 45,
        theoryHtml: `
          <h3>¿Qué es un Lead Magnet y Por Qué Lo Necesitas?</h3>
          <p>Un lead magnet es un <strong>recurso de valor gratuito</strong> que ofreces a cambio de los datos de contacto del prospecto. En el sector asegurador, los lead magnets más efectivos son:</p>
          <ul>
            <li><strong>Calculadora de cobertura gratuita:</strong> "Descubre cuánto seguro de vida necesitas en 60 segundos" (el cotizador de VitalSeguros ya es uno).</li>
            <li><strong>Guía PDF:</strong> "Los 5 errores más costosos al comprar un seguro médico en Ecuador".</li>
            <li><strong>Webinar gratuito:</strong> "Cómo blindar el patrimonio de tu familia con $2/día".</li>
            <li><strong>Checklist:</strong> "¿Tu seguro actual realmente te protege? Checklist de 10 puntos".</li>
          </ul>
          
          <h3>Embudo de Conversión del Asesor</h3>
          <ol>
            <li><strong>Atracción (Top):</strong> Post en LinkedIn/Instagram → Lead magnet → Captura email/WhatsApp</li>
            <li><strong>Nutrición (Middle):</strong> Secuencia de 3 emails educativos (Días 1, 3, 7)</li>
            <li><strong>Conversión (Bottom):</strong> Llamada o videollamada de cotización personalizada</li>
            <li><strong>Cierre:</strong> Presentación de propuesta → Manejo de objeciones → Firma</li>
          </ol>
          
          <h3>Métricas Clave del Embudo</h3>
          <ul>
            <li><strong>Tasa de captura:</strong> 15-25% de visitantes dejan sus datos (benchmark sector seguros)</li>
            <li><strong>Tasa de conversión a reunión:</strong> 30-40% de leads contactados agendan</li>
            <li><strong>Tasa de cierre:</strong> 20-30% de reuniones resultan en póliza emitida</li>
            <li><strong>Objetivo mínimo:</strong> 100 leads → 35 reuniones → 8 pólizas/mes</li>
          </ul>
        `,
        keyTakeaways: [
          "Un lead magnet es un recurso gratuito a cambio de datos de contacto — el cotizador ya es uno",
          "Embudo de 4 pasos: Atracción → Nutrición (3 emails) → Conversión (llamada) → Cierre",
          "Benchmark: 100 leads → 35 reuniones → 8 pólizas/mes",
          "Los 4 lead magnets más efectivos: calculadora, guía PDF, webinar y checklist"
        ],
        quickCheck: [
          { id: "qc-ventas-2-1", question: "¿Cuántos emails de nutrición recomienda el embudo?", options: ["1", "3", "5", "7"], correctIndex: 1, explanation: "La secuencia de nutrición incluye 3 emails educativos en los días 1, 3 y 7." },
          { id: "qc-ventas-2-2", question: "¿Cuál es la tasa de conversión benchmark de leads a reuniones?", options: ["10-20%", "20-30%", "30-40%", "50-60%"], correctIndex: 2, explanation: "El 30-40% de leads contactados agendan una reunión de cotización." },
          { id: "qc-ventas-2-3", question: "¿Cuál es el objetivo mínimo de pólizas por mes según el embudo?", options: ["3", "5", "8", "12"], correctIndex: 2, explanation: "El objetivo mínimo es 8 pólizas/mes a partir de 100 leads." }
        ],
        examQuestions: [
          { id: "ex-ventas-2-1", question: "¿Cuál es la tasa de captura benchmark en el sector seguros?", options: ["5-10%", "15-25%", "30-45%", "50-60%"], correctIndex: 1, explanation: "La tasa de captura benchmark en seguros es del 15-25% de visitantes." },
          { id: "ex-ventas-2-2", question: "¿Cuál de estos NO es un lead magnet efectivo para seguros?", options: ["Calculadora de cobertura", "Catálogo de precios de todas las aseguradoras", "Guía PDF de errores comunes", "Webinar sobre protección familiar"], correctIndex: 1, explanation: "Un catálogo de precios no es un lead magnet efectivo porque no educa ni genera confianza." },
          { id: "ex-ventas-2-3", question: "¿Cuál es la tasa de cierre benchmark de reuniones a pólizas?", options: ["5-10%", "10-15%", "20-30%", "40-50%"], correctIndex: 2, explanation: "El 20-30% de las reuniones de cotización resultan en póliza emitida." },
          { id: "ex-ventas-2-4", question: "¿En qué días se envían los emails de nutrición?", options: ["Días 1, 2, 3", "Días 1, 3, 7", "Días 1, 5, 10", "Días 1, 7, 14"], correctIndex: 1, explanation: "La secuencia óptima es Día 1, Día 3 y Día 7 para mantener el interés sin saturar." },
          { id: "ex-ventas-2-5", question: "¿Cuántos leads mensuales se necesitan para alcanzar 8 pólizas?", options: ["50", "75", "100", "150"], correctIndex: 2, explanation: "Se necesitan 100 leads → 35 reuniones → 8 pólizas con las tasas benchmark." }
        ]
      },
      {
        id: "l3",
        title: "WhatsApp Business: Cerrar en los Primeros 3 Mensajes",
        level: "comercial",
        durationMinutes: 35,
        theoryHtml: `
          <h3>WhatsApp: Tu Arma Secreta de Conversión</h3>
          <p>En Ecuador, el <strong>92% de la población activa usa WhatsApp</strong> como canal principal de comunicación. Sin embargo, el 80% de los asesores lo usa mal: envían catálogos PDF que nadie lee, hacen spam de productos o escriben mensajes genéricos.</p>
          
          <h3>El Protocolo de 3 Mensajes para Cierre</h3>
          <p><strong>Mensaje 1 — El Gancho (Personalizado):</strong></p>
          <p><em>"Hola [Nombre], soy [Tu Nombre] de VitalSeguros. Vi que descargaste nuestra calculadora de cobertura. ¿Te dio un resultado que te sorprendió? 🤔"</em></p>
          
          <p><strong>Mensaje 2 — El Valor (Educativo, 24h después si responde):</strong></p>
          <p><em>"Perfecto. Algo que la calculadora no muestra es que con [dato personalizado según sus datos], tu familia podría necesitar [cobertura X]. ¿Te gustaría que te haga una cotización detallada gratis? Solo toma 5 minutos por llamada."</em></p>
          
          <p><strong>Mensaje 3 — El Cierre (Agenda inmediata):</strong></p>
          <p><em>"Genial. ¿Te viene mejor hoy a las 4pm o mañana a las 10am para la llamada de cotización? ⏰"</em></p>
          
          <h3>Reglas de Oro del WhatsApp Business</h3>
          <ul>
            <li>Nunca enviar la cotización por WhatsApp — siempre en llamada o videollamada</li>
            <li>Responder en máximo 5 minutos durante horario laboral</li>
            <li>Usar notas de voz de máximo 30 segundos (humaniza la comunicación)</li>
            <li>Nunca agregar a grupos sin consentimiento</li>
            <li>Catálogo de WhatsApp Business con los 3 productos estrella, no más</li>
          </ul>
        `,
        keyTakeaways: [
          "92% de ecuatorianos usa WhatsApp — pero el 80% de asesores lo usa mal",
          "Protocolo de 3 mensajes: Gancho personalizado → Valor educativo → Cierre con agenda",
          "NUNCA enviar cotización por WhatsApp — siempre presentarla en llamada/videollamada",
          "Responder en máximo 5 minutos y usar notas de voz de máximo 30 segundos"
        ],
        quickCheck: [
          { id: "qc-ventas-3-1", question: "¿Cuántos mensajes tiene el protocolo de cierre por WhatsApp?", options: ["1", "3", "5", "7"], correctIndex: 1, explanation: "El protocolo consta de 3 mensajes: Gancho, Valor y Cierre." },
          { id: "qc-ventas-3-2", question: "¿Por qué no se debe enviar la cotización por WhatsApp?", options: ["Es ilegal", "El cliente no la lee y pierde el control de la negociación", "WhatsApp no permite PDF", "Es muy lento"], correctIndex: 1, explanation: "Enviar cotización por WhatsApp elimina la oportunidad de presentarla en vivo, manejar objeciones y cerrar." },
          { id: "qc-ventas-3-3", question: "¿En cuánto tiempo máximo debe responder un asesor por WhatsApp?", options: ["1 hora", "30 minutos", "15 minutos", "5 minutos"], correctIndex: 3, explanation: "El tiempo máximo de respuesta es 5 minutos durante horario laboral." }
        ],
        examQuestions: [
          { id: "ex-ventas-3-1", question: "¿Qué porcentaje de la población ecuatoriana activa usa WhatsApp?", options: ["72%", "82%", "92%", "98%"], correctIndex: 2, explanation: "El 92% de la población activa ecuatoriana usa WhatsApp como canal principal." },
          { id: "ex-ventas-3-2", question: "¿Cuál es el propósito del Mensaje 1 del protocolo?", options: ["Enviar la cotización", "Personalizar y generar curiosidad (Gancho)", "Agendar la reunión", "Presentar todos los productos"], correctIndex: 1, explanation: "El Mensaje 1 es el Gancho: personalizado para generar curiosidad basada en la interacción previa." },
          { id: "ex-ventas-3-3", question: "¿Cuánto deben durar las notas de voz según las reglas?", options: ["15 segundos", "30 segundos", "1 minuto", "2 minutos"], correctIndex: 1, explanation: "Las notas de voz deben ser de máximo 30 segundos para mantener la atención." },
          { id: "ex-ventas-3-4", question: "¿Cuántos productos debe tener el catálogo de WhatsApp Business?", options: ["Todos los disponibles", "Solo 3 productos estrella", "Máximo 10", "Solo 1"], correctIndex: 1, explanation: "El catálogo debe tener los 3 productos estrella, no más, para no confundir al prospecto." },
          { id: "ex-ventas-3-5", question: "¿Qué usa el Mensaje 3 para cerrar?", options: ["Un descuento especial", "Una agenda con 2 opciones de horario", "Un enlace a la web", "Un formulario de registro"], correctIndex: 1, explanation: "El Mensaje 3 usa el cierre por alternativa: ofrece 2 opciones de horario para que el prospecto elija." }
        ]
      },
      {
        id: "l4",
        title: "Automatización con CRM y Métricas de Conversión",
        level: "tecnico",
        durationMinutes: 40,
        theoryHtml: `
          <h3>El CRM: Tu Cerebro Digital de Ventas</h3>
          <p>Un CRM (Customer Relationship Management) no es un lujo — es una <strong>necesidad de supervivencia</strong>. Sin CRM, un asesor pierde el 40% de sus oportunidades por falta de seguimiento. Con CRM, automatiza el seguimiento y multiplica su productividad.</p>
          
          <h3>Pipeline de Ventas en el CRM de VitalSeguros</h3>
          <p>El CRM de VitalSeguros usa 6 estados para cada oportunidad:</p>
          <ol>
            <li><strong>Nuevo:</strong> Lead recién ingresado (cotizador web, academia, anuncios)</li>
            <li><strong>Calificado:</strong> Prospecto con poder de decisión, presupuesto y necesidad confirmada</li>
            <li><strong>Cotizado:</strong> Propuesta formal enviada con prima y coberturas</li>
            <li><strong>Negociación:</strong> Ajustes de deducible, cobertura o forma de pago</li>
            <li><strong>Ganada:</strong> Póliza emitida y pagada ✅</li>
            <li><strong>Perdida:</strong> Oportunidad descartada (documentar el motivo siempre)</li>
          </ol>
          
          <h3>Las 5 Métricas que Debes Monitorear Semanalmente</h3>
          <ul>
            <li><strong>Leads generados:</strong> Meta mínima: 25/semana</li>
            <li><strong>Tasa de contacto:</strong> % de leads con los que lograste hablar → Meta: 60%</li>
            <li><strong>Reuniones agendadas:</strong> Meta mínima: 8/semana</li>
            <li><strong>Tasa de cierre:</strong> % de reuniones que resultan en póliza → Meta: 25%</li>
            <li><strong>Ticket promedio:</strong> Prima anual promedio de tus pólizas cerradas</li>
          </ul>
          
          <h3>Automatización: Más Ventas con Menos Esfuerzo</h3>
          <ul>
            <li><strong>Alertas de seguimiento:</strong> El CRM te recuerda cuándo contactar a cada prospecto</li>
            <li><strong>Templates de mensajes:</strong> Mensajes pre-escritos para cada etapa del pipeline</li>
            <li><strong>Reportes automáticos:</strong> Resumen semanal de métricas sin esfuerzo manual</li>
            <li><strong>Scoring de leads:</strong> Prioriza prospectos según probabilidad de cierre</li>
          </ul>
        `,
        keyTakeaways: [
          "Sin CRM, un asesor pierde el 40% de oportunidades por falta de seguimiento",
          "6 estados del pipeline: Nuevo → Calificado → Cotizado → Negociación → Ganada/Perdida",
          "Meta semanal: 25 leads, 60% tasa de contacto, 8 reuniones, 25% tasa de cierre",
          "Automatizar seguimiento, templates y reportes multiplica productividad sin más horas"
        ],
        quickCheck: [
          { id: "qc-ventas-4-1", question: "¿Qué porcentaje de oportunidades pierde un asesor sin CRM?", options: ["10%", "20%", "30%", "40%"], correctIndex: 3, explanation: "Sin CRM, un asesor pierde el 40% de sus oportunidades por falta de seguimiento." },
          { id: "qc-ventas-4-2", question: "¿Cuántos estados tiene el pipeline de ventas del CRM?", options: ["3", "4", "5", "6"], correctIndex: 3, explanation: "El pipeline tiene 6 estados: Nuevo, Calificado, Cotizado, Negociación, Ganada, Perdida." },
          { id: "qc-ventas-4-3", question: "¿Cuál es la meta mínima de reuniones semanales?", options: ["3", "5", "8", "12"], correctIndex: 2, explanation: "La meta mínima es 8 reuniones por semana para mantener un pipeline saludable." }
        ],
        examQuestions: [
          { id: "ex-ventas-4-1", question: "¿Cuál es la meta mínima de leads semanales?", options: ["10", "15", "25", "50"], correctIndex: 2, explanation: "La meta mínima es 25 leads por semana para alimentar el pipeline." },
          { id: "ex-ventas-4-2", question: "¿Cuál es la tasa de contacto objetivo?", options: ["40%", "50%", "60%", "80%"], correctIndex: 2, explanation: "La tasa de contacto objetivo es del 60% de leads con los que se logra hablar." },
          { id: "ex-ventas-4-3", question: "¿Qué se debe hacer siempre cuando una oportunidad se marca como 'Perdida'?", options: ["Borrarla del CRM", "Documentar el motivo", "Contactar al jefe del prospecto", "Ofrecer descuento"], correctIndex: 1, explanation: "Siempre documentar el motivo de pérdida para identificar patrones y mejorar." },
          { id: "ex-ventas-4-4", question: "¿Cuál es la tasa de cierre objetivo según el módulo?", options: ["10%", "15%", "25%", "35%"], correctIndex: 2, explanation: "La tasa de cierre objetivo es del 25% de reuniones que resultan en póliza emitida." },
          { id: "ex-ventas-4-5", question: "¿Qué herramienta del CRM prioriza prospectos según probabilidad de cierre?", options: ["Templates de mensajes", "Alertas de seguimiento", "Scoring de leads", "Reportes automáticos"], correctIndex: 2, explanation: "El scoring de leads asigna prioridad a los prospectos según su probabilidad de cierre." }
        ]
      }
    ]
  }
];

// ─── Helpers ─────────────────────────────────────────────

export function getTrackById(trackId: string): AcademyTrack | undefined {
  return ACADEMY_TRACKS.find(t => t.id === trackId);
}

export function getLessonById(trackId: string, lessonId: string): LessonContent | undefined {
  const track = getTrackById(trackId);
  if (!track) return undefined;
  return track.lessons.find(l => l.id === lessonId);
}

export function getAllTrackIds(): string[] {
  return ACADEMY_TRACKS.map(t => t.id);
}
