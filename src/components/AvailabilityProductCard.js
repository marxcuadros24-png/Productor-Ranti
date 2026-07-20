import { useMemo } from 'react';

import { Check, CalendarCheck, Clock } from '@phosphor-icons/react/dist/ssr';

const frequencyStyles = {
  daily: 'bg-green-100 text-green-700 border-green-200',
  weekly: 'bg-amber-100 text-amber-700 border-amber-200',
  'weekly-alt': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'on-demand': 'bg-stone-100 text-stone-600 border-stone-200',
};

const frequencyIcons = {
  daily: <Check size={14} weight="bold" />,
  weekly: <CalendarCheck size={14} weight="bold" />,
  'weekly-alt': <CalendarCheck size={14} weight="bold" />,
  'on-demand': <Clock size={14} weight="bold" />,
};

export default function AvailabilityProductCard({ product }) {
  const style = useMemo(
    () => frequencyStyles[product.frequencyType] || frequencyStyles['on-demand'],
    [product.frequencyType],
  );

  const icon = useMemo(
    () => frequencyIcons[product.frequencyType] || frequencyIcons['on-demand'],
    [product.frequencyType],
  );

  return (
    <div className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 sm:p-5">
      {/* Image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:h-20 sm:w-20">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-stone-100">
            <svg className="h-6 w-6 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-stone-800 transition-colors group-hover:text-green-700">
          {product.name}
        </h3>
        <p className="mt-0.5 text-sm text-stone-500">{product.description}</p>
      </div>

      {/* Frequency Badge */}
      <div className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold ${style}`}>
        {icon}
        <span>{product.frequency}</span>
      </div>
    </div>
  );
}
