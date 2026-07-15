'use client';

import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import ProductForm from '@/components/ProductForm';

export default function NuevoProductoPage() {
  return (
    <div className="mx-auto min-h-screen max-w-[700px] px-4 py-6 sm:px-0">
      {/* Header with back button */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-700"
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-xl font-bold text-stone-800">Nuevo Producto</h1>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm sm:p-6">
        <ProductForm />
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-20 md:h-6" />
    </div>
  );
}
