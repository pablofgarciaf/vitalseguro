import { db } from "./firebase";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getCommissionRates } from "./commissionService";

export type RamoType = "vida" | "viaje" | "salud" | "auto" | "corporativo";
export type LeadStatus = "nuevo" | "calificado" | "cotizado" | "negociacion" | "ganada" | "perdida";

export interface LeadOpportunity {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  ramo: RamoType;
  planDetalle: string;
  cobertura: string;
  primaAnual: number;
  comisionPorcentaje: number;
  comisionMonto: number;
  estado: LeadStatus;
  asesor: string;
  notas: string;
  origen: "cotizador_web" | "escuela_viajes" | "manual" | "campana_ads";
  createdAt: string;
}

const STORAGE_KEY = "vital_seguros_crm_leads";
const COLLECTION_NAME = "leads";

export const INITIAL_MOCK_LEADS: LeadOpportunity[] = [
  {
    id: "lead-001",
    nombre: "Ing. Santiago Morales",
    email: "santiago.morales@corporativo.ec",
    telefono: "+593 99 450 8821",
    ciudad: "Quito",
    ramo: "vida",
    planDetalle: "Plan Vida Élite con Ahorro para Jubilación",
    cobertura: "$500,000 USD",
    primaAnual: 3600,
    comisionPorcentaje: 60,
    comisionMonto: 2160,
    estado: "ganada",
    asesor: "Gabriel Jácome",
    notas: "Póliza emitida y pagada. Comisión acreditada del 60% ($2,160).",
    origen: "cotizador_web",
    createdAt: "2026-09-17T14:30:00Z"
  },
  {
    id: "lead-002",
    nombre: "Dra. Valentina Cordero",
    email: "valentina.cordero@clinica.ec",
    telefono: "+593 98 712 4433",
    ciudad: "Guayaquil",
    ramo: "viaje",
    planDetalle: "Vital Travel Safe - Anual Multiviajes Europa y Schengen",
    cobertura: "$300,000 USD",
    primaAnual: 1450,
    comisionPorcentaje: 35,
    comisionMonto: 507.5,
    estado: "negociacion",
    asesor: "Estudiante Academia (Martina Paz)",
    notas: "Viaje familiar de 4 personas a Suiza e Italia. Cotización formal enviada.",
    origen: "escuela_viajes",
    createdAt: "2026-09-18T09:15:00Z"
  },
  {
    id: "lead-003",
    nombre: "Carlos Xavier Endara",
    email: "cx.endara@inversiones.com",
    telefono: "+593 96 221 9087",
    ciudad: "Cumbayá",
    ramo: "salud",
    planDetalle: "Seguro Médico Internacional Hospitalario VIP (BMI / Bupa)",
    cobertura: "$1,000,000 USD",
    primaAnual: 4200,
    comisionPorcentaje: 25,
    comisionMonto: 1050,
    estado: "cotizado",
    asesor: "Gabriel Jácome",
    notas: "Solicitó comparativo de deducibles $1k vs $2.5k.",
    origen: "cotizador_web",
    createdAt: "2026-09-18T11:40:00Z"
  },
  {
    id: "lead-004",
    nombre: "Empresa Logística Andina S.A.",
    email: "operaciones@andinalog.ec",
    telefono: "+593 99 881 2345",
    ciudad: "Cuenca",
    ramo: "corporativo",
    planDetalle: "Póliza Colectiva de Accidentes y Vida Grupo (18 colaboradores)",
    cobertura: "$50,000 USD por persona",
    primaAnual: 6800,
    comisionPorcentaje: 20,
    comisionMonto: 1360,
    estado: "calificado",
    asesor: "Gabriel Jácome",
    notas: "Reunión agendada para el lunes para revisar censo laboral.",
    origen: "campana_ads",
    createdAt: "2026-09-18T15:20:00Z"
  },
  {
    id: "lead-005",
    nombre: "Andrea Sotomayor",
    email: "asotomayor@estudiolegal.ec",
    telefono: "+593 95 667 8901",
    ciudad: "Samborondón",
    ramo: "vida",
    planDetalle: "Seguro de Vida Puro Protección Hipotecaria",
    cobertura: "$250,000 USD",
    primaAnual: 1800,
    comisionPorcentaje: 60,
    comisionMonto: 1080,
    estado: "nuevo",
    asesor: "Sin asignar",
    notas: "Generó cotización rápida desde el cotizador web.",
    origen: "cotizador_web",
    createdAt: "2026-09-18T18:05:00Z"
  }
];

export async function getLeads(): Promise<LeadOpportunity[]> {
  // 1. Intentar leer desde Firestore
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const items: LeadOpportunity[] = [];
      snap.forEach(docSnap => {
        items.push({ id: docSnap.id, ...(docSnap.data() as Omit<LeadOpportunity, "id">) });
      });
      // Ordenar por fecha descendente
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
      return items;
    }
  } catch (err) {
    console.warn("Firestore leads inaccesible o vacío, usando fallback local:", err);
  }

  // 2. Intentar leer de LocalStorage
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as LeadOpportunity[];
      }
    } catch {
      // Ignorar errores de parseo
    }
  }

  // 3. Devolver datos iniciales y sembrarlos en LocalStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_LEADS));
  }
  return INITIAL_MOCK_LEADS;
}

export async function saveLead(leadData: Omit<LeadOpportunity, "id" | "comisionPorcentaje" | "comisionMonto" | "createdAt">): Promise<LeadOpportunity> {
  const rates = await getCommissionRates();
  const comisionPorcentaje = rates[leadData.ramo] || (leadData.ramo === "vida" ? 60 : 25);
  const comisionMonto = Math.round((leadData.primaAnual * (comisionPorcentaje / 100)) * 100) / 100;

  const newLead: LeadOpportunity = {
    ...leadData,
    id: "lead-" + Date.now(),
    comisionPorcentaje,
    comisionMonto,
    createdAt: new Date().toISOString()
  };

  // Guardar en LocalStorage
  if (typeof window !== "undefined") {
    const current = await getLeads();
    const updated = [newLead, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("vital_crm_updated", { detail: updated }));
  }

  // Intentar guardar en Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, newLead.id);
    await setDoc(docRef, newLead);
  } catch (err) {
    console.warn("No se pudo guardar lead en Firestore (guardado localmente):", err);
  }

  return newLead;
}

export async function updateLeadStatus(id: string, estado: LeadStatus, asesor?: string, notas?: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const current = await getLeads();
    const target = current.find(l => l.id === id);
    if (target) {
      target.estado = estado;
      if (asesor) target.asesor = asesor;
      if (notas) target.notas = notas;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent("vital_crm_updated", { detail: current }));
    }
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updatePayload: Record<string, unknown> = { estado };
    if (asesor) updatePayload.asesor = asesor;
    if (notas) updatePayload.notas = notas;
    await updateDoc(docRef, updatePayload);
    return true;
  } catch {
    return true;
  }
}

export async function deleteLead(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const current = await getLeads();
    const updated = current.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("vital_crm_updated", { detail: updated }));
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch {
    return true;
  }
}
