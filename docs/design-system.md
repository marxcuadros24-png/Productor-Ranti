# Sistema de Diseño - RANTI

> Basado en skill `design-taste-frontend` (Anti-Slop Frontend)

## Design Read
"Reading this as: una plataforma B2C para productores agrícolas peruanos, con un lenguaje visual autentico-andino, apoyado en Tailwind + Geist + paleta de colores inspirada en los Andes (verde profundo, pizarra, tierra cálida)."

## Los 3 Diales
| Dial | Valor | Descripción |
|------|-------|-------------|
| DESIGN_VARIANCE | 6 | Limpio pero con carácter |
| MOTION_INTENSITY | 4 | Micro-interacciones sutiles |
| VISUAL_DENSITY | 5 | Informativo pero no abrumador |

## Paleta de Colores
```css
--primary: #16a34a;        /* Verde principal - productos frescos */
--primary-dark: #15803d;   /* Verde oscuro - vegetación andina */
--primary-light: #dcfce7;  /* Verde claro */
--earth: #92400e;          /* Tierra - conexión con la tierra */
--earth-light: #fef3c7;    /* Tierra claro */
--stone-50: #fafaf9;       /* Fondo - piedra clara */
--stone-800: #292524;      /* Texto - piedra oscura */
--accent: #d97706;         /* Ámbar - sol andino (1 solo acento) */
```

**Regla:** 1 solo color de acento. Saturación < 80%. Nada de "AI-purple".

## Tipografía
- **Font Principal:** Geist Sans (via next/font)
- **Font Mono:** Geist Mono (codigo)
- **NUNCA** Inter como default (usar Geist, Satoshi, Cabinet Grotesk)
- **NUNCA** serif como default (solo si el brand lo exige)
- **NUNCA** Fraunces o Instrument Serif

## Iconos
- **Librería:** `@phosphor-icons/react` (desde `@phosphor-icons/react/dist/ssr`)
- **NUNCA** emojis en UI (salvo que el usuario pida explícitamente vibe playful)
- **NUNCA** SVGs inline hechos a mano para iconos
- **1 familia por proyecto** (no mezclar Phosphor + Lucide)

## Imágenes
- **Prioridad:** Unsplash URLs directas
- **NUNCA** div-based fake screenshots
- **NUNCA** ilustraciones SVG decorativas hechas a mano
- Hero necesita una imagen real, no gradiente + texto

## Layout
- Cards: rounded-2xl, sombras suaves tintadas al fondo
- **NUNCA** 3 columnas iguales de features (usar asymmetrías)
- **NUNCA** `h-screen` (usar `min-h-[100dvh]`)
- **Siempre** CSS Grid, nunca `w-[calc(33%-1rem)]`

## Patrones Prohibidos (AI Tells)
- ❌ Em-dash (`—`) en cualquier parte visible
- ❌ Inter como fuente default
- ❌ AI-purple gradients
- ❌ Emojis en UI
- ❌ Nombres genéricos (John Doe, Acme, SmartFlow)
- ❌ Números falsamente precisos (99.99%, 1234567)
- ❌ Verbos filler (Elevate, Seamless, Unleash, Next-Gen)
- ❌ Versiones en hero (V0.6, BETA, INVITE-ONLY)
- ❌ Scroll cues (animated mouse wheel, "scroll down")
- ❌ `console.log()` en producción

## Componentes UI
- **Cards:** `rounded-2xl`, sombras `shadow-sm`, hover `shadow-md`
- **Botones:** `rounded-xl`, `px-6 py-3`, 1 solo label por intent
- **Inputs:** Label arriba, error abajo, placeholder jamas como label
- **Consistencia:** 1 radio de esquina para todo el proyecto

## Responsive
- Mobile-first, breakpoints: sm(640), md(768), lg(1024), xl(1280)
- Contenedor: `max-w-7xl mx-auto`
- Mobile: `w-full`, `px-4`, single-column

## Accesibilidad (Obligatorio)
- WCAG AA mínimo (4.5:1 contraste)
- `prefers-reduced-motion` en cualquier animación
- Dark mode con `dark:` variant de Tailwind
- Navegación single-line en desktop
