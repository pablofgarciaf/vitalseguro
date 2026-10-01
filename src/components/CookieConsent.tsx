"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const cookieConsent = localStorage.getItem("vital_cookie_consent");
    if (cookieConsent === "accepted") {
      setAccepted(true);
    }
  }, []);

  if (!mounted || accepted) return null;

  const handleAccept = () => {
    localStorage.setItem("vital_cookie_consent", "accepted");
    setAccepted(true);
    // Aquí se cargarían scripts de Google Analytics, Facebook Pixel, etc.
  };

  const handleReject = () => {
    localStorage.setItem("vital_cookie_consent", "rejected");
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a1a1f] border-t border-gray-200 dark:border-gray-700 p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              🍪 Cookies y Tecnologías de Seguimiento
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso del sitio y personalizar el contenido. Al continuar navegando, aceptas nuestra{" "}
              <Link href="/privacy" className="text-[#C9A84C] hover:underline">
                Política de Privacidad
              </Link>
              {" "}y{" "}
              <Link href="/legal" className="text-[#C9A84C] hover:underline">
                Aviso Legal
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleReject}
              className="px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="px-3 py-2 text-xs font-medium text-white bg-[#C9A84C] rounded-lg hover:bg-[#B8953F] transition-colors whitespace-nowrap"
            >
              Aceptar
            </button>
            <button
              onClick={handleReject}
              className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
