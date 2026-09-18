import { NextResponse } from 'next/server';

const context = `Eres Aurea, concierge digital de Gabriel Jácome. Tu objetivo es ayudar a personas a entender cuál cobertura o inversión les conviene y guiarlas hacia una cotización con Gabriel Jácome, priorizando ventas y conversión. Responde en español, con tono sobrio, cálido y persuasivo. Haz preguntas útiles de una en una. No inventes precios, coberturas, exclusiones ni tiempos. No pidas datos sensibles. Si el usuario muestra interés en comprar o cotizar, invita a dejar nombre y un canal de contacto mediante el formulario de asesoría. Mantén las respuestas centradas en el contexto del cliente; evita frases genéricas.`;

async function generateWithGemini(message: string) {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (!geminiKey) throw new Error('No Gemini API key');

  const model = process.env.GEMINI_MODEL?.trim() || 'gemini-flash-latest';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${geminiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: context }] },
      contents: [{ role: 'user', parts: [{ text: message }] }],
      generationConfig: { temperature: 0.45, maxOutputTokens: 220 }
    })
  });

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text || '').join('').trim();
  
  if (!response.ok || !reply) {
    throw new Error(`Gemini request failed: ${JSON.stringify(data)}`);
  }
  return reply;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (!message || message.trim().length > 1400) {
      return NextResponse.json({ error: 'Consulta inválida o muy extensa.' }, { status: 400 });
    }

    // In a real app, you would fallback between Groq/Gemini here like the original code.
    // Assuming the user has GEMINI_API_KEY in .env, we'll try Gemini for this example.
    const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());
    if (!hasGemini) {
       // Mock response if no keys exist so the UI doesn't crash on testing
       return NextResponse.json({ reply: 'Hola, mi sistema de IA no está configurado (Falta GEMINI_API_KEY en .env), pero Gabriel Jácome estará encantado de ayudarte. ¡Pide una asesoría!' });
    }

    const reply = await generateWithGemini(message.trim());
    return NextResponse.json({ reply });
    
  } catch (error: any) {
    console.error('Concierge Error:', error);
    return NextResponse.json(
      { error: 'En este momento no puedo responder. Un asesor puede preparar tu propuesta.' },
      { status: 502 }
    );
  }
}
