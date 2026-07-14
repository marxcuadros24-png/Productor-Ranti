# Changelog - RANTI

## [0.3.0] - 2026-07-13
### Changed
- Página de inicio (`/`) rediseñada como **Panel de Control del Productor**
- Eliminado el perfil público como página principal (ahora es Dashboard)

### Added
- Nuevo componente `ProducerDashboard` con:
  - Saludo de bienvenida
  - Perfil del productor (ProfileCard)
  - Estadísticas rápidas (StatCard)
  - 8 botones de acción con navegación:
    - Crear Producto → `/productos/nuevo`
    - Crear Animal → `/animales/nuevo`
    - Disponibilidad → `/disponibilidad`
    - Entrega → `/entrega`
    - Pedidos → `/pedidos`
    - Rutas → `/rutas`
    - Marketplace → `/marketplace`
    - Mi Perfil → `/perfil`
  - Actividad reciente (ActivityCard)

## [0.2.0] - 2026-07-13
### Changed
- Refactorizada arquitectura del perfil con datos centralizados en `lib/productor-data.js`

### Added
- Imágenes Unsplash en cards

## [0.1.0] - 2026-07-13
### Added
- Configuración inicial del proyecto y componentes base
