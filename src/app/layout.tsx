import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const dmMono = DM_Mono({ variable: "--font-dm-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitalseguros.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vital Seguros | Correduría de Ahorro, Vida y Salud",
    template: "%s | Vital Seguros",
  },
  description: "Vital Seguros: Cobertura internacional y nacional en planes de ahorro patrimonial, seguros de vida vitalicios y salud medica de alta gama 24/7.",
  icons: {
    icon: "/images/vitalseguros-logo.ico",
    apple: "/images/vitalseguros-logo.webp",
  },
  openGraph: {
    title: "Vital Seguros | Correduría de Ahorro, Vida y Salud",
    description: "Vital Seguros: Cobertura internacional y nacional en planes de ahorro patrimonial, seguros de vida vitalicios y salud medica de alta gama 24/7.",
    url: siteUrl,
    siteName: "Vital Seguros",
    images: [
      {
        url: "/images/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Vital Seguros - Familia protegida con seguros de salud, vida y ahorro",
        type: "image/jpeg",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vital Seguros | Correduría de Ahorro, Vida y Salud",
    description: "Vital Seguros: Cobertura internacional y nacional en planes de ahorro patrimonial, seguros de vida vitalicios y salud medica de alta gama 24/7.",
    images: ["/images/og-hero.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Vital Seguros",
  url: "https://vitalseguros.com",
  logo: "https://vitalseguros.com/images/vitalseguros-logo.webp",
  description: "Correduría y asesoría internacional de seguros especializada en planes de ahorro patrimonial, seguros de vida y salud médica integral 24/7.",
  sameAs: [
    "https://www.instagram.com/vitalseguros_ec",
    "https://www.facebook.com/share/1EaJd4d6Tp/"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+593-99-545-1814",
    contactType: "Customer Service",
    availableLanguage: ["es", "en"],
  },
};

import { AuthProvider } from "@/context/AuthContext";
import CookieConsent from "@/components/CookieConsent";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${dmMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
