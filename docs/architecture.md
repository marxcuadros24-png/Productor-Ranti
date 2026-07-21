# Arquitectura del Proyecto

## Estructura de Carpetas
```
ranti/
├── src/
│   ├── app/               # App Router (páginas)
│   │   ├── layout.js      # Layout raíz
│   │   ├── page.js        # Página de inicio
│   │   └── globals.css    # Estilos globales
│   ├── components/        # Componentes reutilizables
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilidades y helpers
│   └── styles/            # Estilos adicionales
├── public/                # Archivos estáticos
└── docs/                  # Documentación del proyecto
```

## Principios de Arquitectura
1. **Server Components** por defecto (App Router)
2. Componentes pequeños y reutilizables
3. Imports absolutos con `@/`
4. Responsive design mobile-first
5. UI moderna enfocada en productores

## Convenciones
- Archivos JS (no TS)
- Componentes en `/components/`
- Páginas en `/app/` con nombre descriptivo
- Hooks personalizados en `/hooks/`
- Utilidades en `/lib/`
