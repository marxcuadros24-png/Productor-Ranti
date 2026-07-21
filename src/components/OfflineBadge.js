'use client';

import { useState, useEffect } from 'react';
import { WifiSlash } from '@phosphor-icons/react/dist/ssr';
import { motion, AnimatePresence } from 'motion/react';

export default function OfflineBadge() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
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

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -12, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -12, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="rounded-2xl border border-green-200 bg-green-50 p-4"
        >
          <div className="flex items-center gap-2">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 15 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow-sm"
            >
              <WifiSlash size={14} weight="bold" />
              SIN CONEXIÓN
            </motion.span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.2 }}
            className="mt-2 text-sm text-green-700"
          >
            Se guardará cuando tengas conexión
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
