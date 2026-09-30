# 🌌 Estandarización Global de Modo Oscuro Luxury: Negro Obsidiana Warm (`#08080C`)

Este documento certifica y detalla la unificación estética visual del modo oscuro en todo el ecosistema de **Vital Seguros**, erradicando los fondos azulados/marinos residuales e implantando el tono cálido y cinematográfico de alta gama inspirado en el bloque de testimonios de élite.

Sincronizado con: [[02_Cotizador_Salud_Vida_Alan]] y [[BMI_PRODUCTOS_RAMOS_CALCULOS]].

---

## 🎨 1. Fundamentos de Paleta de Color (Modo Oscuro A+)

| Token / Elemento | Código Hexadecimal | Propósito Visual |
| :--- | :--- | :--- |
| **Canvas / Background Principal** | `#08080C` | Negro obsidiana puro con sutil calidez ambarina. Cero tintes azulados o fríos. |
| **Superficie de Tarjetas (Cards)** | `#0D0D13` / `#08080C]/80` | Capa de elevación con `backdrop-blur` y contraste sutil sobre el fondo principal. |
| **Bordes Luxury** | `rgba(201, 168, 76, 0.25)` (`#C9A84C/25`) | Marco dorado ultradelgado que otorga distinción y alta legibilidad. |
| **Glow & Iluminación Ambiental** | `radial-gradient #C9A84C/5` | Halos dorados desenfocados (`blur-3xl`) que recrean profundidad de lente anamórfica. |
| **Controles Select / Dropdowns** | `#08080C` (fondo) / `#1A1A24` (hover) | Integración armónica en formularios interactivos sin saltos de color. |

---

## 🗺️ 2. Diagrama de Arquitectura de Estilos Unificados

```mermaid
graph TD
    A[globals.css: --bg-main #08080C] --> B[Páginas Públicas]
    A --> C[Ecosistema Academia]
    A --> D[Módulos CRM & Admin]
    
    subgraph Públicas
        B --> B1[Hero & Película Gradual]
        B --> B2[BentoGrid: Arquitectura de Cobertura]
        B --> B3[Cotizadores Salud & Vida Alan Style]
        B --> B4[Testimonios & Social Proof]
        B --> B5[Contacto & Redes Oficiales]
        B --> B6[Blog & Pólizas Individuales /seguros/slug]
    end
    
    subgraph Academia & Aula
        C --> C1[/academia Landing]
        C --> C2[/academia/moduloId Aula Virtual]
        C --> C3[/academia/dashboard]
        C --> C4[/academia/manuales]
        C --> C5[/academia/dashboard/calificaciones]
    end
    
    subgraph Control Interno
        D --> D1[/admin Master CRM]
        D --> D2[/admin/configuracion Tasas]
        D --> D3[/login & /cambiar-clave]
    end
```

---

## 💎 3. Archivos y Rutas Estandarizadas al 100%

1. **Estilos Globales:** [`src/app/globals.css`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/globals.css) (eliminado `radial-gradient` azul, fijado `--bg-main: #08080C`).
2. **Landing Page y Componentes Core:**
   - [`src/components/Hero.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/Hero.tsx)
   - [`src/components/Intro.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/Intro.tsx)
   - [`src/components/Statement.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/Statement.tsx)
   - [`src/components/BentoGrid.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/BentoGrid.tsx)
   - [`src/components/CotizadorSalud.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/CotizadorSalud.tsx)
   - [`src/components/CotizadorVida.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/CotizadorVida.tsx)
   - [`src/components/Testimonials.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/Testimonials.tsx)
   - [`src/components/Contact.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/Contact.tsx)
   - [`src/components/Navbar.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/Navbar.tsx)
   - [`src/components/Footer.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/Footer.tsx)
   - [`src/components/AiConcierge.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/components/AiConcierge.tsx)
3. **Subpáginas y Flujos Transaccionales:**
   - [`src/app/seguros/[slug]/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/seguros/[slug]/page.tsx)
   - [`src/app/cotizador-bmi/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/cotizador-bmi/page.tsx)
   - [`src/app/blog/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/blog/page.tsx) y [`src/app/blog/[slug]/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/blog/[slug]/page.tsx)
   - [`src/app/trabaja-con-nosotros/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/trabaja-con-nosotros/page.tsx)
   - [`src/app/academia/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/academia/page.tsx) y [`src/app/academia/[moduloId]/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/academia/[moduloId]/page.tsx)
   - [`src/app/academia/dashboard/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/academia/dashboard/page.tsx)
   - [`src/app/academia/manuales/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/academia/manuales/page.tsx)
   - [`src/app/academia/dashboard/calificaciones/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/academia/dashboard/calificaciones/page.tsx)
   - [`src/app/admin/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/admin/page.tsx) y [`src/app/admin/configuracion/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/admin/configuracion/page.tsx)
   - [`src/app/login/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/login/page.tsx) y [`src/app/cambiar-clave/page.tsx`](file:///c:/Users/pablo/OneDrive/Desktop/proyectos%20web/vital%20seguros/src/app/cambiar-clave/page.tsx)
