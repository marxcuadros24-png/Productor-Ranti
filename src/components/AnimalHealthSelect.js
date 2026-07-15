'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr';

const HEALTH_OPTIONS = [
  { value: 'Excelente', label: 'Excelente', color: 'text-green-600' },
  { value: 'Bueno', label: 'Bueno', color: 'text-blue-600' },
  { value: 'Regular', label: 'Regular', color: 'text-amber-600' },
  { value: 'En tratamiento', label: 'En tratamiento', color: 'text-orange-600' },
  { value: 'Crítico', label: 'Crítico', color: 'text-red-600' },
];

export default function AnimalHealthSelect({ value, onChange, error }) {
  const selectedColor = HEALTH_OPTIONS.find((o) => o.value === value)?.color || 'text-stone-700';

  return (
    <div>
      <label className="text-sm font-semibold text-stone-700">Estado de Salud</label>
      <div className="relative mt-1.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={`w-full appearance-none rounded-xl border py-2.5 pl-3 pr-10 text-sm outline-none transition-all ${
            selectedColor
          } ${
            error
              ? 'border-red-300 bg-red-50'
              : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
          }`}
        >
          {HEALTH_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <CaretDown
          size={14}
          weight="bold"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
