'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'ranti-productor-config';

function loadSavedData(initialData) {
  if (typeof window === 'undefined') return initialData;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...initialData, ...JSON.parse(saved) };
    }
  } catch {}
  return initialData;
}

export default function ConfigForm({ initialData }) {
  const savedDefaults = loadSavedData(initialData);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: savedDefaults,
    mode: 'onBlur',
  });

  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageUrl = watch('image');

  // Clear saved feedback after 3s
  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const onSubmit = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaved(true);
    } catch {
      // storage full
    }
  };

  const handleReset = () => {
    reset(initialData);
    setImgError(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Profile Photo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-stone-800">Foto de Perfil</h2>
        <p className="mb-5 text-sm text-stone-500">
          Tu foto se mostrará en tu perfil público y en tus productos.
        </p>

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* Preview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative h-28 w-28 overflow-hidden rounded-2xl bg-stone-100 shadow-sm"
          >
            {imageUrl && !imgError ? (
              <img
                src={imageUrl}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  className="h-10 w-10 text-stone-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </motion.div>

          {/* URL Input */}
          <div className="flex-1 self-stretch">
            <label
              htmlFor="image"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              URL de la imagen
            </label>
            <input
              id="image"
              type="url"
              {...register('image')}
              onFocus={() => setImgError(false)}
              placeholder="https://ejemplo.com/mi-foto.jpg"
              autoComplete="url"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
            />
            <p className="mt-1.5 text-xs text-stone-400">
              Usa una imagen de Unsplash, Imgur o cualquier URL pública.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-stone-800">
          Información Personal
        </h2>
        <p className="mb-6 text-sm text-stone-500">
          Estos datos se muestran en tu perfil público como productor.
        </p>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-stone-700">
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: 'El nombre es obligatorio.',
                minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
              })}
              placeholder="Tu nombre"
              autoComplete="name"
              className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-stone-700">
              Ubicación
            </label>
            <input
              id="location"
              type="text"
              {...register('location', {
                required: 'La ubicación es obligatoria.',
              })}
              placeholder="Provincia, Departamento, Perú"
              autoComplete="address-level1"
              className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.location
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
              }`}
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
            )}
            <p className="mt-1.5 text-xs text-stone-400">
              Ej: Parinacochas, Ayacucho, Perú
            </p>
          </div>

          {/* Description */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="description" className="block text-sm font-medium text-stone-700">
                Descripción
              </label>
              <span
                className={`text-xs ${
                  (watch('description') || '').length > 500
                    ? 'text-red-500'
                    : 'text-stone-400'
                }`}
              >
                {(watch('description') || '').length}/500
              </span>
            </div>
            <textarea
              id="description"
              rows={4}
              {...register('description', {
                maxLength: { value: 500, message: 'La descripción no puede superar los 500 caracteres.' },
              })}
              placeholder="Cuéntanos sobre ti, tus productos y tu historia como productor..."
              className={`w-full resize-none rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="button"
          onClick={handleReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="order-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition-all hover:border-stone-300 hover:text-stone-800 sm:order-1"
        >
          Restablecer valores
        </motion.button>

        <div className="order-1 flex items-center gap-3 sm:order-2">
          {/* Feedback toast */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 shadow-sm"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Guardado correctamente
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isSubmitting || !isDirty}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Guardando...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Guardar cambios
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Info notice */}
      <p className="text-center text-xs text-stone-400">
        Los cambios se guardan localmente en tu navegador. En el futuro podrás
        sincronizarlos con tu cuenta.
      </p>
    </form>
  );
}
