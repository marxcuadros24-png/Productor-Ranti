'use client';

import { Cow, Dog, PiggyBank, Bird } from '@phosphor-icons/react/dist/ssr';

const CATEGORIES = [
  { value: 'vacuno', label: 'Vacuno', icon: <Cow size={18} weight="fill" /> },
  { value: 'ovino', label: 'Ovino', icon: <Dog size={18} weight="fill" /> },
  { value: 'porcino', label: 'Porcino', icon: <PiggyBank size={18} weight="fill" /> },
  { value: 'aves', label: 'Aves', icon: <Bird size={18} weight="fill" /> },
];

export default function AnimalCategorySelector({ value, onChange, error }) {
  return (
    <div>
      <label className="text-sm font-semibold text-stone-700">Categoría</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const selected = value === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onChange(cat.value)}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                selected
                  ? 'border-green-300 bg-green-50 text-green-700 shadow-sm'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span className={selected ? 'text-green-600' : 'text-stone-400'}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
