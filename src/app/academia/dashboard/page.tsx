"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getStudentProfile, StudentAcademyProfile } from "@/lib/academyService";
import { ACADEMY_TRACKS } from "@/data/academyCourses";
import { 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  FileText
} from "lucide-react";
import AcademiaSidebar from "@/components/AcademiaSidebar";
import Grain from "@/components/ui/Grain";

export default function DashboardEstudiante() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<StudentAcademyProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    
    if (!userProfile) {
      router.push("/login");
      return;
    }

    async function loadProfile() {
      const profile = await getStudentProfile(userProfile!.email, userProfile!.name);
      setStudent(profile);
      setProfileLoading(false);
    }
    loadProfile();
  }, [userProfile, loading, router]);

  if (profileLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) return null;

  const { readiness } = student;
  
  // Determinar color del semáforo
  const statusColor = 
    readiness.status === "asesor_habilitado" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" :
    readiness.status === "en_certificacion" ? "text-[#E0C068] bg-[#C9A84C]/10 border-[#C9A84C]/20" :
    "text-rose-400 bg-rose-400/10 border-rose-400/20";
    
  const statusLabel = 
    readiness.status === "asesor_habilitado" ? "Asesor Habilitado" :
    readiness.status === "en_certificacion" ? "En Certificación" :
    "En Formación";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-[#C9A84C] selection:text-[#0A0A0F]">
      <Grain />
      
      {/* Sidebar Dedicado de Academia */}
      <AcademiaSidebar />

      {/* Luxury Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative z-10">
        <main className="py-8 px-6 max-w-6xl mx-auto w-full space-y-8">
          
          {/* Cabecera del Estudiante (Glassmorphism) */}
          <header className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-5">
              <div className="relative">
                {/* Avatar Glow */}
                <div className="absolute inset-0 bg-[#C9A84C]/30 blur-xl rounded-full" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] flex items-center justify-center text-2xl font-serif font-bold shadow-lg shadow-[#C9A84C]/20 border-2 border-white/20">
                  {student.displayName.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-white">{student.displayName}</h1>
                <div className="text-sm text-slate-400 font-mono mt-1 flex items-center gap-3">
                  <span>{student.email}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span>Inscrito: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/academia/dashboard/calificaciones"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <Award className="w-4 h-4 text-[#C9A84C]" />
                Mis Certificados
              </Link>
              <Link 
                href="/academia/manuales"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                Manuales
              </Link>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna Izquierda: Semáforo y Métricas */}
            <div className="space-y-6">
              {/* Semáforo de Job Readiness (Glassmorphism) */}
              <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 space-y-6 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Estatus Académico</div>
                
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md ${statusColor}`}>
                  {readiness.status === "asesor_habilitado" ? <ShieldCheck className="w-4 h-4" /> : 
                   readiness.status === "en_certificacion" ? <GraduationCap className="w-4 h-4" /> : 
                   <AlertTriangle className="w-4 h-4" />}
                  <span className="font-bold text-sm tracking-wide">{statusLabel}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div>
                    <div className="text-3xl font-serif font-bold text-white">{readiness.overallProgressPercent}%</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase mt-1">Avance Global</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-white">{readiness.averageGrade}/100</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase mt-1">Nota Promedio</div>
                  </div>
                </div>

                {readiness.missingRequirements.length > 0 && (
                  <div className="pt-6 border-t border-white/5 space-y-3">
                    <div className="text-xs font-bold text-slate-300">Requisitos Pendientes:</div>
                    <ul className="space-y-2">
                      {readiness.missingRequirements.map((req, i) => (
                        <li key={i} className="text-[11px] text-slate-400 flex items-start gap-2 leading-tight">
                          <span className="text-rose-400/70 mt-0.5 shrink-0">•</span> {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* CTA Vender */}
              {readiness.status === "asesor_habilitado" && (
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#12121A] to-[#1A1A24] backdrop-blur-2xl border border-[#C9A84C]/30 text-center space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  <ShieldCheck className="w-12 h-12 text-[#34D399] mx-auto" />
                  <h3 className="font-serif font-bold text-xl text-white">¡Estás listo para vender!</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Ya puedes acceder al cotizador y registrar pólizas en el CRM.</p>
                  <Link href="/" className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-lg shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all">
                    Ir al Cotizador
                  </Link>
                </div>
              )}
            </div>

            {/* Columna Derecha: Tracks Académicos */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#C9A84C]" />
                Tus Programas de Certificación
              </h2>

              <div className="space-y-4">
                {ACADEMY_TRACKS.map(track => {
                  const prog = student.progress[track.id] || { percent: 0, completedLessons: [] };
                  const isCompleted = prog.percent === 100;
                  
                  return (
                    <div key={track.id} className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#C9A84C]/30 transition-all duration-500 flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] group">
                      
                      <div className="flex-1 space-y-4 w-full">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#E0C068] bg-[#C9A84C]/10 px-2.5 py-1 rounded-md border border-[#C9A84C]/20 uppercase tracking-wider">
                            {track.badge}
                          </span>
                          <h3 className="font-serif font-bold text-xl text-white mt-3 group-hover:text-[#C9A84C] transition-colors">{track.title}</h3>
                          <p className="text-sm text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">{track.description}</p>
                        </div>

                        {/* Barra de progreso */}
                        <div className="space-y-2 pt-2">
                          <div className="flex justify-between text-xs font-mono font-semibold">
                            <span className="text-slate-400 uppercase tracking-wide">Progreso</span>
                            <span className={isCompleted ? "text-emerald-400" : "text-white"}>{prog.percent}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-400' : 'bg-gradient-to-r from-[#C9A84C] to-[#E0C068]'}`}
                              style={{ width: `${prog.percent}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-slate-500 text-right">
                            {prog.completedLessons.length} de {track.lessons.length} módulos completados
                          </div>
                        </div>
                      </div>

                      <Link 
                        href={`/academia/${track.id}`}
                        className={`w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                          isCompleted 
                            ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-400/20" 
                            : prog.percent > 0
                              ? "bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] shadow-lg shadow-[#C9A84C]/25 hover:brightness-110"
                              : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {isCompleted ? (
                          <>Repasar <CheckCircle2 className="w-4 h-4" /></>
                        ) : prog.percent > 0 ? (
                          <>Continuar <ArrowRight className="w-4 h-4" /></>
                        ) : (
                          <>Comenzar <PlayCircle className="w-4 h-4" /></>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
