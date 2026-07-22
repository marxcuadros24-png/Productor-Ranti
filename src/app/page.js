'use client';

import { useState, useEffect } from 'react';
import ProducerDashboard from '@/components/ProducerDashboard';
import { loadProductorData } from '@/lib/productor-data';

export default function Home() {
  const [productor, setProductor] = useState(null);

  useEffect(() => {
    setProductor(loadProductorData());
  }, []);

  // Mientras carga, muestra un placeholder
  if (!productor) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 rounded-xl bg-stone-200" />
          <div className="h-64 rounded-2xl bg-stone-100" />
        </div>
      </div>
    );
  }

  return <ProducerDashboard productor={productor} />;
}
