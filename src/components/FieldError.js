'use client';

import { motion, AnimatePresence } from 'motion/react';

export default function FieldError({ error, className = '' }) {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.p
          key={error}
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={`mt-1 overflow-hidden text-xs text-red-500 ${className}`}
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
