'use client';

import { motion } from 'motion/react';

export default function AnimalCard({
  id,
  name,
  breed,
  age,
  price,
  image,
  producer,
  location,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group block rounded-2xl border border-stone-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-stone-100">
        {image ? (
          <motion.img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
            <svg className="h-10 w-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.25 }}
          className="absolute right-2 top-2 rounded-lg bg-white/90 px-2.5 py-1 text-sm font-semibold text-amber-700 shadow-sm backdrop-blur-sm"
        >
          S/ {price}
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-stone-800 transition-colors group-hover:text-amber-600">
          {name}
        </h3>
        <p className="mt-0.5 text-sm text-stone-500">
          {breed} · {age}
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {producer}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
