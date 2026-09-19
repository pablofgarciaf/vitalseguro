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
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 flex flex-col h-screen overflow-hidden">
      <Grain />
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row pt-20 h-full relative z-10 overflow-hidden">
        
        {/* Sidebar / Navegador de Lecciones */}
        <aside className="w-full md:w-80 bg-[#12121A] border-r border-white/10 flex flex-col h-full overflow-y-auto shrink-0 z-20">
          <div className="p-5 border-b border-white/10 space-y-3 sticky top-0 bg-[#12121A]/90 backdrop-blur">
            <Link href="/academia/dashboard" className="text-[10px] uppercase tracking-wider text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition-colors">
              <ArrowLeft className="w-3 h-3" /> Volver al Dashboard
            </Link>
            <h2 className="font-serif font-bold text-lg text-white leading-tight">{track.title}</h2>
          </div>

          <div className="flex-1 p-3 space-y-1">
            {track.lessons.map((lesson, index) => {
              const completed = progress.completedLessons.includes(lesson.id);
              const isActive = lesson.id === activeLessonId;
              const isLocked = index > 0 && !progress.completedLessons.includes(track.lessons[index - 1].id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => { if(!isLocked) { setActiveLessonId(lesson.id); setActiveTab("teoria"); setExamStarted(false); setExamResult(null); } }}
                  disabled={isLocked}
                  className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all ${
                    isActive ? "bg-[#C9A84C]/10 border border-[#C9A84C]/30" : 
                    isLocked ? "opacity-50 cursor-not-allowed" : 
                    "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
                     isActive ? <PlayCircle className="w-5 h-5 text-[#C9A84C]" /> :
                     isLocked ? <Lock className="w-5 h-5 text-slate-600" /> :
                     <div className="w-5 h-5 rounded-full border-2 border-slate-600" />}
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      Módulo {index + 1}: {lesson.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1 flex items-center gap-2">
                      <span>{lesson.durationMinutes} min</span>
                      {lesson.level === 'tecnico' && <span className="text-blue-400">Técnico</span>}
                      {lesson.level === 'comercial' && <span className="text-emerald-400">Comercial</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Área Principal */}
        <main className="flex-1 flex flex-col h-full bg-[#0A0A0F] overflow-y-auto">
          
          {/* Tabs Nav */}
          <div className="border-b border-white/10 bg-[#12121A] px-6 flex items-end gap-6 overflow-x-auto shrink-0 sticky top-0 z-10 pt-4">
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
                    active ? "text-[#E0C068] border-[#C9A84C]" : "text-slate-400 border-transparent hover:text-white"
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
                <header className="space-y-3">
                  <div className="inline-block px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#C9A84C] uppercase tracking-wider">
                    {activeLesson.level === "tecnico" ? "Formación Técnica" : "Formación Comercial"}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                    {activeLesson.title}
                  </h1>
                </header>

                {/* Key Takeaways - GEO Capsule */}
                <aside className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20" aria-label="Quick Summary">
                  <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Puntos Clave de esta Lección (Key Takeaways)
                  </h4>
                  <ul className="space-y-2">
                    {activeLesson.keyTakeaways.map((pt, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span> {pt}
                      </li>
                    ))}
                  </ul>
                </aside>

                <div 
                  className="prose prose-invert prose-headings:font-serif prose-headings:font-bold prose-h3:text-xl prose-h3:text-[#E0C068] prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-strong:text-white max-w-none"
                  dangerouslySetInnerHTML={{ __html: activeLesson.theoryHtml }}
                />

                <div className="pt-8 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setActiveTab("simulador")}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
                  >
                    Ir al Simulador <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "simulador" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-2">
                  <Calculator className="w-12 h-12 text-[#C9A84C] mx-auto" />
                  <h2 className="text-2xl font-serif font-bold text-white">{activeLesson.simulatorConfig?.title}</h2>
                  <p className="text-sm text-slate-400 max-w-lg mx-auto">{activeLesson.simulatorConfig?.description}</p>
                </div>

                <div className="p-8 rounded-2xl bg-[#12121A] border border-[#C9A84C]/30 shadow-2xl space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeLesson.simulatorConfig?.fields.map((field, i) => (
                      <div key={i} className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">{field.label}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            defaultValue={field.defaultValue}
                            className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                          />
                          {field.unit && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono">
                              {field.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <div className="text-xs text-blue-300 font-mono mb-1">Fórmula Aplicada:</div>
                    <div className="text-sm font-bold text-blue-400">{activeLesson.simulatorConfig?.formula}</div>
                    <div className="mt-3 text-xs text-slate-400 italic">En un entorno real, estos cálculos los hace el cotizador de VitalSeguros automáticamente.</div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveTab("examen")}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
                  >
                    Tomar Examen Oficial <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "examen" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {!examStarted && !examResult && (
                  <div className="text-center space-y-6 py-12">
                    <FileSignature className="w-16 h-16 text-[#C9A84C] mx-auto" />
                    <div className="space-y-2">
                      <h2 className="text-3xl font-serif font-bold text-white">Examen Oficial del Módulo</h2>
                      <p className="text-slate-400 text-sm max-w-md mx-auto">
                        Debes obtener al menos 80% (4/5) para aprobar y avanzar. Esta evaluación quedará registrada en tu expediente.
                      </p>
                    </div>
                    <button
                      onClick={() => setExamStarted(true)}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all inline-block"
                    >
                      Iniciar Evaluación
                    </button>
                  </div>
                )}

                {examStarted && !examResult && (
                  <div className="space-y-8">
                    {activeLesson.examQuestions.map((q, qIndex) => (
                      <div key={q.id} className="p-6 rounded-2xl bg-[#12121A] border border-white/10 space-y-4">
                        <h3 className="text-sm font-bold text-white leading-relaxed">
                          <span className="text-[#C9A84C] mr-2">{qIndex + 1}.</span> {q.question}
                        </h3>
                        <div className="space-y-2 pl-6">
                          {q.options.map((opt, oIndex) => (
                            <label key={oIndex} className="flex items-start gap-3 cursor-pointer group">
                              <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                                <input
                                  type="radio"
                                  name={`q-${q.id}`}
                                  className="peer sr-only"
                                  checked={examAnswers[q.id] === oIndex}
                                  onChange={() => setExamAnswers({...examAnswers, [q.id]: oIndex})}
                                />
                                <div className="w-full h-full rounded-full border border-white/30 peer-checked:border-[#C9A84C] transition-colors"></div>
                                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#C9A84C] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                              </div>
                              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={submitExam}
                      disabled={Object.keys(examAnswers).length < activeLesson.examQuestions.length}
                      className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-sm shadow-xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Entregar Examen para Calificación
                    </button>
                  </div>
                )}

                {examResult && (
                  <div className="text-center space-y-6 py-12 max-w-md mx-auto">
                    {examResult.passed ? (
                      <>
                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-white">¡Módulo Aprobado!</h2>
                        <div className="text-4xl font-mono font-bold text-emerald-400">{examResult.score}%</div>
                        <p className="text-slate-400 text-sm">El resultado ha sido registrado en tu expediente oficial.</p>
                        
                        <div className="pt-6 space-y-3">
                          <button
                            onClick={handleMarkAsDone}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#E0C068] text-[#0A0A0F] font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
                          >
                            Continuar al Siguiente Módulo
                          </button>
                          <Link href="/academia/dashboard/calificaciones" className="block w-full py-3.5 rounded-xl bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-all border border-white/10">
                            Ver Mis Certificados
                          </Link>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-24 h-24 rounded-full bg-rose-500/20 flex items-center justify-center mx-auto">
                          <HelpCircle className="w-12 h-12 text-rose-400" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-white">Examen Reprobado</h2>
                        <div className="text-4xl font-mono font-bold text-rose-400">{examResult.score}%</div>
                        <p className="text-slate-400 text-sm">Necesitas un mínimo de 80% para aprobar. Revisa el material teórico e inténtalo de nuevo.</p>
                        
                        <button
                          onClick={() => { setExamStarted(false); setExamResult(null); setExamAnswers({}); setActiveTab("teoria"); }}
                          className="mt-6 w-full py-3.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all"
                        >
                          Volver a Estudiar
                        </button>
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
