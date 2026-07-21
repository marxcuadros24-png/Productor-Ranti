'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export default function BannerCard({
  title,
  description,
  actionLabel,
  actionHref,
  color = 'green',
}) {
  const colors = {
    green: 'bg-gradient-to-br from-green-600 to-green-700 text-white',
    earth: 'bg-gradient-to-br from-amber-600 to-amber-700 text-white',
    dark: 'bg-gradient-to-br from-stone-800 to-stone-900 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-sm sm:p-8 ${colors[color]}`}
    >
      {/* Background pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5"
      />

      <div className="relative">
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-xl font-bold sm:text-2xl"
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="mt-2 max-w-md text-sm opacity-90 sm:text-base"
          >
            {description}
          </motion.p>
        )}
        {actionLabel && actionHref && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-4"
          >
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30"
            >
              {actionLabel}
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
