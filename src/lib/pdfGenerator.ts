import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface PDFData {
  nombre: string;
  edad: number;
  sexo: string;
  fumador: boolean;
  producto: string;
  opcionProteccion: string;
  frecuenciaPago: string;
  cobertura: number;
  muerteAccidental: boolean;
  muerteAccidentalMonto: number;
  primaAnual: number;
  primaModal: number;
  primaMin?: number;
  primaMax?: number;
  primaBase: number;
  primaAnexos: number;
  proyecciones: Array<{
    year: number;
    age: number;
    primaAcumulada: number;
    valAcumulado65: number;
    valEfectivo65: number;
    beneficioMuerte: number;
    valAcumulado50: number;
    valEfectivo50: number;
  }>;
}

// 1. PDF Resumido Estilo Vermilion Executive (Luxury 1 Página)
export function generateExecutivePDF(data: PDFData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const width = doc.internal.pageSize.getWidth();

  // Header Vermilion Luxury Gradient / Dark Banner
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, width, 40, "F");

  // Gold Line accent
  doc.setFillColor(201, 168, 76); // Gold #C9A84C
  doc.rect(0, 39, width, 1, "F");

  // Logo & Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("VITAL SEGUROS", 15, 18);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(201, 168, 76);
  doc.text("ESTIMACIÓN REFERENCIAL • SEGURO DE VIDA", 15, 25);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIDENCIAL", width - 15, 18, { align: "right" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, width - 15, 25, { align: "right" });

  // Seccion Cliente
  let y = 48;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, width - 30, 24, 3, 3, "F");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("1. RESUMEN DEL TITULAR Y PÓLIZA", 20, y + 8);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Cliente: `, 20, y + 16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.nombre || "Pablo García"}`, 35, y + 16);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Edad / Sexo: `, 95, y + 16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.edad} Años • ${data.sexo === "1" ? "Masculino" : "Femenino"} (${data.fumador ? "Fumador" : "No Fumador"})`, 118, y + 16);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Producto: `, 20, y + 21);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235);
  doc.text(`${data.producto}`, 38, y + 21);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Frecuencia: `, 95, y + 21);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.frecuenciaPago}`, 115, y + 21);

  // Cards de Metricas Principales (Suma Asegurada vs Prima Anual)
  y += 30;
  // Card 1: Cobertura
  doc.setFillColor(239, 246, 255); // Blue 50
  doc.roundedRect(15, y, (width - 35) / 2, 22, 3, 3, "F");
  doc.setDrawColor(191, 219, 254);
  doc.roundedRect(15, y, (width - 35) / 2, 22, 3, 3, "D");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 64, 175);
  doc.text("SUMA ASEGURADA PRINCIPAL", 20, y + 7);
  doc.setFontSize(16);
  doc.text(`$${data.cobertura.toLocaleString()} USD`, 20, y + 16);

  // Card 2: Prima Anual
  doc.setFillColor(240, 253, 244); // Emerald 50
  doc.roundedRect(20 + (width - 35) / 2, y, (width - 35) / 2, 22, 3, 3, "F");
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(20 + (width - 35) / 2, y, (width - 35) / 2, 22, 3, 3, "D");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 101, 52);
  doc.text(`PRIMA ANUAL REFERENCIAL (${data.frecuenciaPago.toUpperCase()})`, 25 + (width - 35) / 2, y + 7);
  doc.setFontSize(16);
  doc.text(`$${data.primaAnual.toLocaleString()} USD`, 25 + (width - 35) / 2, y + 16);

  if (data.primaMin && data.primaMax) {
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Rango probable: $${data.primaMin.toLocaleString()} - $${data.primaMax.toLocaleString()} USD/año`, width / 2, y + 26, { align: "center" });
  }

  // Tabla Hitos Clave (5, 10, 15, 20, 25 años y Edad 65)
  y += data.primaMin && data.primaMax ? 33 : 28;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("2. PROYECCIÓN FINANCIERA DE AHORRO Y VALORES DE RESCATE", 15, y);

  const tableData = data.proyecciones
    .filter(p => [5, 10, 15, 20, 25, 30].includes(p.year))
    .map(p => [
      `Año ${p.year} (Edad ${p.age})`,
      `$${p.primaAcumulada.toLocaleString()}`,
      `$${p.valEfectivo65.toLocaleString()}`,
      `$${p.valAcumulado65.toLocaleString()}`,
      `$${p.beneficioMuerte.toLocaleString()}`
    ]);

  autoTable(doc, {
    startY: y + 4,
    margin: { left: 15, right: 15 },
    head: [["Año / Edad", "Primas Pagadas", "Valor Efectivo", "Escenario proyectado", "Protección Vida"]],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { fontStyle: "bold", textColor: [15, 23, 42] },
      2: { fontStyle: "bold", textColor: [22, 101, 52] },
      3: { fontStyle: "bold", textColor: [37, 99, 235] },
      4: { fontStyle: "bold", textColor: [15, 23, 42] }
    }
  });

  // Footer Vermilion Signature
  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(15, finalY, width - 30, 20, 2, 2, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("• Estimación orientativa: no constituye oferta, póliza ni emisión de la aseguradora.", 20, finalY + 7);
  doc.text("• Prima y valores finales dependen de edad actuarial, suscripción y tablas vigentes.", 20, finalY + 12);
  doc.text("• Para una cotización formal, solicita la validación de un asesor de Vital Seguros.", 20, finalY + 17);

  return doc;
}

// 2. Estimación detallada de vida (2 páginas)
export function generateDetailedEstimatePDF(data: PDFData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const width = doc.internal.pageSize.getWidth();

  // PÁGINA 1: Resumen de la estimación
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("VITAL SEGUROS - ESTIMACIÓN REFERENCIAL", 15, 20);

  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235);
  doc.text(data.producto.toUpperCase(), 15, 28);

  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text("Simulación informativa de seguro de vida", 15, 34);
  doc.text("Sujeta a validación y suscripción de la aseguradora", 15, 40);

  // Cuadro Datos
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 48, width - 30, 35, 2, 2, "F");

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Preparada para:", 20, 56);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(data.nombre || "Pablo García", 20, 63);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`EDAD ${data.edad}  ${data.sexo === "1" ? "MASCULINO" : "FEMENINO"}  ${data.fumador ? "FUMADOR" : "NO FUMADOR"}`, 20, 70);

  doc.text("Suma Asegurada Inicial:", width - 85, 56);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`$${data.cobertura.toLocaleString()}`, width - 85, 63);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text("Prima Inicial ANUAL:", width - 85, 70);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 101, 52);
  doc.text(`$${data.primaAnual.toLocaleString()}.00`, width - 85, 77);

  if (data.primaMin && data.primaMax) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Rango probable anual: $${data.primaMin.toLocaleString()} - $${data.primaMax.toLocaleString()}`, width - 85, 81);
  }

  // Coberturas Adicionales
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Coberturas adicionales seleccionadas para la estimación", 15, 95);

  const ridersRows = [];
  if (data.muerteAccidental) {
    ridersRows.push(["Beneficio Muerte Accidental", `$${data.muerteAccidentalMonto.toLocaleString()}`, "Años 1 - 32"]);
  }
  if (ridersRows.length === 0) {
    ridersRows.push(["Sin coberturas adicionales", "No aplica", "No aplica"]);
  }

  autoTable(doc, {
    startY: 99,
    margin: { left: 15, right: 15 },
    head: [["COBERTURA", "Suma Asegurada Inicial", "VIGENCIA DE LA COBERTURA"]],
    body: ridersRows,
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 8 },
    bodyStyles: { fontSize: 8 }
  });

  // Footer Pagina 1
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("ESTIMACIÓN NO VINCULANTE. NO REEMPLAZA LA PROPUESTA DE LA ASEGURADORA.", 15, 275);
  doc.text(`Preparada el: ${new Date().toLocaleDateString("es-ES")}   Página 1 de 2`, width - 15, 275, { align: "right" });

  // PAGINA 2: Tabla de Proyecciones Año a Año (20 Años)
  doc.addPage();
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("VITAL SEGUROS - ESTIMACIÓN REFERENCIAL", 15, 15);
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.text(`${data.producto} - ESCENARIOS ILUSTRATIVOS NO GARANTIZADOS`, 15, 21);

  const fullProjectionsRows = data.proyecciones.map(p => [
    p.year,
    p.age,
    `$${p.primaAcumulada.toLocaleString()}`,
    `$${p.valAcumulado65.toLocaleString()}`,
    `$${p.valEfectivo65.toLocaleString()}`,
    `$${p.beneficioMuerte.toLocaleString()}`,
    `$${p.valAcumulado50.toLocaleString()}`,
    `$${p.valEfectivo50.toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 25,
    margin: { left: 15, right: 15 },
    head: [[
      "Año", "Edad", "Primas acumuladas", "Escenario proyectado", "Valor efectivo", "Protección Vida", "Escenario conservador", "Valor efectivo"
    ]],
    body: fullProjectionsRows,
    headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 7 },
    bodyStyles: { fontSize: 7, textColor: [51, 65, 85] },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("LOS RESULTADOS SON ILUSTRATIVOS Y PUEDEN VARIAR SEGÚN EL PRODUCTO EMITIDO.", 15, 280);
  doc.text(`Preparada el: ${new Date().toLocaleDateString("es-ES")}   Página 2 de 2`, width - 15, 280, { align: "right" });

  return doc;
}

// Compatibilidad con la pantalla heredada del cotizador BMI.
export const generateBMIIdenticalPDF = generateDetailedEstimatePDF;

export interface HealthPDFData {
  nombre: string;
  edad: number;
  sexo: string;
  telefono: string;
  email: string;
  producto: string;
  coberturaMax: string;
  deducible: string;
  areaGeografica: string;
  frecuenciaPago: string;
  primaAnual: number;
  primaModal: number;
  primaMin?: number;
  primaMax?: number;
  anexos: string[];
}

// 3. Propuesta Médica Internacional de Salud (Luxury Health Proposal)
export function generateHealthProposalPDF(data: HealthPDFData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const width = doc.internal.pageSize.getWidth();

  // Header Emerald & Slate Luxury Banner
  doc.setFillColor(6, 78, 59); // Emerald 900
  doc.rect(0, 0, width, 40, "F");

  // Gold Line accent
  doc.setFillColor(201, 168, 76); // Gold #C9A84C
  doc.rect(0, 39, width, 1.2, "F");

  // Title & Branding
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("VITAL SEGUROS", 15, 18);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(201, 168, 76);
  doc.text("ESTIMACIÓN REFERENCIAL • SEGURO DE SALUD", 15, 25);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CONFIDENCIAL", width - 15, 18, { align: "right" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(167, 243, 208);
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, width - 15, 25, { align: "right" });

  // Resumen del Asegurado
  let y = 48;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, width - 30, 24, 3, 3, "F");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("1. DATOS DEL TITULAR Y PLAN MÉDICO", 20, y + 8);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Asegurado: ", 20, y + 16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.nombre || "Cliente"} (${data.edad} Años • ${data.sexo === "1" ? "Masculino" : "Femenino"})`, 40, y + 16);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Plan Seleccionado: ", 110, y + 16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(5, 150, 105);
  doc.text(`${data.producto}`, 142, y + 16);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Contacto: `, 20, y + 21);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.telefono || data.email || "Registrado en CRM"}`, 38, y + 21);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Frecuencia: ", 110, y + 21);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.frecuenciaPago}`, 130, y + 21);

  // Cards de Cobertura Máxima y Deducible
  y += 30;
  // Card 1
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(15, y, (width - 35) / 2, 22, 3, 3, "F");
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(15, y, (width - 35) / 2, 22, 3, 3, "D");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(6, 95, 70);
  doc.text("COBERTURA MÁXIMA DEL PLAN", 20, y + 7);
  doc.setFontSize(16);
  doc.text(data.coberturaMax, 20, y + 16);

  // Card 2
  doc.setFillColor(240, 253, 250);
  doc.roundedRect(20 + (width - 35) / 2, y, (width - 35) / 2, 22, 3, 3, "F");
  doc.setDrawColor(153, 246, 228);
  doc.roundedRect(20 + (width - 35) / 2, y, (width - 35) / 2, 22, 3, 3, "D");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(17, 94, 89);
  doc.text("DEDUCIBLE ANUAL SELECCIONADO", 25 + (width - 35) / 2, y + 7);
  doc.setFontSize(16);
  doc.text(`${data.deducible} USD`, 25 + (width - 35) / 2, y + 16);

  // Tabla de Beneficios y Servicios Cubiertos
  y += 28;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("2. DESGLOSE DE BENEFICIOS MÉDICOS Y HOSPITALARIOS", 15, y);

  const healthTable = [
    ["Hospitalización y Cirugía", "Habitación privada estándar, cuidados intensivos (UCI), quirófano y honorarios médicos al 100%."],
    ["Tratamientos Oncológicos", "Quimioterapia, radioterapia, inmunoterapia y medicamentos aprobados por la FDA al 100%."],
    ["Red internacional", `${data.areaGeografica}. Prestadores, autorizaciones y alcance dependen del plan emitido.`],
    ["Beneficios opcionales", data.anexos.length > 0 ? data.anexos.join(", ") : "No se seleccionaron anexos en esta estimación."],
    ["Condiciones", "Deducibles, copagos, carencias y límites se confirman en la propuesta formal y el condicionado aplicable."]
  ];

  autoTable(doc, {
    startY: y + 4,
    margin: { left: 15, right: 15 },
    head: [["Beneficio / Cobertura", "Alcance y Condiciones"]],
    body: healthTable,
    theme: "striped",
    headStyles: { fillColor: [6, 78, 59], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 8, textColor: [51, 65, 85] },
    columnStyles: {
      0: { fontStyle: "bold", textColor: [6, 78, 59], cellWidth: 50 },
      1: { textColor: [51, 65, 85] }
    }
  });

  // Resumen de Inversión
  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, finalY, width - 30, 24, 3, 3, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, finalY, width - 30, 24, 3, 3, "D");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("3. PRIMA REFERENCIAL DEL PLAN MÉDICO", 20, finalY + 8);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Prima estimada (${data.frecuenciaPago}): `, 20, finalY + 16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(12);
  doc.text(`$${data.primaModal.toLocaleString()} USD`, 85, finalY + 16);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`(Equivalente a una prima anual de $${data.primaAnual.toLocaleString()} USD)`, 120, finalY + 16);

  if (data.primaMin && data.primaMax) {
    doc.setFontSize(7.5);
    doc.text(`Rango probable anual: $${data.primaMin.toLocaleString()} - $${data.primaMax.toLocaleString()} USD`, 20, finalY + 21);
  }

  // Footer
  const footerY = finalY + 28;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("• Estimación orientativa: no constituye oferta, póliza ni emisión de la aseguradora.", 15, footerY);
  doc.text("• La prima final requiere solicitud, suscripción médica y validación de tablas vigentes.", 15, footerY + 5);

  return doc;
}
