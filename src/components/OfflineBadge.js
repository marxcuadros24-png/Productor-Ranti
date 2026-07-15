'use client';

import { useState, useEffect } from 'react';
import { WifiSlash } from '@phosphor-icons/react/dist/ssr';

export default function OfflineBadge() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOffline(typeof navigator !== 'undefined' && !navigator.onLine);

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <WifiSlash size={14} weight="bold" />
          SIN CONEXIÓN
        </span>
      </div>
      <p className="mt-2 text-sm text-green-700">
        Se guardará cuando tengas conexión
      </p>
    </div>
  );
}
