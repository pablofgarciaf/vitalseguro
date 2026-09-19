/**
 * academyService.ts — Motor central del LMS de VitalSeguros
 * Gestiona perfiles de estudiante, progreso, exámenes y certificaciones.
 * Patrón dual: Firestore + localStorage fallback (consistente con crmService.ts)
 */

import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// ─── Tipos ───────────────────────────────────────────────

export type AcademicStatus = "en_formacion" | "en_certificacion" | "asesor_habilitado";

export interface CourseProgress {
  courseId: string;
  courseTitle: string;
  completedLessons: string[];   // IDs: ['l1', 'l2', ...]
  totalLessons: number;
  percent: number;              // 0–100
  lastAccessedAt: string;       // ISO
}

export interface QuizAttemptRecord {
  id: string;
  quizId: string;
  courseId: string;
  courseTitle: string;
  score: number;          // 0–100
  passed: boolean;        // score >= 80
  attemptNumber: number;
  date: string;           // ISO
  feedback: string;
}

export interface CertificationRecord {
  id: string;
  courseCode: string;
  title: string;
  issuedDate: string;
  verificationHash: string;  // sha256-...
}

export interface JobReadinessMetrics {
  status: AcademicStatus;
  overallProgressPercent: number;
  averageGrade: number;
  certificationsCount: number;
  isEligible: boolean;
  missingRequirements: string[];
}

export interface StudentAcademyProfile {
  email: string;
  displayName: string;
  enrollmentDate: string;
  progress: Record<string, CourseProgress>;
  grades: QuizAttemptRecord[];
  certifications: CertificationRecord[];
  readiness: JobReadinessMetrics;
}

// ─── Constantes ──────────────────────────────────────────

const STORAGE_KEY = "vital_academy_student";
const COLLECTION = "usuarios";

// ─── Perfil por Defecto ──────────────────────────────────

function createDefaultProfile(email: string, name: string): StudentAcademyProfile {
  return {
    email,
    displayName: name || "Estudiante",
    enrollmentDate: new Date().toISOString(),
    progress: {},
    grades: [],
    certifications: [],
    readiness: {
      status: "en_formacion",
      overallProgressPercent: 0,
      averageGrade: 0,
      certificationsCount: 0,
      isEligible: false,
      missingRequirements: [
        "Progreso global ≥ 80%",
        "Nota media ≥ 80%",
        "Al menos 1 certificación aprobada"
      ]
    }
  };
}

// ─── Hash SHA-256 para Certificaciones ───────────────────

async function generateHash(input: string): Promise<string> {
  if (typeof window === "undefined") return "sha256-server";
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return "sha256-" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ─── Lectura del Perfil Académico ────────────────────────

export async function getStudentProfile(email: string, name?: string): Promise<StudentAcademyProfile> {
  const cleanEmail = email.toLowerCase().trim();

  // 1. Intentar Firestore
  try {
    const docRef = doc(db, COLLECTION, cleanEmail);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data.academyProfile) {
        const profile = data.academyProfile as StudentAcademyProfile;
        // Guardar en caché local
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        }
        return profile;
      }
    }
  } catch (err) {
    console.warn("Firestore academy profile inaccesible, usando fallback:", err);
  }

  // 2. Intentar localStorage
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as StudentAcademyProfile;
        if (parsed.email === cleanEmail) return parsed;
      }
    } catch { /* ignorar */ }
  }

  // 3. Crear perfil nuevo
  const profile = createDefaultProfile(cleanEmail, name || "");
  await saveStudentProfile(profile);
  return profile;
}

// ─── Persistencia del Perfil ─────────────────────────────

export async function saveStudentProfile(profile: StudentAcademyProfile): Promise<void> {
  const cleanEmail = profile.email.toLowerCase().trim();

  // Guardar en localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent("vital_academy_updated", { detail: profile }));
  }

  // Guardar en Firestore (merge con documento existente)
  try {
    const docRef = doc(db, COLLECTION, cleanEmail);
    await setDoc(docRef, { academyProfile: profile }, { merge: true });
  } catch (err) {
    console.warn("No se pudo guardar perfil académico en Firestore:", err);
  }
}

// ─── Registrar Lección Completada ────────────────────────

export async function recordLessonCompletion(
  email: string,
  courseId: string,
  courseTitle: string,
  lessonId: string,
  totalLessons: number
): Promise<StudentAcademyProfile> {
  const student = await getStudentProfile(email);

  // Inicializar progreso del curso si no existe
  if (!student.progress[courseId]) {
    student.progress[courseId] = {
      courseId,
      courseTitle,
      completedLessons: [],
      totalLessons,
      percent: 0,
      lastAccessedAt: new Date().toISOString()
    };
  }

  const courseProgress = student.progress[courseId];

  // Evitar duplicados
  if (!courseProgress.completedLessons.includes(lessonId)) {
    courseProgress.completedLessons.push(lessonId);
  }

  courseProgress.totalLessons = totalLessons;
  courseProgress.percent = Math.round(
    (courseProgress.completedLessons.length / totalLessons) * 100
  );
  courseProgress.lastAccessedAt = new Date().toISOString();

  // Recalcular elegibilidad
  recalculateReadiness(student);

  await saveStudentProfile(student);
  return student;
}

// ─── Registrar Resultado de Examen ───────────────────────

export async function recordExamResult(
  email: string,
  courseId: string,
  courseTitle: string,
  score: number,
  feedback: string
): Promise<StudentAcademyProfile> {
  const student = await getStudentProfile(email);
  const passed = score >= 80;

  // Contar intentos previos para este curso
  const previousAttempts = student.grades.filter(g => g.courseId === courseId).length;

  const attempt: QuizAttemptRecord = {
    id: `quiz-${Date.now()}`,
    quizId: `exam-${courseId}`,
    courseId,
    courseTitle,
    score,
    passed,
    attemptNumber: previousAttempts + 1,
    date: new Date().toISOString(),
    feedback
  };

  student.grades.push(attempt);

  // Si aprobó y no tiene certificado previo para este curso, generar
  if (passed) {
    const alreadyCertified = student.certifications.some(c => c.courseCode === courseId);
    if (!alreadyCertified) {
      const hashInput = `${student.email}|${courseId}|${score}|${new Date().toISOString()}`;
      const hash = await generateHash(hashInput);

      student.certifications.push({
        id: `cert-${Date.now()}`,
        courseCode: courseId,
        title: `Certificación: ${courseTitle}`,
        issuedDate: new Date().toISOString(),
        verificationHash: hash
      });
    }
  }

  // Recalcular elegibilidad
  recalculateReadiness(student);

  await saveStudentProfile(student);
  return student;
}

// ─── Semáforo de Elegibilidad "Asesor Habilitado" ────────

export function recalculateReadiness(student: StudentAcademyProfile): void {
  const courses = Object.values(student.progress);
  const missing: string[] = [];

  // 1. Progreso global promedio
  let overallProgress = 0;
  if (courses.length > 0) {
    overallProgress = Math.round(
      courses.reduce((sum, c) => sum + c.percent, 0) / courses.length
    );
  }

  // 2. Nota media
  let averageGrade = 0;
  if (student.grades.length > 0) {
    averageGrade = Math.round(
      student.grades.reduce((sum, g) => sum + g.score, 0) / student.grades.length
    );
  }

  // 3. Certificaciones
  const certsCount = student.certifications.length;

  // Evaluar requisitos
  if (overallProgress < 80) missing.push(`Progreso global: ${overallProgress}% (mínimo 80%)`);
  if (averageGrade < 80) missing.push(`Nota media: ${averageGrade}% (mínimo 80%)`);
  if (certsCount < 1) missing.push("Al menos 1 certificación aprobada");

  // Determinar estado
  let status: AcademicStatus = "en_formacion";
  let isEligible = false;

  if (missing.length === 0) {
    status = "asesor_habilitado";
    isEligible = true;
  } else if (overallProgress >= 50 || certsCount >= 1) {
    status = "en_certificacion";
  }

  student.readiness = {
    status,
    overallProgressPercent: overallProgress,
    averageGrade,
    certificationsCount: certsCount,
    isEligible,
    missingRequirements: missing
  };
}

// ─── Resetear Progreso (Admin/Debug) ─────────────────────

export async function resetStudentProgress(email: string): Promise<StudentAcademyProfile> {
  const student = await getStudentProfile(email);
  const fresh = createDefaultProfile(student.email, student.displayName);
  fresh.enrollmentDate = student.enrollmentDate; // mantener fecha original
  await saveStudentProfile(fresh);
  return fresh;
}
