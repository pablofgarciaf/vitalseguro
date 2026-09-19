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
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  HeartHandshake, 
  Car, 
  Building2, 
  ChevronRight, 
  X,
  AlertCircle,
  User,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { 
  getLeads, 
  saveLead, 
  updateLeadStatus, 
  deleteLead, 
  type LeadOpportunity, 
  type RamoType, 
  type LeadStatus 
} from "@/lib/crmService";
import { getCommissionRates, type CommissionRates, DEFAULT_COMMISSION_RATES } from "@/lib/commissionService";

export default function AdminCRMPage() {
  const { userProfile, logout } = useAuth();
  const [leads, setLeads] = useState<LeadOpportunity[]>([]);
  const [rates, setRates] = useState<CommissionRates>(DEFAULT_COMMISSION_RATES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRamo, setFilterRamo] = useState<string>("todos");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const refreshData = async () => {
    const [leadsData, ratesData] = await Promise.all([
      getLeads(),
      getCommissionRates()
    ]);
    setLeads(leadsData);
    setRates(ratesData);
    setLoading(false);
  };

  useEffect(() => {
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
      asesor: newAsesor,
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

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-[#C9A84C] selection:text-[#0A0A0F]">
      {/* Header Superior */}
      <header className="border-b border-white/10 bg-[#12121A]/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#8C6D23] flex items-center justify-center font-serif font-bold text-[#0A0A0F] text-lg shadow-lg shadow-[#C9A84C]/20 group-hover:scale-105 transition-transform">
                V
              </div>
              <div>
                <span className="text-base font-serif font-bold text-white tracking-wide">Vital Seguros</span>
                <span className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest">Enterprise CRM</span>
              </div>
            </Link>

            <div className="hidden sm:block h-6 w-px bg-white/10" />

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Firebase Conectado
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/academia"
              className="px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-xs font-semibold transition-all border border-blue-500/20 flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Academia de Seguros</span>
            </Link>

            <Link
              href="/admin/configuracion"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold transition-all border border-white/10 flex items-center gap-1.5 group"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C9A84C] group-hover:rotate-45 transition-transform" />
              <span>Tasas Comisión (Vida {rates.vida}%)</span>
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] text-xs font-bold transition-all shadow-lg shadow-[#C9A84C]/20 hover:brightness-110 active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Lead / Póliza</span>
            </button>

            {userProfile ? (
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <div className="hidden lg:flex flex-col text-right text-xs">
                  <span className="font-semibold text-white truncate max-w-[120px]">{userProfile.name}</span>
                  <span className="text-[#C9A84C] font-mono text-[10px] uppercase">{userProfile.role}</span>
                </div>
                <button
                  onClick={logout}
                  title="Cerrar sesión"
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <User className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Acceder</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Banner de Tasas en Vivo */}
      <div className="bg-gradient-to-r from-[#12121A] via-[#1A1A24] to-[#12121A] border-b border-white/5 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" /> Comisiones Vigentes:
            </span>
            <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">
              Vida: <strong className="text-[#E0C068]">{rates.vida}%</strong>
            </span>
            <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">
              Viaje: <strong className="text-blue-400">{rates.viaje}%</strong>
            </span>
            <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">
              Salud: <strong className="text-emerald-400">{rates.salud}%</strong>
            </span>
            <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">
              Auto: <strong className="text-amber-400">{rates.auto}%</strong>
            </span>
            <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">
              Pymes: <strong className="text-purple-400">{rates.corporativo}%</strong>
            </span>
          </div>

          <Link 
            href="/admin/configuracion" 
            className="text-[#C9A84C] hover:underline flex items-center gap-1 text-[11px]"
          >
            Modificar tasas en admin/configuracion →
          </Link>
        </div>
      </div>

      {/* KPIs Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Comisiones Ganadas */}
          <div className="bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-[#10B981]/30 rounded-2xl p-5 relative overflow-hidden shadow-xl shadow-[#10B981]/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Comisiones Acreditadas</span>
              <div className="p-2 rounded-xl bg-[#10B981]/10 text-[#10B981]">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-serif font-extrabold text-[#34D399]">
                ${totalComisionesDevengadas.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Generadas en pólizas ganadas (incluye {rates.vida}% en vida).
              </p>
            </div>
          </div>

          {/* Primas Emitidas */}
          <div className="bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Volumen Pólizas Ganadas</span>
              <div className="p-2 rounded-xl bg-[#C9A84C]/10 text-[#C9A84C]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-serif font-extrabold text-white">
                ${totalPrimasEmitidas.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Primas totales cerradas en cartera activa.
              </p>
            </div>
          </div>

          {/* Pipeline en Juego */}
          <div className="bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pipeline Activo</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-serif font-extrabold text-blue-300">
                ${totalPipelinePotencial.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Primas en fase de cotización o negociación.
              </p>
            </div>
          </div>

          {/* Tasa de Cierre */}
          <div className="bg-gradient-to-br from-[#12121A] to-[#0A0A0F] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Conversión de Ventas</span>
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-serif font-extrabold text-purple-300">
                {tasaConversion}%
              </span>
              <p className="text-xs text-slate-400 mt-1">
                De prospectos convertidos a pólizas vigentes.
              </p>
            </div>
          </div>
        </section>

        {/* Filtros y Controles de la Tabla */}
        <section className="bg-[#12121A] border border-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Buscador */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por cliente, teléfono, asesor o ciudad..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C9A84C]"
              />
            </div>

            {/* Selectores de Filtro */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400">Ramo:</span>
                <select
                  value={filterRamo}
                  onChange={(e) => setFilterRamo(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                >
                  <option value="todos">Todos los Ramos</option>
                  <option value="vida">Vida ({rates.vida}%)</option>
                  <option value="viaje">Viaje ({rates.viaje}%)</option>
                  <option value="salud">Salud ({rates.salud}%)</option>
                  <option value="auto">Auto ({rates.auto}%)</option>
                  <option value="corporativo">Corporativo ({rates.corporativo}%)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Estado:</span>
                <select
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C9A84C]"
                >
                  <option value="todos">Todos los Estados</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="calificado">Calificado</option>
                  <option value="cotizado">Cotizado</option>
                  <option value="negociacion">Negociación</option>
                  <option value="ganada">Ganada (Emitida)</option>
                  <option value="perdida">Perdida</option>
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
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
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
                          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-[#C9A84C] transition-all cursor-pointer"
                        >
                          <option value="nuevo">Marcar Nuevo</option>
                          <option value="calificado">Calificado</option>
                          <option value="cotizado">Cotizado</option>
                          <option value="negociacion">En Negociación</option>
                          <option value="ganada">✅ Póliza Ganada</option>
                          <option value="perdida">❌ Perdida</option>
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
      </main>

      {/* Modal Crear Nuevo Lead */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#12121A] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#C9A84C]" /> Registrar Nueva Oportunidad
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  placeholder="Ej: Dr. Roberto Alarcón"
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
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
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={newCiudad}
                    onChange={(e) => setNewCiudad(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ramo del Seguro</label>
                  <select
                    value={newRamo}
                    onChange={(e) => setNewRamo(e.target.value as RamoType)}
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                  >
                    <option value="vida">Vida ({rates.vida}%)</option>
                    <option value="viaje">Viaje ({rates.viaje}%)</option>
                    <option value="salud">Salud ({rates.salud}%)</option>
                    <option value="auto">Auto ({rates.auto}%)</option>
                    <option value="corporativo">Corporativo ({rates.corporativo}%)</option>
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
                    className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-mono focus:outline-none focus:border-[#C9A84C]"
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
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notas de la Cotización</label>
                <textarea
                  rows={2}
                  value={newNotas}
                  onChange={(e) => setNewNotas(e.target.value)}
                  placeholder="Detalles sobre deducible, requerimientos del cliente..."
                  className="w-full px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
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
