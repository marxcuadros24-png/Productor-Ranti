import Link from 'next/link';
import ProfileCard from './ProfileCard';
import StatCard from './StatCard';
import ProductCard from './ProductCard';
import AnimalCard from './AnimalCard';
import ActivityCard from './ActivityCard';
import SectionTitle from './SectionTitle';
import BannerCard from './BannerCard';

export default function ProducerProfile({
  productor = {},
  stats = [],
  products = [],
  animals = [],
  activities = [],
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Profile Header */}
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

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/pedidos/nuevo"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md active:scale-[0.98] sm:w-auto sm:px-8 sm:py-3 sm:text-base"
        >
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Solicitar Pedido
        </Link>
      </div>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="mt-12">
          <SectionTitle
            title="Productos"
            subtitle="Productos agrícolas disponibles"
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      )}

      {/* Animals Section */}
      {animals.length > 0 && (
        <section className="mt-12">
          <SectionTitle
            title="Animales"
            subtitle="Ganado y animales en venta"
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} {...animal} />
            ))}
          </div>
        </section>
      )}

      {/* Activities Section */}
      {activities.length > 0 && (
        <section className="mt-12">
          <SectionTitle
            title="Actividad Reciente"
            subtitle="Últimas publicaciones y movimientos"
          />
          <div className="mt-5 space-y-3">
            {activities.map((activity, i) => (
              <ActivityCard key={i} {...activity} />
            ))}
          </div>
        </section>
      )}

      {/* Contact Banner */}
      <section className="mt-12 mb-6">
        <BannerCard
          title="¿Interesado en sus productos?"
          description="Contacta directamente con la comunidad y realiza tus pedidos de forma segura."
          actionLabel="Enviar Mensaje"
          actionHref="/pedidos/nuevo"
          color="green"
        />
      </section>
    </div>
  );
}
