import ProfileCard from './ProfileCard';
import StatCard from './StatCard';
import ButtonCard from './ButtonCard';
import SectionTitle from './SectionTitle';
import ActivityCard from './ActivityCard';
import ProductCard from './ProductCard';

import {
  Plant,
  Cow,
  CalendarBlank,
  Truck,
  ClipboardText,
  UserCircle,
  CheckCircle,
  Package,
} from '@phosphor-icons/react/dist/ssr';

const quickActions = [
  {
    href: '/productos/nuevo',
    icon: <Plant size={24} weight="bold" />,
    title: 'Crear Producto',
    description: 'Publica un nuevo producto agrícola',
    variant: 'primary',
  },
  {
    href: '/animales/nuevo',
    icon: <Cow size={24} weight="bold" />,
    title: 'Crear Animal',
    description: 'Registra un animal en venta',
    variant: 'secondary',
  },
  {
    href: '/disponibilidad',
    icon: <CalendarBlank size={24} weight="bold" />,
    title: 'Disponibilidad',
    description: 'Gestiona tu disponibilidad',
    variant: 'secondary',
  },
  {
    href: '/entrega',
    icon: <Truck size={24} weight="bold" />,
    title: 'Entrega',
    description: 'Configura tus entregas',
    variant: 'secondary',
  },
  {
    href: '/pedidos',
    icon: <ClipboardText size={24} weight="bold" />,
    title: 'Pedidos',
    description: 'Revisa tus pedidos',
    variant: 'secondary',
  },
  {
    href: '/perfil',
    icon: <UserCircle size={24} weight="bold" />,
    title: 'Mi Perfil',
    description: 'Edita tu perfil público',
    variant: 'secondary',
  },
];

const getQuickStats = (dynamicProductCount) => [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    label: 'Productos',
    value: String(dynamicProductCount || 12),
    color: 'green',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    label: 'Animales',
    value: '8',
    color: 'purple',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    label: 'Pedidos',
    value: '45',
    color: 'blue',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    label: 'Valoración',
    value: '4.8',
    color: 'earth',
  },
];

const defaultActivities = [
  {
    icon: <Plant size={18} weight="bold" />,
    title: 'Creaste un nuevo producto',
    description: 'Papa Nativa - 50 kg disponibles',
    time: 'Hace 2 horas',
    type: 'new',
  },
  {
    icon: <CheckCircle size={18} weight="bold" />,
    title: 'Pedido completado',
    description: 'Pedido #0241 - 20 kg de quinua entregado',
    time: 'Hace 1 día',
    type: 'sale',
  },
  {
    icon: <Cow size={18} weight="bold" />,
    title: 'Registraste un animal',
    description: 'Alpaca Huacaya - 2 años',
    time: 'Hace 3 días',
    type: 'default',
  },
  {
    icon: <CalendarBlank size={18} weight="bold" />,
    title: 'Disponibilidad actualizada',
    description: 'Disponible para entregas los lunes y viernes',
    time: 'Hace 5 días',
    type: 'alert',
  },
  {
    icon: <Package size={18} weight="bold" />,
    title: 'Stock actualizado',
    description: 'Actualizaste el inventario de productos',
    time: 'Hace 1 semana',
    type: 'default',
  },
];

export default function ProducerDashboard({
  productor = {},
  savedProducts = [],
  savedActivities = [],
  dynamicProductCount,
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Saludo */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
          ¡Bienvenido, Productor!
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Gestiona tus productos, animales y más desde tu panel de control.
        </p>
      </div>

      {/* Profile Card */}
      <ProfileCard
        name={productor.name}
        location={productor.location}
        image={productor.image}
        rating={productor.rating}
        reviewCount={productor.reviewCount}
        description={productor.description}
        memberSince={productor.memberSince}
        productCount={productor.productCount}
        animalCount={productor.animalCount}
      />

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {getQuickStats(dynamicProductCount).map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <section className="mt-10">
        <SectionTitle
          title="Acciones Rápidas"
          subtitle="¿Qué quieres hacer hoy?"
        />
        <div className="mt-5 grid gap-4 grid-cols-2 sm:gap-5 sm:grid-cols-3">
          {quickActions.map((action) => (
            <ButtonCard key={action.href} {...action} />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-10 mb-6">
        <SectionTitle
          title="Actividad Reciente"
          subtitle="Últimos movimientos en tu cuenta"
        />
        <div className="mt-5 space-y-3">
          {[...savedActivities, ...defaultActivities].map((activity, i) => (
            <ActivityCard key={i} {...activity} />
          ))}
        </div>
      </section>

      {/* Mis Productos — show saved products */}
      {savedProducts.length > 0 && (
        <section className="mt-10 mb-6">
          <SectionTitle
            title="Mis Productos"
            subtitle={`${savedProducts.length} producto${savedProducts.length > 1 ? 's' : ''} registrado${savedProducts.length > 1 ? 's' : ''}`}
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.nombre || product.name}
                price={product.precio ?? product.price}
                unit={product.unit}
                image={product.image}
                producer={product.producer || 'Tú'}
                location={product.location || 'Cusco, Perú'}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
