'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, CheckCircle, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

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

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

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
    if (!form.latitude?.trim()) errs.latitude = 'La latitud es obligatoria.';
    if (!form.longitude?.trim()) errs.longitude = 'La longitud es obligatoria.';
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

  const mapsUrl = form.latitude && form.longitude
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
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                Configura tu ubicación para que los compradores te encuentren fácilmente.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address */}
          <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-800">Dirección</h2>
            <p className="mb-5 text-sm text-stone-500">
              Tu dirección se muestra en tu perfil público.
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Dirección completa
                </label>
                <input
                  id="address"
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Ej: Jr. Dos de Mayo 123, Coracora"
                  className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.address
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                )}
              </div>

              <div>
                <label htmlFor="reference" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Punto de referencia <span className="text-stone-400">(opcional)</span>
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

          {/* Coordinates */}
          <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-stone-800">Coordenadas</h2>
            <p className="mb-5 text-sm text-stone-500">
              Ingresa las coordenadas de tu ubicación para mostrarlas en el mapa.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="latitude" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Latitud
                </label>
                <input
                  id="latitude"
                  type="text"
                  value={form.latitude}
                  onChange={(e) => handleChange('latitude', e.target.value)}
                  placeholder="Ej: -15.0183"
                  className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.latitude
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
                  }`}
                />
                {errors.latitude && (
                  <p className="mt-1 text-xs text-red-500">{errors.latitude}</p>
                )}
              </div>

              <div>
                <label htmlFor="longitude" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Longitud
                </label>
                <input
                  id="longitude"
                  type="text"
                  value={form.longitude}
                  onChange={(e) => handleChange('longitude', e.target.value)}
                  placeholder="Ej: -73.7861"
                  className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.longitude
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
                  }`}
                />
                {errors.longitude && (
                  <p className="mt-1 text-xs text-red-500">{errors.longitude}</p>
                )}
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
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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

        {/* Info notice */}
        <p className="mt-6 text-center text-xs text-stone-400">
          Los cambios se guardan localmente. En el futuro podrás sincronizarlos con tu cuenta.
        </p>
      </div>
    </div>
  );
}
