import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const dmMono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Vital Seguros | Correduría de Ahorro, Vida y Salud",
  description: "Vital Seguros: Cobertura internacional y nacional en planes de ahorro patrimonial, seguros de vida vitalicios y salud medica de alta gama 24/7.",
  icons: {
    icon: "/images/vitalseguros-logo.ico",
  },
};

const themeScript = `(function(){try{var s=localStorage.getItem('gj-theme');var d=s!==null?s==='dark':true;if(d)document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Vital Seguros",
  url: "https://vitalseguros.com",
  logo: "https://vitalseguros.com/images/vitalseguros-logo.webp",
  description: "Correduría y asesoría internacional de seguros especializada en planes de ahorro patrimonial, seguros de vida y salud médica integral 24/7.",
  sameAs: [
    "https://www.instagram.com/gabriel_jacome_seguros_?utm_source=qr&stkn=MTMyeGZzOW13dHJ0MA==",
    "https://www.facebook.com/share/1EaJd4d6Tp/"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+593-99-545-1814",
    contactType: "Customer Service",
    availableLanguage: ["es", "en"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${dmMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/images/vitalseguros-logo.ico" sizes="any" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
