'use client';

import { useState, useCallback } from 'react';

export default function SaveAvailabilityButton() {
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const showToastWithTimeout = useCallback(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3200);
  }, []);

  const handleSave = useCallback(() => {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      showToastWithTimeout();
    }, 800);
  }, [showToastWithTimeout]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Toast notification */}
      <div
        className={`overflow-hidden rounded-xl transition-all duration-300 ease-in-out ${
          showToast
            ? 'max-h-20 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-center gap-2.5 rounded-xl bg-green-50 px-5 py-3 shadow-sm ring-1 ring-green-200">
          <svg
            className="h-5 w-5 shrink-0 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium text-green-800">
            Disponibilidad guardada correctamente.
          </span>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px] sm:px-10"
      >
        {saving ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Guardando...
          </>
        ) : (
          <>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Guardar disponibilidad
          </>
        )}
      </button>
    </div>
  );
}
