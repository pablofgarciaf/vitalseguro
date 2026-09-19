import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface CommissionRates {
  vida: number;         // 60% por defecto (Ramo Estrella)
  viaje: number;        // 35% por defecto (Asistencia al Viajero)
  salud: number;        // 25% por defecto (Seguro Médico Internacional y Local)
  auto: number;         // 18% por defecto (Seguro Vehicular)
  corporativo: number;  // 20% por defecto (Pólizas Colectivas y Pymes)
  updatedAt: string;
  updatedBy: string;
}

export const DEFAULT_COMMISSION_RATES: CommissionRates = {
  vida: 60,
  viaje: 35,
  salud: 25,
  auto: 18,
  corporativo: 20,
  updatedAt: new Date().toISOString(),
  updatedBy: "Sistema Oficial Vital Seguros"
};

const STORAGE_KEY = "vital_seguros_commission_rates";
const FIRESTORE_DOC_PATH = { collection: "configuracion", doc: "comisiones" };

export async function getCommissionRates(): Promise<CommissionRates> {
  // 1. Intentar leer desde Firebase Firestore
  try {
    const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.doc);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as Partial<CommissionRates>;
      const merged: CommissionRates = {
        vida: typeof data.vida === "number" ? data.vida : DEFAULT_COMMISSION_RATES.vida,
        viaje: typeof data.viaje === "number" ? data.viaje : DEFAULT_COMMISSION_RATES.viaje,
        salud: typeof data.salud === "number" ? data.salud : DEFAULT_COMMISSION_RATES.salud,
        auto: typeof data.auto === "number" ? data.auto : DEFAULT_COMMISSION_RATES.auto,
        corporativo: typeof data.corporativo === "number" ? data.corporativo : DEFAULT_COMMISSION_RATES.corporativo,
        updatedAt: data.updatedAt || new Date().toISOString(),
        updatedBy: data.updatedBy || "Administrador Vital"
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
      return merged;
    }
  } catch (err) {
    console.warn("Firestore offline o restringido, usando fallback local:", err);
  }

  // 2. Fallback a LocalStorage en el cliente
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as CommissionRates;
      }
    } catch {
      // Ignorar errores de JSON parse
    }
  }

  // 3. Fallback a constantes por defecto
  return DEFAULT_COMMISSION_RATES;
}

export async function saveCommissionRates(rates: CommissionRates): Promise<{ success: boolean; error?: string }> {
  const payload: CommissionRates = {
    ...rates,
    updatedAt: new Date().toISOString()
  };

  // 1. Guardar en LocalStorage para disponibilidad inmediata
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent("vital_commissions_updated", { detail: payload }));
  }

  // 2. Guardar en Firebase Firestore
  try {
    const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.doc);
    await setDoc(docRef, payload, { merge: true });
    return { success: true };
  } catch (err: unknown) {
    console.warn("No se pudo sincronizar en Firestore (usando persistencia local):", err);
    return { success: true, error: "Guardado en caché local (Firestore pendiente de sincronización)" };
  }
}
