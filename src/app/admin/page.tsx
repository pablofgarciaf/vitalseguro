"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Plus, 
  Search, 
  Sliders, 
  Sparkles, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  HeartHandshake, 
  Car, 
  Building2, 
  X,
  Briefcase,
  UserCheck,
  ChevronRight,
  ArrowUpRight,
  Award
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar, { type AdminTab } from "@/components/AdminSidebar";
import { 
  getLeads, 
  saveLead, 
  updateLeadStatus, 
  getAspirantes,
  approveAspirante,
  type LeadOpportunity, 
  type RamoType, 
  type LeadStatus,
  type Aspirante
} from "@/lib/crmService";
import { getCommissionRates, type CommissionRates, DEFAULT_COMMISSION_RATES } from "@/lib/commissionService";

export default function AdminCRMPage() {
  const { userProfile, logout } = useAuth();
  const [leads, setLeads] = useState<LeadOpportunity[]>([]);
  const [aspirantes, setAspirantes] = useState<Aspirante[]>([]);
  const [rates, setRates] = useState<CommissionRates>(DEFAULT_COMMISSION_RATES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRamo, setFilterRamo] = useState<string>("todos");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<AdminTab>("bi");

  // Formulario de nuevo lead
  const [newNombre, setNewNombre] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTelefono, setNewTelefono] = useState("");
  const [newCiudad, setNewCiudad] = useState("Quito");
  const [newRamo, setNewRamo] = useState<RamoType>("vida");
  const [newPrima, setNewPrima] = useState(2500);
  const [newCobertura, setNewCobertura] = useState("$300,000 USD");
  const [newAsesor, setNewAsesor] = useState("");
  const [newNotas, setNewNotas] = useState("");
  const [mounted, setMounted] = useState(false);

  const refreshData = async () => {
    try {
      const [leadsData, ratesData, aspirantesData] = await Promise.all([
        getLeads(),
        getCommissionRates(),
        getAspirantes()
      ]);
      setLeads(leadsData);
      setRates(ratesData);
      setAspirantes(aspirantesData);
    } catch (err) {
      console.error("Error al actualizar los datos del CRM:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    refreshData();

    const handleCRMUpdate = () => refreshData();
    const handleCommissionsUpdate = () => refreshData();

    window.addEventListener("vital_crm_updated", handleCRMUpdate);
    window.addEventListener("vital_commissions_updated", handleCommissionsUpdate);

    return () => {
      window.removeEventListener("vital_crm_updated", handleCRMUpdate);
      window.removeEventListener("vital_commissions_updated", handleCommissionsUpdate);
    };
  }, []);

  // Filtrado de Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchSearch = 
        l.nombre.toLowerCase().includes(search.toLowerCase()) ||
        l.telefono.includes(search) ||
        l.ciudad.toLowerCase().includes(search.toLowerCase()) ||
        l.asesor.toLowerCase().includes(search.toLowerCase());
      
      const matchRamo = filterRamo === "todos" || l.ramo === filterRamo;
      const matchEstado = filterEstado === "todos" || l.estado === filterEstado;

      return matchSearch && matchRamo && matchEstado;
    });
  }, [leads, search, filterRamo, filterEstado]);

  // Cálculos de KPIs
  const totalPrimasEmitidas = useMemo(() => {
    return leads
      .filter(l => l.estado === "ganada")
      .reduce((acc, curr) => acc + curr.primaAnual, 0);
  }, [leads]);

  const totalComisionesDevengadas = useMemo(() => {
    return leads
      .filter(l => l.estado === "ganada")
      .reduce((acc, curr) => acc + curr.comisionMonto, 0);
  }, [leads]);

  const totalPipelinePotencial = useMemo(() => {
    return leads
      .filter(l => l.estado !== "ganada" && l.estado !== "perdida")
      .reduce((acc, curr) => acc + curr.primaAnual, 0);
  }, [leads]);

  const tasaConversion = useMemo(() => {
    if (leads.length === 0) return 0;
    const ganadas = leads.filter(l => l.estado === "ganada").length;
    return Math.round((ganadas / leads.length) * 100);
  }, [leads]);

  const totalGMV = totalPrimasEmitidas + totalPipelinePotencial;

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    await updateLeadStatus(id, newStatus);
    refreshData();
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre || !newTelefono) return;

    await saveLead({
      nombre: newNombre,
      email: newEmail,
      telefono: newTelefono,
      ciudad: newCiudad,
      ramo: newRamo,
      planDetalle: `Póliza ${newRamo.toUpperCase()} - Cobertura ${newCobertura}`,
      cobertura: newCobertura,
      primaAnual: Number(newPrima),
      estado: "nuevo",
      asesor: newAsesor || userProfile?.name || "Asesor Senior",
      notas: newNotas || "Ingresado manualmente desde CRM",
      origen: "manual"
    });

    setIsModalOpen(false);
    setNewNombre("");
    setNewEmail("");
    setNewTelefono("");
    setNewNotas("");
    refreshData();
  };

  const handleApproveAspirante = async (email: string) => {
    try {
      await approveAspirante(email);
      refreshData();
    } catch {
      alert("Error al aprobar aspirante.");
    }
  };

  const getRamoIcon = (ramo: RamoType) => {
    switch (ramo) {
      case "vida": return <Sparkles className="w-4 h-4 text-[#C9A84C]" />;
      case "viaje": return <Compass className="w-4 h-4 text-blue-400" />;
      case "salud": return <HeartHandshake className="w-4 h-4 text-emerald-400" />;
      case "auto": return <Car className="w-4 h-4 text-amber-400" />;
      case "corporativo": return <Building2 className="w-4 h-4 text-purple-400" />;
    }
  };

  const getStatusBadge = (estado: LeadStatus) => {
    switch (estado) {
      case "nuevo":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Nuevo</span>;
      case "calificado":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">Calificado</span>;
      case "cotizado":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Cotizado</span>;
      case "negociacion":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Negociación</span>;
      case "ganada":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">Ganada / Emitida</span>;
      case "perdida":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">Perdida</span>;
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#0A0E17] text-slate-100 font-sans selection:bg-[#C9A84C] selection:text-[#0A0E17]">
      {/* Sidebar Integrado Luxury */}
      <AdminSidebar 
        adminTab={adminTab} 
        setAdminTab={setAdminTab} 
        aspirantesCount={aspirantes.length}
        leadsCount={leads.length}
        totalGMV={totalGMV}
      />

      {/* Main Content Workspace pegado a los márgenes superiores */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto max-h-screen">
        {/* Top Header Bar pegado al margen superior (Sticky top-0 sin gaps) */}
        <header className="border-b border-white/10 bg-[#0A0E17]/95 backdrop-blur-md sticky top-0 z-30 px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              {adminTab === "bi" && "Tablero Ejecutivo & Inteligencia de Negocio"}
              {adminTab === "crm" && "Pipeline Comercial & Cartera de Pólizas"}
              {adminTab === "aspirantes" && "Supervisión de Aspirantes & Equipo"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Vital Seguros Enterprise CRM · Ecosistema Empresarial Unificado
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Lead / Póliza</span>
            </button>
          </div>
        </header>

        {/* Banner de Tasas en Vivo pegado inmediatamente tras el Header */}
        <div className="bg-[#0D1522] border-b border-white/5 px-6 md:px-8 py-2.5">
          <div className="max-w-7xl flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> Comisiones Vigentes:
              </span>
              <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                Vida: <strong className="text-[#E0C068]">{rates.vida}%</strong>
              </span>
              <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                Viaje: <strong className="text-blue-400">{rates.viaje}%</strong>
              </span>
              <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                Salud: <strong className="text-emerald-400">{rates.salud}%</strong>
              </span>
              <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                Auto: <strong className="text-amber-400">{rates.auto}%</strong>
              </span>
              <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                Pymes: <strong className="text-purple-400">{rates.corporativo}%</strong>
              </span>
            </div>

            <Link 
              href="/admin/configuracion" 
              className="text-[#C9A84C] hover:text-[#E0C068] flex items-center gap-1 text-[11px] font-medium transition-colors"
            >
              Modificar tasas en admin/configuración →
            </Link>
          </div>
        </div>

        {/* Dynamic Workspace Content */}
        <main className="p-6 md:p-8 space-y-8 flex-1">
          {/* TAB 1: Tablero Ejecutivo (BI) */}
          {adminTab === "bi" && (
            <div className="space-y-6">
              {/* 4 Cards de Métricas Principales con paleta de Vital Seguros */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Volumen Pólizas */}
                <div className="p-5 rounded-3xl bg-[#121B2B]/90 border border-white/10 shadow-xl space-y-2 hover:border-[#C9A84C]/30 transition-all">
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">
                    VOLUMEN PÓLIZAS GANADAS
                  </span>
                  <h3 className="font-serif text-3xl font-extrabold text-white tracking-tight">
                    ${totalPrimasEmitidas.toLocaleString("en-US")} <span className="text-xs font-normal text-[#C9A84C]">USD</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Primas totales cerradas en cartera activa.</p>
                </div>

                {/* Comisiones Acreditadas */}
                <div className="p-5 rounded-3xl bg-[#121B2B]/90 border border-white/10 shadow-xl space-y-2 hover:border-emerald-500/30 transition-all">
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">
                    COMISIONES ACREDITADAS
                  </span>
                  <h3 className="font-serif text-3xl font-extrabold text-[#34D399] tracking-tight">
                    ${totalComisionesDevengadas.toLocaleString("en-US")} <span className="text-xs font-normal text-emerald-400">USD</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Generadas en pólizas ganadas (incluye {rates.vida}% en vida).</p>
                </div>

                {/* Pipeline Activo */}
                <div className="p-5 rounded-3xl bg-[#121B2B]/90 border border-white/10 shadow-xl space-y-2 hover:border-blue-500/30 transition-all">
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">
                    PIPELINE ACTIVO
                  </span>
                  <h3 className="font-serif text-3xl font-extrabold text-blue-300 tracking-tight">
                    ${totalPipelinePotencial.toLocaleString("en-US")} <span className="text-xs font-normal text-blue-400">USD</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Primas en fase de cotización o negociación.</p>
                </div>

                {/* Conversión */}
                <div className="p-5 rounded-3xl bg-[#121B2B]/90 border border-white/10 shadow-xl space-y-2 hover:border-purple-500/30 transition-all">
                  <span className="text-slate-400 text-xs font-mono uppercase tracking-wider block">
                    CONVERSIÓN DE VENTAS
                  </span>
                  <h3 className="font-serif text-3xl font-extrabold text-purple-300 tracking-tight">
                    {tasaConversion}%
                  </h3>
                  <p className="text-[11px] text-slate-400">De prospectos convertidos a pólizas vigentes.</p>
                </div>
              </section>

              {/* Secciones del BI Inferior */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Asesores */}
                <div className="lg:col-span-1 p-6 rounded-3xl bg-[#121B2B]/90 border border-white/10 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
                    <Award className="w-5 h-5 text-[#C9A84C]" />
                    <span>Top Asesores del Mes</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Martina Paz (Asesora Senior)</p>
                        <p className="text-[11px] text-slate-400 font-mono">3 pólizas emitidas</p>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#E0C068]">$3,600 USD</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Director VitalSeguros</p>
                        <p className="text-[11px] text-slate-400 font-mono">1 corporativa</p>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#E0C068]">$1,200 USD</span>
                    </div>
                  </div>
                </div>

                {/* Acciones Rápidas del Sistema */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-[#121B2B]/90 border border-white/10 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-serif font-bold text-lg">
                      Últimas Oportunidades Registradas
                    </h3>
                    <button
                      onClick={() => setAdminTab("crm")}
                      className="text-xs text-[#C9A84C] hover:text-[#E0C068] flex items-center gap-1 font-medium cursor-pointer"
                    >
                      Ver Cartera Completa →
                    </button>
                  </div>
                  
                  <div className="space-y-2.5">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white/5">
                            {getRamoIcon(lead.ramo)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{lead.nombre}</p>
                            <p className="text-[11px] text-slate-400">{lead.ciudad} • {lead.telefono}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-xs font-bold text-white">${lead.primaAnual.toLocaleString("en-US")} USD</p>
                          <p className="text-[10px] text-[#34D399] font-mono">${lead.comisionMonto.toLocaleString("en-US")} com.</p>
                        </div>
                      </div>
                    ))}
                    {leads.length === 0 && (
                      <p className="text-xs text-slate-500 py-6 text-center">No hay registros aún.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CRM & Cartera de Oportunidades */}
          {adminTab === "crm" && (
            <div className="space-y-6">
              {/* Filtros y Controles de la Tabla */}
              <section className="bg-[#121B2B]/90 border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Buscador */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por cliente, teléfono, asesor o ciudad..."
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C]"
                    />
                  </div>

                  {/* Selectores de Filtro con Fondo Oscuro y Texto Blanco */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-400">Ramo:</span>
                      <select
                        value={filterRamo}
                        onChange={(e) => setFilterRamo(e.target.value)}
                        className="bg-[#0A0E17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A84C] cursor-pointer"
                      >
                        <option value="todos" className="bg-[#0A0E17] text-white">Todos los Ramos</option>
                        <option value="vida" className="bg-[#0A0E17] text-white">Vida ({rates.vida}%)</option>
                        <option value="viaje" className="bg-[#0A0E17] text-white">Viaje ({rates.viaje}%)</option>
                        <option value="salud" className="bg-[#0A0E17] text-white">Salud ({rates.salud}%)</option>
                        <option value="auto" className="bg-[#0A0E17] text-white">Auto ({rates.auto}%)</option>
                        <option value="corporativo" className="bg-[#0A0E17] text-white">Corporativo ({rates.corporativo}%)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Estado:</span>
                      <select
                        value={filterEstado}
                        onChange={(e) => setFilterEstado(e.target.value)}
                        className="bg-[#0A0E17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C9A84C] cursor-pointer"
                      >
                        <option value="todos" className="bg-[#0A0E17] text-white">Todos los Estados</option>
                        <option value="nuevo" className="bg-[#0A0E17] text-white">Nuevo</option>
                        <option value="calificado" className="bg-[#0A0E17] text-white">Calificado</option>
                        <option value="cotizado" className="bg-[#0A0E17] text-white">Cotizado</option>
                        <option value="negociacion" className="bg-[#0A0E17] text-white">Negociación</option>
                        <option value="ganada" className="bg-[#0A0E17] text-white">Ganada (Emitida)</option>
                        <option value="perdida" className="bg-[#0A0E17] text-white">Perdida</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tabla de Leads y Pólizas */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-4">Cliente / Contacto</th>
                        <th className="py-3 px-4">Ramo & Cobertura</th>
                        <th className="py-3 px-4">Prima Anual</th>
                        <th className="py-3 px-4">Comisión Asesor</th>
                        <th className="py-3 px-4">Asesor Asignado</th>
                        <th className="py-3 px-4">Estado del Lead</th>
                        <th className="py-3 px-4 text-right">Acción Rápida</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors">
                            {/* Cliente */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white">{lead.nombre}</div>
                              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-slate-500" /> {lead.telefono}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-500" /> {lead.ciudad}
                                </span>
                              </div>
                            </td>

                            {/* Ramo */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2 font-medium text-slate-200">
                                {getRamoIcon(lead.ramo)}
                                <span className="capitalize">{lead.ramo}</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">{lead.cobertura}</div>
                            </td>

                            {/* Prima */}
                            <td className="py-3.5 px-4 font-mono font-semibold text-white">
                              ${lead.primaAnual.toLocaleString("en-US")} USD
                            </td>

                            {/* Comisión */}
                            <td className="py-3.5 px-4">
                              <div className="font-mono font-bold text-[#34D399]">
                                ${lead.comisionMonto.toLocaleString("en-US")} USD
                              </div>
                              <div className="text-[11px] text-[#C9A84C] font-mono">
                                {lead.comisionPorcentaje}% comisión
                              </div>
                            </td>

                            {/* Asesor */}
                            <td className="py-3.5 px-4">
                              <span className="text-xs text-slate-300 font-medium px-2 py-1 rounded-md bg-white/5 border border-white/5">
                                {lead.asesor}
                              </span>
                            </td>

                            {/* Estado */}
                            <td className="py-3.5 px-4">
                              {getStatusBadge(lead.estado)}
                            </td>

                            {/* Acciones */}
                            <td className="py-3.5 px-4 text-right">
                              <select
                                value={lead.estado}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                className="bg-[#0A0E17] hover:bg-white/10 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-[#C9A84C] transition-all cursor-pointer"
                              >
                                <option value="nuevo" className="bg-[#0A0E17] text-white">Marcar Nuevo</option>
                                <option value="calificado" className="bg-[#0A0E17] text-white">Calificado</option>
                                <option value="cotizado" className="bg-[#0A0E17] text-white">Cotizado</option>
                                <option value="negociacion" className="bg-[#0A0E17] text-white">En Negociación</option>
                                <option value="ganada" className="bg-[#0A0E17] text-white">✅ Póliza Ganada</option>
                                <option value="perdida" className="bg-[#0A0E17] text-white">❌ Perdida</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500">
                            No se encontraron oportunidades con los filtros seleccionados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: Aspirantes Pendientes */}
          {adminTab === "aspirantes" && (
            <section className="bg-[#121B2B]/90 border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white">Aspirantes & Registro de Asesores</h2>
                  <p className="text-xs text-slate-400 mt-1">Nuevas solicitudes de vinculación a la red de Vital Seguros</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      <th className="py-3 px-4">Aspirante</th>
                      <th className="py-3 px-4">Datos de Contacto</th>
                      <th className="py-3 px-4">Fecha Solicitud</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {aspirantes.length > 0 ? (
                      aspirantes.map((asp) => (
                        <tr key={asp.email} className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{asp.name}</div>
                            <div className="text-xs text-slate-400 font-mono">Cédula: {asp.cedula || "N/A"}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200">{asp.email}</div>
                            <div className="text-xs text-slate-400">{asp.phone || "N/A"} • {asp.ciudad || "N/A"}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {new Date(asp.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4">
                            {asp.approved ? (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Aprobado</span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">En Revisión</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {!asp.approved && (
                              <button
                                onClick={() => handleApproveAspirante(asp.email)}
                                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/30 transition-all border border-emerald-500/30 cursor-pointer"
                              >
                                Aprobar y Activar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          No hay aspirantes pendientes de aprobación en este momento.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Modal Crear Nuevo Lead / Póliza */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#121B2B] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0E17]/60">
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#C9A84C]" /> Registrar Nueva Oportunidad
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo del Cliente</label>
                <input
                  type="text"
                  required
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  placeholder="Ej: Ing. Carlos Valenzuela"
                  className="w-full px-3.5 py-2 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="text"
                    required
                    value={newTelefono}
                    onChange={(e) => setNewTelefono(e.target.value)}
                    placeholder="+593 99 123 4567"
                    className="w-full px-3.5 py-2 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={newCiudad}
                    onChange={(e) => setNewCiudad(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ramo del Seguro</label>
                  <select
                    value={newRamo}
                    onChange={(e) => setNewRamo(e.target.value as RamoType)}
                    className="w-full px-3.5 py-2 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C] cursor-pointer"
                  >
                    <option value="vida" className="bg-[#0A0E17] text-white">Vida ({rates.vida}%)</option>
                    <option value="viaje" className="bg-[#0A0E17] text-white">Viaje ({rates.viaje}%)</option>
                    <option value="salud" className="bg-[#0A0E17] text-white">Salud ({rates.salud}%)</option>
                    <option value="auto" className="bg-[#0A0E17] text-white">Auto ({rates.auto}%)</option>
                    <option value="corporativo" className="bg-[#0A0E17] text-white">Corporativo ({rates.corporativo}%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Prima Anual ($ USD)</label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    required
                    value={newPrima}
                    onChange={(e) => setNewPrima(parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Comisión estimada ({rates[newRamo]}%):</span>
                <span className="text-sm font-mono font-bold text-[#34D399]">
                  ${Math.round(newPrima * (rates[newRamo] / 100))} USD
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Asesor Asignado</label>
                <input
                  type="text"
                  value={newAsesor}
                  onChange={(e) => setNewAsesor(e.target.value)}
                  placeholder={userProfile?.name || "Asesor Senior"}
                  className="w-full px-3.5 py-2 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notas de la Cotización</label>
                <textarea
                  rows={2}
                  value={newNotas}
                  onChange={(e) => setNewNotas(e.target.value)}
                  placeholder="Detalles sobre deducible, requerimientos del cliente..."
                  className="w-full px-3.5 py-2 bg-[#0A0E17] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0E17] font-extrabold uppercase tracking-wider text-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-lg"
                >
                  Guardar Oportunidad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
