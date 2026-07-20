'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck } from '@phosphor-icons/react/dist/ssr';
import DeliveryOptionCard from '@/components/DeliveryOptionCard';
import DeliveryInstructions from '@/components/DeliveryInstructions';
import SaveDeliveryButton from '@/components/SaveDeliveryButton';

const deliveryOptions = [
  {
    value: 'recojo',
    icon: 'house',
    title: 'Recojo en chacra / puesto',
    description:
      'El comprador recoge el producto en tu chacra o puesto de venta.',
    iconColor: 'green',
  },
  {
    value: 'coracora',
    icon: 'store',
    title: 'Entrega en Coracora',
    description:
      'Tú entregas el producto en un punto de encuentro en Coracora.',
    iconColor: 'orange',
  },
  {
    value: 'transportista',
    icon: 'truck',
    title: 'Envío por transportista',
    description:
      'Envías el producto por la empresa de transporte de tu preferencia.',
    iconColor: 'brown',
  },
];

const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=300&fit=crop&auto=format';

export default function EntregaPage() {
  const router = useRouter();
  const [tipoEntrega, setTipoEntrega] = useState('');
  const [indicaciones, setIndicaciones] = useState('');

  return (
    <div className="min-h-screen bg-stone-50">
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

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <Truck size={18} weight="bold" />
            </div>
            <h1 className="text-xl font-bold text-stone-800 sm:text-2xl">
              Opciones de entrega
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mb-6 mt-4">
          <h2 className="text-lg font-semibold text-stone-800 sm:text-xl">
            Elige cómo entregarás tus productos
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
            Configura las modalidades disponibles para tus compradores.
          </p>
        </div>

        {/* Green divider */}
        <div className="mb-8 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-40" />

        {/* ============================== */}
        {/* DELIVERY OPTIONS              */}
        {/* ============================== */}
        <section className="mb-8" role="radiogroup" aria-label="Opciones de entrega">
          <div className="space-y-4">
            {deliveryOptions.map((option) => (
              <DeliveryOptionCard
                key={option.value}
                {...option}
                selected={tipoEntrega}
                onSelect={setTipoEntrega}
              />
            ))}
          </div>
        </section>

        {/* ============================== */}
        {/* DELIVERY INSTRUCTIONS         */}
        {/* ============================== */}
        <section className="mb-8">
          <DeliveryInstructions
            value={indicaciones}
            onChange={setIndicaciones}
          />
        </section>

        {/* ============================== */}
        {/* BANNER IMAGE                  */}
        {/* ============================== */}
        <section className="mb-8">
          <div className="overflow-hidden rounded-xl shadow-sm">
            <img
              src={BANNER_IMAGE}
              alt="Campo de cultivo - productos agrícolas"
              className="h-[150px] w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        {/* ============================== */}
        {/* SAVE BUTTON                   */}
        {/* ============================== */}
        <section className="pb-8">
          <SaveDeliveryButton
            tipoEntrega={tipoEntrega}
            indicaciones={indicaciones}
          />
        </section>
      </div>
    </div>
  );
}
