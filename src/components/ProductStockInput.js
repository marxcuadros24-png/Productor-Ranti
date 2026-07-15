'use client';

const UNIT_LABELS = {
  kg: 'kg',
  unidad: 'unidades',
  caja: 'cajas',
  litro: 'litros',
};

export default function ProductStockInput({ stock, unit, onStockChange, error }) {
  const unitLabel = UNIT_LABELS[unit] || 'unidades';

  return (
    <div>
      <label className="text-sm font-semibold text-stone-700">Stock disponible</label>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => onStockChange(e.target.value)}
            placeholder="0"
            className={`w-full rounded-xl border py-2.5 pl-3 pr-16 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              error
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-stone-400">
            {unitLabel}
          </span>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
