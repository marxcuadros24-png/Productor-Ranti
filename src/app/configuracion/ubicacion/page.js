'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MapPin,
  MagnifyingGlass,
  Crosshair,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';

const STORAGE_KEY = 'ranti-ubicacion';

function loadSavedData() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

const DEFAULT_LOCATION = {
  address: 'Coracora, Parinacochas, Ayacucho, Perú',
  reference: 'Cerca a la Plaza de Armas',
  latitude: '-15.0183',
  longitude: '-73.7861',
};

export default function UbicacionPage() {
  const [form, setForm] = useState(() => loadSavedData() || { ...DEFAULT_LOCATION });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  // Autocomplete state
  const [query, setQuery] = useState(form.address || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Limpiar feedback después de 3s
  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  // Búsqueda con debounce
  function handleQueryChange(value) {
    setQuery(value);
    setForm((prev) => ({ ...prev, address: value }));

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setSuggestions(data.suggestions || []);
        setIsOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }

  // Seleccionar una sugerencia
  function handleSelect(suggestion) {
    setQuery(suggestion.display_name);
    setForm((prev) => ({
      ...prev,
      address: suggestion.display_name,
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    }));
    setIsOpen(false);
    setSuggestions([]);
    if (errors.address) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.address;
        return next;
      });
    }
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validate() {
    const errs = {};
    if (!form.address?.trim()) errs.address = 'La dirección es obligatoria.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
      } catch {}
      setSaving(false);
      setSaved(true);
    }, 600);
  }

  const mapsUrl =
    form.latitude && form.longitude
      ? `https://www.google.com/maps?q=${form.latitude},${form.longitude}`
      : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/perfil"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-green-600"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a Perfil
        </Link>
      </div>

      <div className="mx-auto max-w-[650px]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <MapPin size={20} weight="bold" className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
                Ubicación GPS
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                Busca tu dirección y las coordenadas se obtendrán automáticamente.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address with Autocomplete */}
          <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-800">
              Buscar dirección
            </h2>
            <p className="mb-5 text-sm text-stone-500">
              Escribe tu dirección y selecciona la opción correcta. Las
              coordenadas se completarán solas.
            </p>

            <div className="space-y-5">
              {/* Autocomplete Input */}
              <div ref={wrapperRef} className="relative">
                <label
                  htmlFor="address-search"
                  className="mb-1.5 block text-sm font-medium text-stone-700"
                >
                  Dirección
                </label>
                <div className="relative">
                  <input
                    id="address-search"
                    type="text"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder="Ej: Coracora, Parinacochas, Ayacucho"
                    autoComplete="off"
                    className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 pl-10 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.address
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                        : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
                    }`}
                  />
                  <MagnifyingGlass
                    size={16}
                    weight="bold"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="h-4 w-4 animate-spin text-stone-400"
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
                    </div>
                  )}
                </div>
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}

                {/* Suggestions dropdown */}
                {isOpen && suggestions.length > 0 && (
                  <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg">
                    {suggestions.map((s, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => handleSelect(s)}
                          className="flex w-full gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-green-50"
                        >
                          <MapPin
                            size={16}
                            weight="bold"
                            className="mt-0.5 shrink-0 text-stone-400"
                          />
                          <span className="text-stone-700">
                            {s.display_name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Punto de referencia */}
              <div>
                <label
                  htmlFor="reference"
                  className="mb-1.5 block text-sm font-medium text-stone-700"
                >
                  Punto de referencia{' '}
                  <span className="text-stone-400">(opcional)</span>
                </label>
                <input
                  id="reference"
                  type="text"
                  value={form.reference || ''}
                  onChange={(e) => handleChange('reference', e.target.value)}
                  placeholder="Ej: Frente a la iglesia, al costado del mercado"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>
          </div>

          {/* Coordinates (auto, readonly) */}
          <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-800">
              Coordenadas
            </h2>
            <p className="mb-5 text-sm text-stone-500">
              Se completan automáticamente al seleccionar una dirección.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-700">
                  Latitud
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-4 py-2.5 text-sm text-stone-500">
                  <Crosshair size={14} weight="bold" className="text-green-500" />
                  {form.latitude || '—'}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stone-700">
                  Longitud
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-4 py-2.5 text-sm text-stone-500">
                  <Crosshair size={14} weight="bold" className="text-green-500" />
                  {form.longitude || '—'}
                </div>
              </div>
            </div>

            {/* Google Maps Link */}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
              >
                <MagnifyingGlass size={16} weight="bold" />
                Ver en Google Maps
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/perfil"
              className="rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition-all hover:border-stone-300 hover:text-stone-800"
            >
              Cancelar
            </Link>

            {saved && (
              <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 shadow-sm">
                <CheckCircle size={16} weight="bold" />
                Ubicación guardada
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
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
                  <MapPin size={16} weight="bold" />
                  Guardar ubicación
                </>
              )}
            </button>
          </div>
        </form>

        {/* Powered by */}
        <p className="mt-6 text-center text-xs text-stone-400">
          Búsqueda por{' '}
          <a
            href="https://locationiq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 underline transition-colors hover:text-stone-700"
          >
            LocationIQ
          </a>
          . Los cambios se guardan localmente.
        </p>
      </div>
    </div>
  );
}
