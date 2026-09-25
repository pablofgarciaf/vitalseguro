"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getStudentProfile, recordLessonCompletion, recordExamResult, StudentAcademyProfile } from "@/lib/academyService";
import { getTrackById, AcademyTrack } from "@/data/academyCourses";
import { 
  ArrowLeft, BookOpen, Calculator, HelpCircle, FileSignature, 
  CheckCircle2, PlayCircle, Lock, ChevronRight 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Grain from "@/components/ui/Grain";

export default function AulaVirtualPage({ params }: { params: Promise<{ moduloId: string }> }) {
  const resolvedParams = use(params);
  const { moduloId: trackId } = resolvedParams;
  
  const { userProfile, loading } = useAuth();
  const router = useRouter();
  
  const [track, setTrack] = useState<AcademyTrack | null>(null);
  const [student, setStudent] = useState<StudentAcademyProfile | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"teoria" | "simulador" | "quiz" | "examen">("teoria");
  
  // Estado para el examen
  const [examStarted, setExamStarted] = useState(false);
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examResult, setExamResult] = useState<{score: number, passed: boolean} | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!userProfile) {
      router.push("/login");
      return;
    }
    
    const t = getTrackById(trackId);
    if (!t) {
      router.push("/academia/dashboard");
      return;
    }
    setTrack(t);

    getStudentProfile(userProfile.email).then(profile => {
      setStudent(profile);
      // Auto-seleccionar primera lección no completada o la primera por defecto
      const prog = profile.progress[trackId];
      if (prog && prog.completedLessons.length > 0) {
        const nextUncompleted = t.lessons.find(l => !prog.completedLessons.includes(l.id));
        setActiveLessonId(nextUncompleted ? nextUncompleted.id : t.lessons[0].id);
      } else {
        setActiveLessonId(t.lessons[0].id);
      }
    });
  }, [userProfile, loading, router, trackId]);

  if (!track || !student || !activeLessonId) return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div></div>
  );

  const activeLesson = track.lessons.find(l => l.id === activeLessonId)!;
  const progress = student.progress[trackId] || { completedLessons: [] };
  const isLessonCompleted = progress.completedLessons.includes(activeLessonId);

  const handleMarkAsDone = async () => {
    const updated = await recordLessonCompletion(
      userProfile!.email,
      track.id,
      track.title,
      activeLessonId,
      track.lessons.length
    );
    setStudent(updated);
    
    // Avanzar a la siguiente si existe
    const currentIndex = track.lessons.findIndex(l => l.id === activeLessonId);
    if (currentIndex < track.lessons.length - 1) {
      setActiveLessonId(track.lessons[currentIndex + 1].id);
      setActiveTab("teoria");
    }
  };

  const submitExam = async () => {
    const totalQ = activeLesson.examQuestions.length;
    let correct = 0;
    
    activeLesson.examQuestions.forEach((q, i) => {
      if (examAnswers[q.id] === q.correctIndex) correct++;
    });
    
    const score = Math.round((correct / totalQ) * 100);
    const updated = await recordExamResult(
      userProfile!.email,
      track.id,
      track.title,
      score,
      `Aciertos: ${correct}/${totalQ} en ${activeLesson.title}`
    );
    
    setStudent(updated);
    setExamResult({ score, passed: score >= 80 });
    
    if (score >= 80) {
      await handleMarkAsDone();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0F] text-zinc-900 dark:text-slate-100 flex flex-col h-screen overflow-hidden selection:bg-[#C9A84C] selection:text-[#0A0A0F] transition-colors duration-500 font-sans">
      <Grain />
      <Navbar />

      {/* Luxury Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="flex-1 flex flex-col md:flex-row pt-[74px] h-full relative z-10 overflow-hidden">
        
        {/* Sidebar / Navegador de Lecciones (Glassmorphism) */}
        <aside className="w-full md:w-80 bg-white/60 dark:bg-white/[0.02] backdrop-blur-3xl border-r border-black/5 dark:border-white/10 flex flex-col h-full overflow-y-auto shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none">
          <div className="p-5 border-b border-black/5 dark:border-white/10 space-y-3 sticky top-0 bg-white/80 dark:bg-[#12121A]/80 backdrop-blur-xl z-10">
            <Link href="/academia/dashboard" className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 font-bold transition-colors">
              <ArrowLeft className="w-3 h-3" /> Volver al Dashboard
            </Link>
            <h2 className="font-serif font-bold text-lg text-zinc-900 dark:text-white leading-tight">{track.title}</h2>
          </div>

          <div className="flex-1 p-3 space-y-1.5">
            {track.lessons.map((lesson, index) => {
              const completed = progress.completedLessons.includes(lesson.id);
              const isActive = lesson.id === activeLessonId;
              const isLocked = index > 0 && !progress.completedLessons.includes(track.lessons[index - 1].id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => { if(!isLocked) { setActiveLessonId(lesson.id); setActiveTab("teoria"); setExamStarted(false); setExamResult(null); } }}
                  disabled={isLocked}
                  className={`w-full text-left p-3 rounded-2xl flex items-start gap-3 transition-all duration-300 ${
                    isActive ? "bg-white dark:bg-[#C9A84C]/10 border border-black/10 dark:border-[#C9A84C]/30 shadow-sm dark:shadow-none" : 
                    isLocked ? "opacity-40 cursor-not-allowed" : 
                    "hover:bg-white/50 dark:hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {completed ? <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> :
                     isActive ? <PlayCircle className="w-5 h-5 text-[#C9A84C]" /> :
                     isLocked ? <Lock className="w-5 h-5 text-zinc-400 dark:text-slate-600" /> :
                     <div className="w-5 h-5 rounded-full border-2 border-zinc-300 dark:border-slate-600" />}
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-slate-300'}`}>
                      Módulo {index + 1}: {lesson.title}
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-slate-500 font-mono mt-1 flex items-center gap-2 font-semibold">
                      <span>{lesson.durationMinutes} min</span>
                      {lesson.level === 'tecnico' && <span className="text-blue-600 dark:text-blue-400">Técnico</span>}
                      {lesson.level === 'comercial' && <span className="text-emerald-600 dark:text-emerald-400">Comercial</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Área Principal */}
        <main className="flex-1 flex flex-col h-full bg-transparent overflow-y-auto">
          
          {/* Tabs Nav */}
          <div className="border-b border-black/5 dark:border-white/10 bg-white/40 dark:bg-[#12121A]/40 backdrop-blur-xl px-6 flex items-end gap-6 overflow-x-auto shrink-0 sticky top-0 z-10 pt-4">
            {[
              { id: "teoria", label: "Guía Teórica", icon: BookOpen },
              { id: "simulador", label: "Simulador", icon: Calculator },
              { id: "examen", label: "Examen Oficial", icon: FileSignature }
            ].map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs font-bold flex items-center gap-2 transition-all border-b-2 whitespace-nowrap ${
                    active ? "text-[#C9A84C] dark:text-[#E0C068] border-[#C9A84C]" : "text-zinc-500 dark:text-slate-400 border-transparent hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Contenido */}
          <div className="p-6 md:p-10 max-w-4xl mx-auto w-full pb-32">
            
            {activeTab === "teoria" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="space-y-4">
                  <div className="inline-block px-3 py-1.5 rounded-md bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10 text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-wider shadow-sm dark:shadow-none">
                    {activeLesson.level === "tecnico" ? "Formación Técnica" : "Formación Comercial"}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-zinc-950 dark:text-white leading-[1.15] tracking-tight">
                    {activeLesson.title}
                  </h1>
                </header>

                {/* Key Takeaways - GEO Capsule (Glassmorphism) */}
                <aside className="p-6 rounded-3xl bg-blue-50/50 dark:bg-blue-500/[0.03] backdrop-blur-xl border border-blue-200 dark:border-blue-500/20 shadow-sm" aria-label="Quick Summary">
                  <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Puntos Clave de esta Lección (Key Takeaways)
                  </h4>
                  <ul className="space-y-3">
                    {activeLesson.keyTakeaways.map((pt, i) => (
                      <li key={i} className="text-xs sm:text-sm text-zinc-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">•</span> {pt}
                      </li>
                    ))}
                  </ul>
                </aside>

                <div 
                  className="prose prose-zinc dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-h3:text-2xl prose-h3:text-[#C9A84C] dark:prose-h3:text-[#E0C068] prose-p:text-zinc-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-zinc-700 dark:prose-li:text-slate-300 prose-strong:text-zinc-900 dark:prose-strong:text-white max-w-none text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: activeLesson.theoryHtml }}
                />

                <div className="pt-10 border-t border-black/5 dark:border-white/10 flex justify-end">
                  <button
                    onClick={() => setActiveTab("simulador")}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#C9A84C]/25 hover:brightness-110"
                  >
                    Ir al Simulador <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "simulador" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-3">
                  <Calculator className="w-12 h-12 text-[#C9A84C] mx-auto mb-2" />
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-950 dark:text-white">{activeLesson.simulatorConfig?.title}</h2>
                  <p className="text-sm text-zinc-600 dark:text-slate-400 max-w-lg mx-auto">{activeLesson.simulatorConfig?.description}</p>
                </div>

                <div className="p-8 md:p-10 rounded-3xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/50 dark:border-[#C9A84C]/30 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-8 relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {activeLesson.simulatorConfig?.fields.map((field, i) => (
                      <div key={i} className="space-y-2">
                        <label className="text-xs font-bold text-zinc-700 dark:text-slate-300">{field.label}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            defaultValue={field.defaultValue}
                            className="w-full bg-white/50 dark:bg-[#0A0A0F]/50 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-xl px-4 py-3.5 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all shadow-inner"
                          />
                          {field.unit && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500 dark:text-slate-500 font-mono font-bold">
                              {field.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-center relative z-10">
                    <div className="text-xs text-blue-700 dark:text-blue-300 font-mono mb-1 font-bold">Fórmula Aplicada:</div>
                    <div className="text-base font-bold text-blue-800 dark:text-blue-400">{activeLesson.simulatorConfig?.formula}</div>
                    <div className="mt-3 text-xs text-blue-600/70 dark:text-slate-400 italic">En un entorno real, estos cálculos los hace el cotizador de VitalSeguros automáticamente.</div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setActiveTab("examen")}
                    className="px-8 py-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 hover:border-[#C9A84C]/50 dark:hover:border-white/20 text-zinc-900 dark:text-white font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    Tomar Examen Oficial <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "examen" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {!examStarted && !examResult && (
                  <div className="text-center space-y-8 py-16 px-6 rounded-3xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-none">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-[#C9A84C]/10 flex items-center justify-center border border-[#C9A84C]/20 shadow-inner">
                      <FileSignature className="w-10 h-10 text-[#C9A84C]" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-serif font-extrabold text-zinc-950 dark:text-white">Examen Oficial del Módulo</h2>
                      <p className="text-zinc-600 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                        Debes obtener al menos 80% (4/5) para aprobar y avanzar. Esta evaluación quedará registrada en tu expediente.
                      </p>
                    </div>
                    <button
                      onClick={() => setExamStarted(true)}
                      className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-lg shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all inline-block"
                    >
                      Comenzar Evaluación
                    </button>
                  </div>
                )}

                {examStarted && !examResult && (
                  <div className="space-y-8">
                    {activeLesson.examQuestions.map((q, qIndex) => (
                      <div key={q.id} className="p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] space-y-6">
                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-relaxed font-serif">
                          <span className="text-[#C9A84C] dark:text-[#E0C068] mr-2">{qIndex + 1}.</span> {q.question}
                        </h3>
                        <div className="space-y-3 pl-2 sm:pl-8">
                          {q.options.map((opt, oIndex) => (
                            <label key={oIndex} className="flex items-start gap-4 cursor-pointer group p-3 sm:p-4 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-all">
                              <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                                <input
                                  type="radio"
                                  name={`q-${q.id}`}
                                  className="peer sr-only"
                                  checked={examAnswers[q.id] === oIndex}
                                  onChange={() => setExamAnswers({...examAnswers, [q.id]: oIndex})}
                                />
                                <div className="w-full h-full rounded-full border-2 border-black/20 dark:border-white/30 peer-checked:border-[#C9A84C] dark:peer-checked:border-[#E0C068] transition-colors bg-white/50 dark:bg-transparent"></div>
                                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C9A84C] dark:bg-[#E0C068] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                              </div>
                              <span className="text-sm text-zinc-700 dark:text-slate-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors leading-relaxed">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={submitExam}
                      disabled={Object.keys(examAnswers).length < activeLesson.examQuestions.length}
                      className="w-full py-4 rounded-xl bg-emerald-500 dark:bg-emerald-600 text-white font-bold text-sm shadow-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Entregar Examen para Calificación
                    </button>
                  </div>
                )}

                {examResult && (
                  <div className="text-center space-y-8 py-16 px-6 max-w-md mx-auto rounded-3xl bg-white/60 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                    {examResult.passed ? (
                      <>
                        <div className="w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto border border-emerald-100 dark:border-emerald-500/20 shadow-inner">
                          <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-serif font-extrabold text-zinc-950 dark:text-white">¡Módulo Aprobado!</h2>
                        <div className="text-5xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{examResult.score}%</div>
                        <p className="text-zinc-600 dark:text-slate-400 text-sm leading-relaxed">El resultado ha sido registrado en tu expediente oficial.</p>
                        
                        <div className="pt-8 space-y-4 border-t border-black/5 dark:border-white/5">
                          <button
                            onClick={handleMarkAsDone}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-lg shadow-[#C9A84C]/25 hover:brightness-110 active:scale-95 transition-all"
                          >
                            Continuar al Siguiente Módulo
                          </button>
                          <Link href="/academia/dashboard/calificaciones" className="block w-full py-4 rounded-xl bg-white/50 dark:bg-white/5 text-zinc-900 dark:text-white font-bold text-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 shadow-sm">
                            Ver Mis Certificados
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-500/20 shadow-inner">
                          <HelpCircle className="w-12 h-12 text-rose-600 dark:text-rose-400" />
                        </div>
                        <h2 className="text-3xl font-serif font-extrabold text-zinc-950 dark:text-white">Examen Reprobado</h2>
                        <div className="text-5xl font-mono font-bold text-rose-600 dark:text-rose-400">{examResult.score}%</div>
                        <p className="text-zinc-600 dark:text-slate-400 text-sm leading-relaxed">Necesitas un mínimo de 80% para aprobar. Revisa el material teórico e inténtalo de nuevo.</p>
                        
                        <div className="pt-8 border-t border-black/5 dark:border-white/5">
                          <button
                            onClick={() => {
                              setExamStarted(false);
                              setExamResult(null);
                              setExamAnswers({});
                              setActiveTab("teoria");
                            }}
                            className="w-full py-4 rounded-xl bg-white/60 dark:bg-white/5 text-zinc-900 dark:text-white font-bold text-sm hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 shadow-sm active:scale-95 flex items-center justify-center gap-2"
                          >
                            <BookOpen className="w-4 h-4" />
                            Repasar Teoría
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
