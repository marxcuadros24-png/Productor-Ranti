'use client';

import { motion } from 'motion/react';

export default function ActivityCard({ icon, title, description, time, type = 'default' }) {
  const typeStyles = {
    default: 'border-stone-100',
    sale: 'border-green-100 bg-green-50/50',
    new: 'border-blue-100 bg-blue-50/50',
    alert: 'border-amber-100 bg-amber-50/50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
      className={`flex items-start gap-4 rounded-2xl border p-4 shadow-sm transition-shadow hover:shadow-md ${typeStyles[type]}`}
    >
      {icon && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm"
        >
          {icon}
        </motion.div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-800">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm text-stone-500 line-clamp-2">
            {description}
          </p>
        )}
        {time && (
          <p className="mt-1 text-xs text-stone-400">{time}</p>
        )}
      </div>
    </motion.div>
  );
}
