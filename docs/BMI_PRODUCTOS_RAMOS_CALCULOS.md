# 🛡️ DICCIONARIO MAESTRO: PRODUCTOS, RAMOS, TASAS Y CÁLCULOS ACTUARIALES BMI COMPANIES & VITAL SEGUROS

Este documento es la referencia técnica, actuarial y comercial oficial para el ecosistema de **Vital Seguros**. Integra la arquitectura completa de productos de **BMI Companies** (Best Meridian International Insurance Company I.I.), separando estrictamente los ramos de **Vida** y **Salud**, sus fórmulas de proyección, costos, deducibles, anexos y la estrategia de conversión digital con IA y páginas enriquecidas.

Sincronizado con la base de conocimiento: `[[docs/BMI_PRODUCTOS_RAMOS_CALCULOS]]`.

---

## 📑 ÍNDICE
1. [Arquitectura de Separación de Ramos](#1-arquitectura-de-separación-de-ramos)
2. [Ramo Vida: Productos, Tasas y Proyecciones S&P 500 / NASDAQ](#2-ramo-vida-productos-tasas-y-proyecciones)
3. [Ramo Salud: Productos, Deducibles y Coberturas Médicas](#3-ramo-salud-productos-deducibles-y-coberturas)
4. [Mecánica de Captura de Contactos (Teléfono con Fallback a Email)](#4-mecánica-de-captura-de-contactos)
5. [Estrategia de Páginas Enriquecidas en Nueva Pestaña (`/seguros/[slug]`)](#5-estrategia-de-páginas-enriquecidas)
6. [Diseño de la IA Concierge Asistente de Dudas](#6-diseño-de-la-ia-concierge)
7. [Plan de Implementación Paso a Paso](#7-plan-de-implementación-paso-a-paso)

---

## 1. 🏛️ Arquitectura de Separación de Ramos

Para eliminar cualquier confusión visual y funcional, la plataforma se divide en dos componentes autónomos y especializados:

```
                              ┌────────────────────────┐
                              │ Selector Inicial Rama  │
                              └───────────┬────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────┐                      ┌────────────────────────┐
     │   CotizadorVida.tsx    │                      │   CotizadorSalud.tsx   │
     ├────────────────────────┤                      ├────────────────────────┤
     │ • Suma Asegurada (min  │                      │ • Catálogo Médico BMI  │
     │   $100,000 USD)        │                      │ • Selector Deducibles  │
     │ • Opciones Prot. A / B │                      │ • Cobertura Maternidad │
     │ • Indexado S&P / NASDAQ│                      │ • Red Hospitalaria US  │
     │ • Ahorro 5-30 Años     │                      │ • Evacuación Médica    │
     │ • PDFs (Vermilion/BMI) │                      │ • Propuesta Médica PDF │
     └────────────────────────┘                      └────────────────────────┘
```

---

## 2. 📈 Ramo Vida: Productos, Tasas y Proyecciones

### 2.1. Catálogo Oficial de Productos de Vida
| Código / Producto | Tipo de Póliza | Suma Mínima | Índice / Rentabilidad | Perfil de Cliente |
| :--- | :--- | :--- | :--- | :--- |
| **Best Indexed 100 BMII S&P 500** | Universal Indexada (IUL) | **$100,000 USD** | S&P 500 (100% Participación, Piso 1% Cap ~9.5%-10.5%) | Inversionistas que buscan protección vitalicia y alto valor de rescate. |
| **Best Indexed BMII S&P 500** | Universal Indexada (IUL) | **$100,000 USD** | S&P 500 Flexible (Opciones ponderadas) | Protección flexible con interés variable. |
| **Best Indexed 100 BMII NASDAQ** | Universal Indexada (IUL) | **$100,000 USD** | NASDAQ 100 (100% Participación, Piso 1%) | Clientes más jóvenes con alta afinidad tecnológica y crecimiento bursátil. |
| **Best Indexed BMII NASDAQ** | Universal Indexada (IUL) | **$100,000 USD** | NASDAQ 100 Flexible | Ahorro a mediano y largo plazo. |
| **LifeTime** | Whole Life / Vida Entera | **$100,000 USD** | Tasa Garantizada Fija (3.5% - 4.0%) | Familias conservadoras que priorizan herencia y valor garantizado absoluto. |
| **Nova II** | Universal Flexible | **$100,000 USD** | Portafolio Administrado BMI | Fondos universitarios o retiro complementario. |
| **Term NRNC** | Término Puro (10, 20 años) | **$100,000 USD** | Sin ahorro (Costo puro de riesgo) | Cobertura temporal económica para deudas o hipotecas. |

### 2.2. Opciones de Protección
- **Opción A (Nivelada):** El Beneficio por Muerte permanece igual a la Suma Asegurada (ej. $100,000 USD). El valor acumulado sirve para pagar el costo del seguro en la vejez y maximizar el efectivo neto disponible.
- **Opción B (Creciente):** El Beneficio por Muerte es igual a la **Suma Asegurada + Valor en Efectivo Acumulado**. Al fallecer, los beneficiarios reciben tanto la póliza como todo el ahorro generado.

### 2.3. Estructura de Costos y Honorarios
1. **Honorario de Emisión (Fee):** $125.00 USD cobrado **únicamente en el año 1**.
2. **Costo Mensual del Seguro (COI):** Basado en edad, sexo y condición de fumador según la tabla actuarial CSO.
3. **Cargos de Rescate (Surrender Charges):**
   - Años 1 a 5: 100% de penalización (Valor de rescate = $0 USD).
   - Años 6 a 10: Disminuyen gradualmente (del 30% al 0%).
   - Año 15 en adelante: Sin penalización alguna (Valor Acumulado = Valor de Rescate Efectivo).
4. **Bono de Fidelidad BMI:** Adición de +1.50% de tasa de interés sobre el saldo a partir del año 20 de la póliza.

### 2.4. Tabla Actuarial de Proyección (Ejemplo Titular 38 Años, $100,000 Cobertura)
| Hito | Edad | Primas Acumuladas | Valor Efectivo Rescate (6.5%) | Fondo Acumulado (6.5% S&P) | Protección por Muerte | Rendimiento Neto |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Año 5** | 43 | $7,120 USD | **$0 USD** | $3,869 USD | $100,000 USD | Periodo de Maduración |
| **Año 10** | 48 | $14,115 USD | **$6,640 USD** | $9,080 USD | $100,000 USD | Break-even de Rescate |
| **Año 15** | 53 | $21,110 USD | **$24,428 USD** | $24,428 USD | $100,000 USD | **+15.7% (Positivo)** |
| **Año 20** | 58 | $28,105 USD | **$45,231 USD** | $45,231 USD | $100,000 USD | **+60.9%** |
| **Año 25 (Edad 63)** | 63 | $35,100 USD | **$77,469 USD** | $77,469 USD | $100,000 USD | **+120.7%** |
| **Año 30 (Edad 68)** | 68 | $42,095 USD | **$128,498 USD** | $128,498 USD | $151,628 USD | **+205.2%** |

### 2.5. Anexos al Producto de Vida (Riders)
- **Muerte Accidental:** Duplica el beneficio (+$100,000 USD adicionales). Costo: ~$1.25 a $1.75 por cada $1,000 de suma adicional.
- **Exoneración de Cargos Mensuales:** En caso de invalidez total y permanente.
- **Renta Familiar Anual:** Asignación periódica mensual/anual para manutención de hijos.

---

## 3. 🏥 Ramo Salud: Productos, Deducibles y Coberturas

### 3.1. Catálogo Oficial de Productos de Salud
| Producto | Cobertura Máxima Anual | Cobertura Geográfica | Deducibles Disponibles | Enfoque Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Meridian II** | **$5,000,000 USD** Vitalicio | Global (Incluye EE.UU. sin restricción de red) | $1,000 / $2,500 / $5,000 / $10,000 / $20,000 USD | **Alta Gama / Ejecutivos VIP**. Acceso directo a Johns Hopkins, Mayo Clinic, Mount Sinai. |
| **Azure** | **$3,000,000 USD** | Global (EE.UU. con red preferente) | $1,000 / $2,000 / $5,000 / $10,000 USD | Familias que desean medicina preventiva, chequeo anual y libre elección hospitalaria. |
| **Ideal** | **$2,000,000 USD** | Latinoamérica + Emergencias EE.UU. | $500 / $1,000 / $2,500 / $5,000 USD | Relación costo/beneficio premium para empresas y familias en Ecuador/Latam. |
| **Support** | **$1,000,000 USD** | Hospitalario y Catastrófico | $2,500 / $5,000 / $10,000 USD | Cirugías de alta complejidad, tratamientos oncológicos y accidentes graves. |
| **Sigma** | **$1,500,000 USD** | Regional e Internacional | $1,000 / $3,000 / $5,000 USD | Planes familiares con opciones de copago compartidas. |
| **Gastos Médicos Mayores** | **$500,000 USD** | Nacional y Regional | $500 / $1,000 / $2,500 USD | Protección sólida local ante eventualidades clínicas imprevistas. |
| **Innova** | **$1,000,000 USD** | Global Digital + Red Local | $1,000 / $2,500 USD | Cobertura ambulatoria, telemedicina internacional y medicamentos recetados. |

### 3.2. Mecánica de Deducibles en Salud
- **Deducible por Asegurado:** Se aplica una sola vez por año póliza (máximo 2 o 3 deducibles por grupo familiar).
- **Regla Fuera de EE.UU.:** En la mayoría de productos BMI, si el tratamiento se realiza fuera de Estados Unidos (por ejemplo, en Ecuador o Colombia), el deducible se reduce al 50%.
- **Evacuación Médica de Emergencia:** 100% cubierta (no sujeta a deducible en caso de peligro inminente de vida).

### 3.3. Beneficios y Anexos Clave en Salud
1. **Maternidad y Cuidados del Recién Nacido:** Cobertura de parto normal, cesárea y complicaciones de maternidad (con periodo de carencia de 10 a 12 meses).
2. **Trasplante de Órganos:** Cobertura de hasta $1,000,000 USD incluyendo búsqueda y gastos del donante.
3. **Tratamientos Oncológicos:** Quimioterapia, radioterapia, inmunoterapia y medicamentos de última generación al 100% después del deducible.
4. **Cirugía Reconstructiva:** Consecuencia de accidentes o cirugías de cáncer (ej. mastectomía).
5. **Chequeo Ejecutivo Anual (Wellness Checkup):** $250 a $500 USD anuales sin deducible a partir del segundo año.

---

## 4. 📱 Mecánica de Captura de Contactos (Fricción Cero)

Para maximizar la tasa de conversión sin espantar al prospecto:

1. **Datos Básicos:**
   - Nombre completo.
   - Edad (para el cálculo de la prima).
2. **Contacto Flexible (Anti-Abandono):**
   - Campo principal: **WhatsApp / Teléfono Móvil**.
   - Opción checkbox / enlace: *"Prefiero no dar mi teléfono ahora, contactarme por correo"*.
   - Al marcarlo, el campo cambia a **Correo Electrónico Corporativo/Personal**.
   - Validación: Se requiere obligatoriamente uno de los dos canales de contacto antes de emitir la cotización formal o la descarga de la propuesta.
3. **Sincronización:** Cada cotización se guarda inmediatamente en Firebase CRM con el estado `"nuevo"` y la etiqueta de la rama cotizada (`"bmi_vida"` o `"bmi_salud"`).

---

## 5. 🌐 Estrategia de Páginas Enriquecidas en Nueva Pestaña (`/seguros/[slug]`)

En cada cotizador (Vida o Salud), junto al botón de continuar o al seleccionar un plan, existirá un botón de enlace prominente:

> **🔗 "Conocer todos los beneficios y coberturas de [Nombre del Plan] ↗"**

Al hacer clic, se abre en **una pestaña nueva (`target="_blank" rel="noopener noreferrer"`)** la ruta enriquecida del producto (ej. `/seguros/meridian-ii` o `/seguros/best-indexed-100-sp500`).

### Contenido de la Página Enriquecida:
- **Hero Luxury:** Nombre del plan, aseguradora (BMI Companies), certificación internacional y calificación de riesgo A.M. Best.
- **Direct Answer Capsule (GEO & SEO):** Resumen ejecutivo en los primeros 1,000 caracteres para ser indexado por Google AI Overviews, Perplexity y ChatGPT.
- **Tabla Exhaustiva de Coberturas:** Deducibles, límites por evento, cobertura hospitalaria, ambulatoria y emergencias.
- **Red Médica:** Hospitales afiliados en Ecuador (Metropolitano, Vozandes, Guayaquil, Omni Hospital) y en el extranjero (Mayo Clinic, Cleveland Clinic, Jackson Memorial).
- **CTA Interactivo:** Botones para *"Solicitar Asesoría por WhatsApp"* o *"Agendar Cita en Calendly/Google Calendar"*.

---

## 6. 🤖 Diseño de la IA Concierge Asistente de Dudas

Un widget conversacional inteligente, elegante y contextual ubicado en la esquina inferior del cotizador:

```
┌─────────────────────────────────────────────────────────────┐
│ 💬 Concierge Actuarial Vital Seguros               [ - ] [x]│
├─────────────────────────────────────────────────────────────┤
│ Hola Pablo, veo que estás cotizando el plan                 │
│ "Best Indexed 100 S&P 500".                                 │
│                                                             │
│ ¿Tienes dudas sobre cómo funciona el piso garantizado del   │
│ 1% o en qué año puedes retirar tu dinero sin penalización?  │
│                                                             │
│ [ ¿Cómo funciona el rescate? ] [ ¿Cubre en EE.UU.? ]        │
└─────────────────────────────────────────────────────────────┘
```

### Capacidades del Asistente IA:
- **Contextual:** Sabe exactamente qué producto, edad y cobertura tiene el usuario en pantalla.
- **Explicativo:** Traduce términos técnicos complejos (deducible, coaseguro, S&P 500, valor de rescate, carencia) a lenguaje humano claro y persuasivo.
- **Generador de Confianza:** Destaca que los fondos no se arriesgan directamente en la bolsa (cuentan con el respaldo de la reserva general de BMI con más de 50 años en el mercado).
- **Call to Action Directo:** Invita a agendar una videollamada de 15 minutos con un consultor senior de Vital Seguros.

---

## 7. 🚀 Plan de Implementación Paso a Paso

1. **Fase 1: Creación de Componentes Autónomos**
   - Crear `src/components/CotizadorVida.tsx` con su lógica matemática indexada a 30 años, selector de hitos y botones de PDF.
   - Crear `src/components/CotizadorSalud.tsx` con el catálogo médico (`Meridian II`, `Azure`, `Ideal`, etc.), selector de deducibles y beneficios hospitalarios.
2. **Fase 2: Rediseño Visual Impecable (Principios Emil Kowalski)**
   - Reemplazar selects nativos por dropdowns con diseño propio, espaciado de 16px, iconos de chevron sutiles y bordes translúcidos con `backdrop-blur`.
3. **Fase 3: Páginas Enriquecidas de Producto (`/seguros/[slug]`)**
   - Implementar el catálogo de páginas con datos duros y esquema JSON-LD para SEO y GEO.
4. **Fase 4: IA Concierge Asistente**
   - Integrar el widget interactivo con respuestas rápidas entrenadas con las reglas de suscripción de BMI.
5. **Fase 5: Validación A+**
   - Pruebas TypeScript (`npx tsc --noEmit`), compilación `npm run build` y verificación sin errores de consola.

---
*Documento preparado para el equipo de desarrollo y arquitectura de Vital Seguros.*
