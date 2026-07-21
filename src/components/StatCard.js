'use client';

import { motion } from 'motion/react';

export default function StatCard({ icon, label, value, color = 'green' }) {
  const colors = {
    green: 'bg-green-50 text-green-600',
    earth: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}
        >
          {icon}
        </motion.div>
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-2xl font-bold text-stone-800"
          >
            {value}
          </motion.p>
          <p className="text-sm text-stone-500">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
