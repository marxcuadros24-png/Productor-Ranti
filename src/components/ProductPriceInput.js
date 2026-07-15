'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr';

const UNITS = [
  { value: 'kg', label: 'Por kg' },
  { value: 'unidad', label: 'Por unidad' },
  { value: 'caja', label: 'Por caja' },
  { value: 'litro', label: 'Por litro' },
];

export default function ProductPriceInput({ price, unit, onPriceChange, onUnitChange, error }) {
  return (
    <div>
      <label className="text-sm font-semibold text-stone-700">Precio</label>
      <div className="mt-1.5 flex gap-2">
        {/* Price input */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-stone-400">
            S/
          </span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="0.00"
            className={`w-full rounded-xl border py-2.5 pl-8 pr-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              error
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
        </div>

        {/* Unit selector */}
        <div className="relative">
          <select
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            className={`appearance-none rounded-xl border py-2.5 pl-3 pr-8 text-sm text-stone-700 outline-none transition-all ${
              error
                ? 'border-red-300 bg-red-50'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
          <CaretDown
            size={14}
            weight="bold"
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
