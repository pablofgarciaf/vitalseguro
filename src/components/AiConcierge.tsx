"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, PhoneCall, ChevronRight } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function AiConcierge() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "¡Hola! Soy tu Asesor Inteligente de Vital Seguros. Estoy aquí para aclarar cualquier duda sobre las pólizas de Vida y Salud de BMI Companies. ¿En qué te puedo asesorar hoy?"
    }
  ]);

  const quickQuestions = [
    "¿Cómo funciona el piso garantizado del 1% en Vida?",
    "¿Puedo atenderme en EE.UU. con el seguro de salud?",
    "¿En qué año puedo retirar mi dinero acumulado?",
    "¿Qué hospitales cubren en Ecuador y en el exterior?"
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const newMsgs: Message[] = [...messages, { sender: "user", text: q }];
    setMessages(newMsgs);
    if (!textToSend) setInput("");

    setTimeout(() => {
      let reply = "";
      const lower = q.toLowerCase();

      if (lower.includes("piso") || lower.includes("1%") || lower.includes("mercado") || lower.includes("cae")) {
        reply = "En los planes indexados como 'Best Indexed 100 BMII S&P 500', tu capital cuenta con un piso garantizado del 1.0%. Si el índice S&P 500 o NASDAQ tiene un año negativo, tu póliza NUNCA pierde dinero; en el peor de los casos ganas el 1% y en los años positivos capturas hasta el 100% del rendimiento.";
      } else if (lower.includes("ee.uu") || lower.includes("estados unidos") || lower.includes("salud") || lower.includes("clinica")) {
        reply = "Los planes de salud como Meridian II y Azure ofrecen cobertura médica global. Tienes acceso directo a centros como Johns Hopkins, Mayo Clinic y Cleveland Clinic en EE.UU. Además, en Ecuador o Latinoamérica, ¡tu deducible se reduce al 50%!";
      } else if (lower.includes("retirar") || lower.includes("rescate") || lower.includes("dinero") || lower.includes("tiempo")) {
        reply = "A partir del año 6 el valor de rescate comienza a liberarse, y del año 15 en adelante el 100% del fondo acumulado está disponible en efectivo líquido, pudiendo realizar retiros o préstamos sin perder tu cobertura.";
      } else if (lower.includes("hospital") || lower.includes("ecuador") || lower.includes("cobertura")) {
        reply = "En Ecuador, Vital Seguros y BMI cuentan con convenio directo con los mejores hospitales del país: Hospital Metropolitano, Hospital Vozandes, Omnihospital y Clínica Kennedy, con cartas de garantía directa sin desembolso.";
      } else {
        reply = "Con gusto. En Vital Seguros adaptamos cada plan a tu presupuesto y edad. Si deseas una corrida actuarial oficial, puedes solicitar una videollamada con un consultor senior.";
      }

      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Botón Circular Flotante Único (Sin textos ridículos) */}
      {!chatOpen && (
        <div className="relative">
          {/* Menú Desplegable Popup */}
          {menuOpen && (
            <div className="absolute bottom-16 right-0 w-64 rounded-2xl bg-white dark:bg-[#0D0D13] border border-black/10 dark:border-[#C9A84C]/25 shadow-2xl p-2.5 space-y-1.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <a
                href="https://wa.me/593995451814?text=Hola%20VitalSeguros,%20deseo%20asesoria%20personalizada%20en%20seguros"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs">WhatsApp Directo</div>
                  <div className="text-[10px] text-zinc-400">Hablar con un Asesor</div>
                </div>
              </a>

              <button
                type="button"
                onClick={() => { setMenuOpen(false); setChatOpen(true); }}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7B2C] text-slate-950 flex items-center justify-center font-bold shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs">Asistente IA Concierge</div>
                  <div className="text-[10px] text-zinc-400">Respuestas al instante</div>
                </div>
              </button>
            </div>
          )}

          {/* Launcher Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-[#C9A84C] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/20"
            aria-label="Abrir opciones de contacto"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div className="w-[90vw] sm:w-[380px] h-[520px] rounded-3xl border border-black/10 dark:border-[#C9A84C]/25 bg-white dark:bg-[#08080C] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0D0D13] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs">Concierge Inteligente</h4>
                <p className="text-[10px] text-zinc-400">Vital Seguros • Especialista BMI</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setChatOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-50 dark:bg-[#08080C]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#C9A84C] text-slate-950 font-medium rounded-tr-none shadow-sm"
                      : "bg-white dark:bg-[#0D0D13] text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 rounded-tl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Pills */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono text-zinc-400 block mb-2 font-semibold">
                Preguntas frecuentes:
              </span>
              <div className="space-y-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="w-full text-left p-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0D0D13] hover:border-[#C9A84C]/50 text-[11px] text-zinc-700 dark:text-zinc-300 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>{q}</span>
                    <ChevronRight className="w-3 h-3 text-zinc-400 group-hover:text-[#C9A84C]" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action to Contact Advisor */}
          <div className="px-4 py-2 bg-zinc-100 dark:bg-[#0D0D13] border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">¿Prefieres un asesor humano?</span>
            <a
              href="https://wa.me/593995451814?text=Hola,%20tengo%20preguntas%20sobre%20las%20polizas%20de%20VitalSeguros"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C] font-bold hover:underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#08080C] border-t border-zinc-200 dark:border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pregunta sobre coberturas, deducibles..."
              className="flex-1 px-3.5 py-2 rounded-xl text-xs border border-zinc-200 dark:border-white/15 bg-slate-50 dark:bg-[#0D0D13] text-zinc-900 dark:text-white outline-none focus:border-[#C9A84C]"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-[#C9A84C] text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
