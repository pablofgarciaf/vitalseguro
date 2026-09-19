"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getStudentProfile, StudentAcademyProfile } from "@/lib/academyService";
import { ArrowLeft, Award, CheckCircle2, XCircle, FileBadge } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grain from "@/components/ui/Grain";

export default function CalificacionesPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<StudentAcademyProfile | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!userProfile) {
      router.push("/login");
      return;
    }
    getStudentProfile(userProfile.email).then(setStudent);
  }, [userProfile, loading, router]);

  if (!student) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100">
      <Grain />
      <Navbar />

      <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto space-y-8 relative z-10">
        <Link href="/academia/dashboard" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#C9A84C] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Dashboard
        </Link>

        <header className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
            <Award className="w-8 h-8 text-[#C9A84C]" />
            Boletín de Calificaciones
          </h1>
          <p className="text-sm text-slate-400">
            Historial de evaluaciones y certificados de {student.displayName}
          </p>
        </header>

        {/* Certificados Oficiales */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-2">Certificaciones Oficiales</h2>
          {student.certifications.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-white/10 rounded-xl text-slate-500 text-sm">
              Aún no has obtenido ninguna certificación.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.certifications.map(cert => (
                <div key={cert.id} className="p-5 bg-gradient-to-br from-[#C9A84C]/10 to-transparent border border-[#C9A84C]/30 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                    <Award className="w-16 h-16 text-[#C9A84C]" />
                  </div>
                  <FileBadge className="w-6 h-6 text-[#E0C068]" />
                  <h3 className="font-bold text-white text-sm pr-12">{cert.title}</h3>
                  <div className="space-y-1 text-xs font-mono text-slate-400">
                    <p>Emisión: {new Date(cert.issuedDate).toLocaleDateString()}</p>
                    <p className="truncate" title={cert.verificationHash}>Hash: {cert.verificationHash.substring(0, 24)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Historial de Evaluaciones */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-white border-b border-white/10 pb-2">Historial de Exámenes</h2>
          {student.grades.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-white/10 rounded-xl text-slate-500 text-sm">
              No hay registro de evaluaciones.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#12121A]">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white/5 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Módulo</th>
                    <th className="px-4 py-3 text-center">Intento</th>
                    <th className="px-4 py-3 text-right">Nota</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {student.grades.map(grade => (
                    <tr key={grade.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-slate-300">{new Date(grade.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-white font-medium">{grade.courseTitle}</td>
                      <td className="px-4 py-3 text-center text-slate-400">#{grade.attemptNumber}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-white">{grade.score}/100</td>
                      <td className="px-4 py-3 flex justify-center">
                        {grade.passed ? (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" /> Aprobado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded">
                            <XCircle className="w-3 h-3" /> Reprobado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>
      <Footer />
    </div>
  );
}
