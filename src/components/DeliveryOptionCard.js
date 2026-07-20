'use client';

import { useCallback } from 'react';

const iconMap = {
  house: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  store: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  truck: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
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
          {isSelected && (
            <svg
              className="h-3.5 w-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
