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
  origen: "cotizador_web" | "academia" | "manual" | "campana_ads";
  createdAt: string;
}

const STORAGE_KEY = "vital_seguros_crm_leads_v2";
const COLLECTION_NAME = "leads";

export const INITIAL_MOCK_LEADS: LeadOpportunity[] = [];

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
