'use client';

import { useRouter } from 'next/navigation';
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr';
import CalendarCard from '@/components/CalendarCard';
import AvailabilityProductCard from '@/components/AvailabilityProductCard';
import SaveAvailabilityButton from '@/components/SaveAvailabilityButton';
import { availabilityProducts } from '@/lib/availability-data';

export default function DisponibilidadPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ============================== */}
        {/* HEADER                        */}
        {/* ============================== */}
        <div className="mb-2 flex items-center gap-3">
          {/* Back arrow */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-200/50 hover:text-stone-900"
            aria-label="Regresar"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
              Disponibilidad
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-1 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5">
            <CalendarBlank size={16} weight="bold" className="text-green-700" />
            <span className="text-sm font-medium text-green-700">Calendario</span>
          </div>
        </div>

        {/* Green divider */}
        <div className="mb-6 mt-4 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-40" />

        {/* ============================== */}
        {/* CALENDAR                      */}
        {/* ============================== */}
        <section className="mb-8">
          <CalendarCard />
        </section>

        {/* ============================== */}
        {/* PRODUCTOS & FRECUENCIA         */}
        {/* ============================== */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-stone-800">
            Productos y frecuencia
          </h2>
          <p className="mb-5 text-sm text-stone-500">
            Selecciona los días en los que estarás disponible para cada producto.
          </p>
          <div className="space-y-3">
            {availabilityProducts.map((product) => (
              <AvailabilityProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ============================== */}
        {/* SAVE BUTTON                   */}
        {/* ============================== */}
        <section className="pb-8">
          <SaveAvailabilityButton />
        </section>
      </div>
    </div>
  );
}
