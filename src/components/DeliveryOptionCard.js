'use client';

import { House, Storefront, Truck, Check } from '@phosphor-icons/react/dist/ssr';
import { useCallback } from 'react';

const iconMap = {
  house: <House size={24} weight="bold" />,
  store: <Storefront size={24} weight="bold" />,
  truck: <Truck size={24} weight="bold" />,
};

const colorMap = {
  green: 'text-green-700 bg-green-50',
  orange: 'text-amber-600 bg-amber-50',
  brown: 'text-stone-600 bg-stone-100',
};

export default function DeliveryOptionCard({
  value,
  icon,
  title,
  description,
  iconColor,
  selected,
  onSelect,
}) {
  const isSelected = selected === value;

  const handleClick = useCallback(() => {
    onSelect(value);
  }, [value, onSelect]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(value);
      }
    },
    [value, onSelect],
  );

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition-all sm:p-6 ${
        isSelected
          ? 'border-green-500 bg-green-50/50 shadow-md'
          : 'border-stone-100 bg-white shadow-sm hover:border-green-200 hover:shadow-md'
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
          colorMap[iconColor] || colorMap.green
        } ${isSelected ? 'scale-105' : ''}`}
      >
        {iconMap[icon] || iconMap.house}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3
          className={`text-base font-semibold transition-colors sm:text-lg ${
            isSelected ? 'text-green-800' : 'text-stone-800'
          }`}
        >
          {title}
        </h3>
        <p className="mt-0.5 text-sm leading-relaxed text-stone-500">
          {description}
        </p>
      </div>

      {/* Radio indicator */}
      <div className="shrink-0">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
            isSelected
              ? 'border-green-600 bg-green-600'
              : 'border-stone-300 group-hover:border-stone-400'
          }`}
        >
          {isSelected && <Check size={14} weight="bold" className="text-white" />}
        </div>
      </div>
    </div>
  );
}
