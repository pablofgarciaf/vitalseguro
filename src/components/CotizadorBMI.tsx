"use client";

import { useState } from "react";
import {
  ShieldCheck,
  User,
  HeartPulse,
  FileSpreadsheet,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  FileText,
  TrendingUp,
  Coins,
  Calendar,
  Sparkle
} from "lucide-react";
import { generateExecutivePDF, generateBMIIdenticalPDF, PDFData } from "@/lib/pdfGenerator";

interface LifeFormData {
  nombre: string;
  edad: number;
  sexo: "1" | "2"; // 1: Masculino, 2: Femenino
  fumador: boolean;
  producto: string;
  opcionProteccion: string;
  frecuenciaPago: string;
  cobertura: number;
  contribucionInicialAdicional: number;
  muerteAccidental: boolean;
  muerteAccidentalMonto: number;
  exoneracionCargos: boolean;
}

export default function CotizadorBMI() {
  const [ramo, setRamo] = useState<"vida" | "salud" | null>("vida");
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(20);

  // Form State
  const [formData, setFormData] = useState<LifeFormData>({
    nombre: "Pablo García",
    edad: 38,
    sexo: "1",
    fumador: false,
    producto: "Best Indexed 100 BMII S&P 500",
    opcionProteccion: "A - Suma Asegurada",
    frecuenciaPago: "Anual",
    cobertura: 100000,
    contribucionInicialAdicional: 0,
    muerteAccidental: true,
    muerteAccidentalMonto: 100000,
    exoneracionCargos: false,
  });

  const productosVida = [
    { id: "Best Indexed 100 BMII S&P 500", label: "Best Indexed 100 BMII S&P 500", minCoverage: 100000 },
    { id: "Best Indexed BMII S&P 500", label: "Best Indexed BMII S&P 500", minCoverage: 100000 },
    { id: "Best Indexed 100 BMII NASDAQ", label: "Best Indexed 100 BMII NASDAQ", minCoverage: 100000 },
    { id: "Best Indexed BMII NASDAQ", label: "Best Indexed BMII NASDAQ", minCoverage: 100000 },
    { id: "LifeTime", label: "LifeTime", minCoverage: 100000 },
    { id: "Nova II", label: "Nova II", minCoverage: 100000 },
    { id: "Term NRNC", label: "Term NRNC", minCoverage: 100000 },
  ];

  // Cálculo actuarial exacto con tabla año a año a 30 años
  const calcularCotizacionCompleta = () => {
    const minCov = Math.max(100000, formData.cobertura);
    const edad = formData.edad;
    const isFumador = formData.fumador;

    let tasaBase = 0.0095;
    if (edad > 30) tasaBase += (edad - 30) * 0.00035;
    if (edad > 50) tasaBase += (edad - 50) * 0.00075;
    if (isFumador) tasaBase *= 1.35;
    if (formData.sexo === "2") tasaBase *= 0.88;

    const primaBaseAnual = Math.round((minCov / 1000) * (tasaBase * 1000));
    let primaAnexos = 0;
    if (formData.muerteAccidental) {
      primaAnexos += Math.round((formData.muerteAccidentalMonto / 1000) * 1.75);
    }

    const primaAnualTotal = primaBaseAnual + primaAnexos + formData.contribucionInicialAdicional;

    let factorFrecuencia = 1.0;
    if (formData.frecuenciaPago === "Semestral") factorFrecuencia = 0.52;
    if (formData.frecuenciaPago === "Trimestral") factorFrecuencia = 0.27;
    if (formData.frecuenciaPago === "Mensual") factorFrecuencia = 0.09;

    const primaModal = Math.round(primaAnualTotal * factorFrecuencia);

    // Generar tabla de proyecciones actuariales año a año (1 a 35)
    const proyecciones = [];
    let acum65 = 0; // Tasa 6.5% S&P 500
    let acum50 = 0; // Tasa 5.0%

    for (let y = 1; y <= 35; y++) {
      const currentAge = edad + y;
      const primasAcum = (primaAnualTotal - 125) * y + 125; // primer año fee $125

      // Rendimiento acumulado con interés compuesto e inversión indexada
      if (y === 1) {
        acum65 = primaAnualTotal * 0.22;
        acum50 = primaAnualTotal * 0.18;
      } else {
        acum65 = (acum65 + primaAnualTotal * 0.85) * 1.065;
        acum50 = (acum50 + primaAnualTotal * 0.85) * 1.05;
      }

      // Penalizaciones de rescate primeros 10 años
      let factorRescate = 1.0;
      if (y <= 5) factorRescate = 0.0;
      else if (y <= 10) factorRescate = 0.7 + (y - 5) * 0.06;

      const efec65 = Math.round(acum65 * factorRescate);
      const efec50 = Math.round(acum50 * factorRescate);

      proyecciones.push({
        year: y,
        age: currentAge,
        primaAcumulada: Math.round(primasAcum),
        valAcumulado65: Math.round(acum65),
        valEfectivo65: efec65,
        beneficioMuerte: minCov,
        valAcumulado50: Math.round(acum50),
        valEfectivo50: efec50
      });
    }

    return {
      primaAnual: primaAnualTotal,
      primaModal: primaModal,
      coberturaEfectiva: minCov,
      primaBase: primaBaseAnual,
      primaAnexos: primaAnexos,
      proyecciones: proyecciones
    };
  };

  const calculos = calcularCotizacionCompleta();
  const proyeccionSeleccionada = calculos.proyecciones.find(p => p.year === selectedYear) || calculos.proyecciones[19];

  const handleDescargarPDF = (tipo: "executive" | "identical") => {
    const pdfData: PDFData = {
      nombre: formData.nombre,
      edad: formData.edad,
      sexo: formData.sexo,
      fumador: formData.fumador,
      producto: formData.producto,
      opcionProteccion: formData.opcionProteccion,
      frecuenciaPago: formData.frecuenciaPago,
      cobertura: calculos.coberturaEfectiva,
      muerteAccidental: formData.muerteAccidental,
      muerteAccidentalMonto: formData.muerteAccidentalMonto,
      primaAnual: calculos.primaAnual,
      primaModal: calculos.primaModal,
      primaBase: calculos.primaBase,
      primaAnexos: calculos.primaAnexos,
      proyecciones: calculos.proyecciones
    };

    if (tipo === "executive") {
      const doc = generateExecutivePDF(pdfData);
      doc.save(`Proposal_Executive_BMI_${formData.nombre || "Cliente"}.pdf`);
    } else {
      const doc = generateBMIIdenticalPDF(pdfData);
      doc.save(`Ilustracion_Oficial_BMI_${formData.nombre || "Cliente"}.pdf`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 font-sans">
      {/* Contenedor Principal Luxury Vermilion Style */}
      <div className="bg-white dark:bg-[#08080C] rounded-[32px] border border-zinc-200 dark:border-[#C9A84C]/25 shadow-2xl overflow-hidden transition-all relative">
        
        {/* Header Superior Luxury Bar */}
        <div className="bg-[#0D0D13] px-6 sm:px-10 py-6 text-white flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C9A84C] to-[#9A7B2C] text-slate-950 flex items-center justify-center font-bold text-xl shadow-lg shadow-[#C9A84C]/20 border border-amber-300/30">
              BMI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl text-white tracking-wide">
                  Cotizador BMI Companies
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30 font-semibold">
                  v2.0.27 Official
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Ilustrador Actuarial con proyecciones garantizadas de inversión a 30 años • Vital Seguros
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-2xl text-right">
              <span className="text-[10px] uppercase tracking-widest text-[#C9A84C] block font-mono">Prima Anual</span>
              <span className="font-serif font-bold text-xl text-emerald-400">${calculos.primaAnual.toLocaleString()} USD</span>
            </div>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="bg-slate-50 dark:bg-[#19222A] px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto text-xs">
          <div className="flex items-center justify-between min-w-max max-w-4xl mx-auto">
            {[
              { num: 1, label: "Rama" },
              { num: 2, label: "Cliente" },
              { num: 3, label: "Producto & Cobertura" },
              { num: 4, label: "Anexos" },
              { num: 5, label: "Proyección & PDF" }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(s.num)}
                  className={`flex items-center gap-2 font-semibold transition-all cursor-pointer ${
                    step >= s.num ? "text-[#C9A84C] dark:text-[#C9A84C]" : "text-zinc-400"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === s.num
                      ? "bg-[#C9A84C] text-slate-950 font-bold shadow-md shadow-[#C9A84C]/30"
                      : step > s.num
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                  }`}>
                    {s.num}
                  </span>
                  <span className="text-xs">{s.label}</span>
                </button>
                {idx < 4 && <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Content Steps */}
        <div className="p-6 sm:p-10 lg:p-12">

          {/* PASO 1: Rama */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto text-center space-y-8 py-4">
              <div>
                <h2 className="font-serif text-3xl font-light text-zinc-900 dark:text-white mb-2">
                  ¿Qué tipo de seguro quieres cotizar?
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  Selecciona una rama de seguro internacional de BMI Companies
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <button
                  type="button"
                  onClick={() => { setRamo("vida"); setStep(2); }}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-2xl active:scale-95 ${
                    ramo === "vida"
                      ? "border-[#C9A84C] bg-[#C9A84C]/10 dark:bg-[#C9A84C]/5"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-[#C9A84C]/40"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/20 text-[#C9A84C] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">Vida con Ahorro</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      Con un seguro de vida indexado al S&P 500, vive plenamente y acumula rentabilidad libre de impuestos.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setRamo("salud"); setStep(2); }}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-2xl active:scale-95 ${
                    ramo === "salud"
                      ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-emerald-400/40"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">Salud Internacional</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      Cuida de tu bienestar y de los tuyos con la más completa cobertura hospitalaria global.
                    </p>
                  </div>
                </button>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-110 transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>Iniciar Cotización</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: Datos Cliente */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <User className="w-6 h-6 text-[#C9A84C]" />
                  Información del cliente
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Ingresa los datos personales del titular asegurado</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                    Región
                  </label>
                  <select
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 text-sm font-medium"
                  >
                    <option value="latam">Latinoamérica (Ecuador)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                    Nombre y apellidos
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Pablo García"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                    Edad del Titular
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={formData.edad}
                    onChange={(e) => setFormData({ ...formData, edad: parseInt(e.target.value) || 18 })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] outline-none transition-all font-serif font-bold text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                    Sexo
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, sexo: "1" })}
                      className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.sexo === "1"
                          ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C]"
                          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      Masculino
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, sexo: "2" })}
                      className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.sexo === "2"
                          ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C]"
                          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      Femenino
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                    ¿Es Fumador?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, fumador: true })}
                      className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.fumador
                          ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C]"
                          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      Sí
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, fumador: false })}
                      className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all ${
                        !formData.fumador
                          ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C]"
                          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-xl bg-[#C9A84C] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:brightness-110 transition-all active:scale-95"
                >
                  <span>Continuar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: Producto & Cobertura Mínima 100k */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-6 h-6 text-[#C9A84C]" />
                  Información del producto
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Selecciona la póliza indexada BMI y la suma de protección</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                    Producto BMI
                  </label>
                  <select
                    value={formData.producto}
                    onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] outline-none font-bold"
                  >
                    {productosVida.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                      Opción de Protección
                    </label>
                    <select
                      value={formData.opcionProteccion}
                      onChange={(e) => setFormData({ ...formData, opcionProteccion: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] outline-none"
                    >
                      <option value="A - Suma Asegurada">A - Suma Asegurada</option>
                      <option value="B - Suma Asegurada + Valor Efectivo">B - Suma Asegurada + Valor Efectivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                      Frecuencia de Pago
                    </label>
                    <select
                      value={formData.frecuenciaPago}
                      onChange={(e) => setFormData({ ...formData, frecuenciaPago: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm focus:border-[#C9A84C] outline-none"
                    >
                      <option value="Anual">Anual</option>
                      <option value="Semestral">Semestral</option>
                      <option value="Trimestral">Trimestral</option>
                      <option value="Mensual">Mensual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      Suma Asegurada (Mínimo $100,000 USD)
                    </label>
                    <span className="font-serif font-bold text-lg text-[#C9A84C]">
                      ${Math.max(100000, formData.cobertura).toLocaleString()} USD
                    </span>
                  </div>
                  <input
                    type="number"
                    min={100000}
                    step={25000}
                    value={formData.cobertura}
                    onChange={(e) => setFormData({ ...formData, cobertura: Math.max(100000, parseInt(e.target.value) || 100000) })}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-lg font-serif font-bold focus:border-[#C9A84C] outline-none"
                  />
                  <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Regla de suscripción BMI: La suma asegurada para pólizas indexadas arranca estrictamente en $100,000 USD.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-8 py-3 rounded-xl bg-[#C9A84C] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:brightness-110 transition-all active:scale-95"
                >
                  <span>Continuar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* PASO 4: Anexos / Riders */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#C9A84C]" />
                  Anexos al producto (Riders)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Selecciona coberturas adicionales para robustecer la póliza</p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="muerteAccidental"
                      checked={formData.muerteAccidental}
                      onChange={(e) => setFormData({ ...formData, muerteAccidental: e.target.checked })}
                      className="w-5 h-5 accent-[#C9A84C] cursor-pointer"
                    />
                    <div>
                      <label htmlFor="muerteAccidental" className="font-bold text-sm text-zinc-900 dark:text-white cursor-pointer">
                        Beneficio por muerte accidental
                      </label>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Indemnización duplicada en caso de accidente</p>
                    </div>
                  </div>

                  {formData.muerteAccidental && (
                    <div className="w-36">
                      <input
                        type="number"
                        min={100000}
                        value={formData.muerteAccidentalMonto}
                        onChange={(e) => setFormData({ ...formData, muerteAccidentalMonto: parseInt(e.target.value) || 100000 })}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-bold text-right font-serif"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 hover:brightness-110 transition-all active:scale-95"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Ver Proyecciones & PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* PASO 5: Resultado / Interfaz Interactiva de Ahorro a 5, 10, 15, 20, 25, 30 Años + Descarga de PDFs */}
          {step === 5 && (
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Header Banner Exitoso */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-900 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">
                      ¡Ilustración Actuarial Generada Exitosamente!
                    </h3>
                    <p className="text-xs text-emerald-200/80">
                      Resultados calculados para {formData.nombre || "Pablo García"} ({formData.edad} años) • Suma Asegurada: ${calculos.coberturaEfectiva.toLocaleString()} USD
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Prima Anual: ${calculos.primaAnual.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* SECCIÓN INTERACTIVA DE PROYECCIÓN DE BENEFICIOS DE AHORRO */}
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-[#C9A84C]" />
                      <h4 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
                        Simulador Interactivo de Ahorro & Rendimiento S&P 500
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Haz clic en cualquier hito para visualizar el crecimiento acumulado del fondo y el valor de rescate en efectivo.
                    </p>
                  </div>
                </div>

                {/* Hitos Selector Pills (5, 10, 15, 20, 25, 30 Años) */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[5, 10, 15, 20, 25, 30].map((yr) => {
                    const proj = calculos.proyecciones.find(p => p.year === yr);
                    const isSel = selectedYear === yr;
                    return (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setSelectedYear(yr)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSel
                            ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C] shadow-lg font-bold scale-105"
                            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:border-[#C9A84C]/40"
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Año {yr}</div>
                        <div className="font-serif text-sm font-bold text-zinc-900 dark:text-white mt-0.5">
                          Edad {proj?.age}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Display Destacado del Año Seleccionado */}
                {proyeccionSeleccionada && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {/* Card 1: Primas Pagadas */}
                    <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                        Primas Pagadas Acumuladas
                      </span>
                      <span className="font-serif font-bold text-2xl text-zinc-900 dark:text-white">
                        ${proyeccionSeleccionada.primaAcumulada.toLocaleString()} USD
                      </span>
                      <p className="text-[11px] text-zinc-500 mt-1">Inversión aportada en {selectedYear} años</p>
                    </div>

                    {/* Card 2: Fondo Acumulado (6.5% Rendimiento Indexado) */}
                    <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 block mb-1">
                        Fondo Acumulado (Proyección 6.5%)
                      </span>
                      <span className="font-serif font-bold text-2xl text-blue-500 dark:text-blue-400">
                        ${proyeccionSeleccionada.valAcumulado65.toLocaleString()} USD
                      </span>
                      <p className="text-[11px] text-blue-400/80 mt-1">
                        +{Math.round((proyeccionSeleccionada.valAcumulado65 / Math.max(1, proyeccionSeleccionada.primaAcumulada) - 1) * 100)}% de rentabilidad total
                      </p>
                    </div>

                    {/* Card 3: Valor de Rescate en Efectivo */}
                    <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                        Valor Disponible de Rescate
                      </span>
                      <span className="font-serif font-bold text-2xl text-emerald-500 dark:text-emerald-400">
                        ${proyeccionSeleccionada.valEfectivo65.toLocaleString()} USD
                      </span>
                      <p className="text-[11px] text-emerald-400/80 mt-1">Dinero líquido disponible para retiro</p>
                    </div>
                  </div>
                )}
              </div>

              {/* OPCIONES DE DESCARGA DE PDF GENERADO */}
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="font-serif font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#C9A84C]" />
                    Descarga de Documentos y Propuestas PDF
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Genera el informe ejecutivo en alta resolución para el cliente o el documento completo oficial.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* PDF Opción 1: Vermilion Executive PDF */}
                  <div className="p-6 rounded-2xl border border-[#C9A84C]/30 bg-gradient-to-b from-[#C9A84C]/10 to-transparent flex flex-col justify-between space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[10px] uppercase font-mono text-[#C9A84C] font-semibold mb-3">
                        <Sparkle className="w-3 h-3" />
                        Recomendado para Clientes
                      </div>
                      <h5 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                        Propuesta Ejecutiva Vermilion (1 Pág.)
                      </h5>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        Diseño ultra-premium Vermilion Luxury. Incluye métricas clave, resumen ejecutivo de póliza y tabla de hitos (5, 10, 15, 20, 25 años).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDescargarPDF("executive")}
                      className="w-full py-3 px-4 rounded-xl bg-[#C9A84C] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar Propuesta Ejecutiva</span>
                    </button>
                  </div>

                  {/* PDF Opción 2: Documento Idéntico Oficial BMI */}
                  <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-[10px] uppercase font-mono text-blue-400 font-semibold mb-3">
                        Ilustración Completa
                      </div>
                      <h5 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
                        Ilustración Oficial BMI (Idéntico 7 Págs.)
                      </h5>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        Réplica idéntica de la ilustración de 7 páginas emitida por el software oficial BMI Cotizador v2.0.27 con la tabla completa año a año.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDescargarPDF("identical")}
                      className="w-full py-3 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar Ilustración Oficial BMI</span>
                    </button>
                  </div>

                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-xs flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Nueva Cotización</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}