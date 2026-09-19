"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  type User as FirebaseUser 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: "super" | "admin" | "asesor" | "estudiante";
  status: "active" | "suspended";
  phone?: string;
  ciudad?: string;
  comisionPersonal?: number; // Para asesores personalizados
  createdAt: string;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; role: string; error?: string }>;
  register: (data: { name: string; email: string; pass: string; phone?: string; ciudad?: string; role?: "asesor" | "estudiante" }) => Promise<{ success: boolean; error?: string }>;
  loginDemo: (role: "admin" | "asesor" | "estudiante") => void;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MASTER_ACCOUNTS: Record<string, { pass: string; name: string; role: "super" | "admin" | "asesor" }> = {
  "pablofgarciaf@gmail.com": { pass: "1721790721", name: "Pablo F. García", role: "super" },
  "admin@vitalseguros.com": { pass: "admin2026", name: "Director VitalSeguros", role: "admin" },
  "asesor@vitalseguros.com": { pass: "asesor2026", name: "Martina Paz (Asesora Senior)", role: "asesor" }
};

const STORAGE_KEY = "vital_auth_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Revisar sesión en localStorage de respaldo
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        try {
          setUserProfile(JSON.parse(cached));
        } catch {
          // Ignorar
        }
      }
    }

    // 2. Escuchar sesión en Firebase Auth
    try {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        setCurrentUser(fbUser);
        if (fbUser && fbUser.email) {
          const cleanEmail = fbUser.email.toLowerCase().trim();
          try {
            const docSnap = await getDoc(doc(db, "usuarios", cleanEmail));
            if (docSnap.exists()) {
              const prof = docSnap.data() as UserProfile;
              setUserProfile(prof);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(prof));
            } else if (MASTER_ACCOUNTS[cleanEmail]) {
              const prof: UserProfile = {
                uid: fbUser.uid,
                email: cleanEmail,
                name: MASTER_ACCOUNTS[cleanEmail].name,
                role: MASTER_ACCOUNTS[cleanEmail].role,
                status: "active",
                createdAt: new Date().toISOString()
              };
              setUserProfile(prof);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(prof));
            }
          } catch {
            // Modo offline
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; role: string; error?: string }> => {
    const cleanEmail = email.toLowerCase().trim();

    // 1. Master Passwords / Bypass rápido
    if (MASTER_ACCOUNTS[cleanEmail] && MASTER_ACCOUNTS[cleanEmail].pass === pass) {
      const prof: UserProfile = {
        uid: "master-" + Date.now(),
        email: cleanEmail,
        name: MASTER_ACCOUNTS[cleanEmail].name,
        role: MASTER_ACCOUNTS[cleanEmail].role,
        status: "active",
        createdAt: new Date().toISOString()
      };
      setUserProfile(prof);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prof));
      }
      return { success: true, role: prof.role };
    }

    // 2. Intento con Firebase Auth
    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      const docSnap = await getDoc(doc(db, "usuarios", cleanEmail));
      let prof: UserProfile;
      if (docSnap.exists()) {
        prof = docSnap.data() as UserProfile;
      } else {
        prof = {
          uid: cred.user.uid,
          email: cleanEmail,
          name: cleanEmail.split("@")[0],
          role: "asesor",
          status: "active",
          createdAt: new Date().toISOString()
        };
      }
      setUserProfile(prof);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prof));
      }
      return { success: true, role: prof.role };
    } catch (err: unknown) {
      const error = err as { message?: string };
      // Fallback amigable
      return { success: false, role: "none", error: error?.message || "Credenciales incorrectas" };
    }
  };

  const register = async (data: { name: string; email: string; pass: string; phone?: string; ciudad?: string; role?: "asesor" | "estudiante" }): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = data.email.toLowerCase().trim();
    try {
      let uid = "usr-" + Date.now();
      try {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, data.pass);
        uid = cred.user.uid;
      } catch {
        // Continuar con UID local si Firebase Auth bloquea o no tiene registro público abierto
      }

      const prof: UserProfile = {
        uid,
        email: cleanEmail,
        name: data.name,
        role: data.role || "asesor",
        status: "active",
        phone: data.phone,
        ciudad: data.ciudad,
        createdAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, "usuarios", cleanEmail), prof);
      } catch {
        // Guardado local
      }

      setUserProfile(prof);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prof));
      }
      return { success: true };
    } catch (err: unknown) {
      const error = err as { message?: string };
      return { success: false, error: error?.message || "Error al crear cuenta" };
    }
  };

  const loginDemo = (role: "admin" | "asesor" | "estudiante") => {
    const demos: Record<string, UserProfile> = {
      admin: {
        uid: "demo-admin",
        email: "admin@vitalseguros.com",
        name: "Gabriel Jácome (Director)",
        role: "admin",
        status: "active",
        createdAt: new Date().toISOString()
      },
      asesor: {
        uid: "demo-asesor",
        email: "asesor@vitalseguros.com",
        name: "Martina Paz (Asesora Senior 60%)",
        role: "asesor",
        status: "active",
        createdAt: new Date().toISOString()
      },
      estudiante: {
        uid: "demo-estudiante",
        email: "alumno@escuelaviajes.com",
        name: "Carlos Mendoza (Estudiante Viajes & Seguros)",
        role: "estudiante",
        status: "active",
        createdAt: new Date().toISOString()
      }
    };

    const prof = demos[role];
    setUserProfile(prof);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prof));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // Ignorar
    }
    setUserProfile(null);
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const isAdmin = userProfile?.role === "super" || userProfile?.role === "admin";

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, login, register, loginDemo, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
