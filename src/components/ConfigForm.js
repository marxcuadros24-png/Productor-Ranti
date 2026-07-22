'use client';

import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'ranti-productor-config';
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

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
  const [form, setForm] = useState(() => loadSavedData(initialData));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [imgError, setImgError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  // Clear saved feedback after 3s
  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'image') {
      setImgError(false);
      setUploadError('');
      setFileName(''); // Limpiar nombre de archivo al escribir URL
    }
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Solo se permiten imágenes JPG, PNG, WebP o GIF.');
      return;
    }

    // Validate size
    if (file.size > MAX_IMAGE_SIZE) {
      setUploadError('La imagen no puede superar los 2 MB.');
      return;
    }

    setUploadError('');
    setUploading(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        setForm((prev) => ({ ...prev, image: dataUrl }));
        setImgError(false);
      }
      setUploading(false);
    };
    reader.onerror = () => {
      setUploadError('Error al leer el archivo. Intenta de nuevo.');
      setUploading(false);
    };
    reader.readAsDataURL(file);

    // Reset the input so the same file can be re-selected
    e.target.value = '';
  }

  function handleRemoveImage() {
    setForm((prev) => ({ ...prev, image: '' }));
    setImgError(false);
    setFileName('');
    setUploadError('');
  }

  function validate() {
    const errs = {};
    if (!form.name?.trim()) errs.name = 'El nombre es obligatorio.';
    if (!form.location?.trim()) errs.location = 'La ubicación es obligatoria.';
    if (form.description && form.description.length > 500)
      errs.description = 'La descripción no puede superar los 500 caracteres.';
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
        setSaving(false);
        setSaved(true);
      } catch {
        setSaving(false);
      }
    }, 600);
  }

  function handleReset() {
    setForm({ ...initialData });
    setErrors({});
    setImgError(false);
    setFileName('');
    setUploadError('');
    localStorage.removeItem(STORAGE_KEY);
  }

  const isBase64 = typeof form.image === 'string' && form.image.startsWith('data:');

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Photo */}
      <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-800">Foto de Perfil</h2>
        <p className="mb-5 text-sm text-stone-500">
          Tu foto se mostrará en tu perfil público y en tus productos.
        </p>

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* Preview */}
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
            {form.image && !imgError ? (
              <>
                <img
                  src={form.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                  onError={() => setImgError(true)}
                />
                {/* Base64 badge */}
                {isBase64 && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                    local
                  </span>
                )}
              </>
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
          </div>

          {/* Upload area */}
          <div className="flex-1 self-stretch">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              className="hidden"
              aria-hidden="true"
            />

            {/* Upload button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="group relative flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 px-4 py-3 text-left transition-all hover:border-green-300 hover:bg-green-50/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <svg
                    className="h-6 w-6 shrink-0 animate-spin text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-stone-600">Cargando imagen...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover:bg-green-200">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-700">
                      {fileName || 'Subir foto desde tu computadora'}
                    </p>
                    <p className="mt-0.5 text-xs text-stone-400">
                      JPG, PNG, WebP o GIF &bull; Máx 2 MB
                    </p>
                  </div>
                </>
              )}
            </button>

            {/* Remove image button */}
            {form.image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-1.5 inline-flex items-center gap-1 text-xs text-red-500 transition-colors hover:text-red-700"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar foto
              </button>
            )}

            {/* Upload error */}
            {uploadError && (
              <p className="mt-1.5 text-xs font-medium text-red-500">{uploadError}</p>
            )}

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-stone-400">o</span>
              </div>
            </div>

            {/* URL Input */}
            <label
              htmlFor="image"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              URL de la imagen
            </label>
            <div className="flex gap-2">
              <input
                id="image"
                type="url"
                value={form.image || ''}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://ejemplo.com/mi-foto.jpg"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </div>
            <p className="mt-1.5 text-xs text-stone-400">
              Usa una imagen de Unsplash, Imgur o cualquier URL pública.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-800">
          Información Personal
        </h2>
        <p className="mb-6 text-sm text-stone-500">
          Estos datos se muestran en tu perfil público como productor.
        </p>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              value={form.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Tu nombre"
              className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              Ubicación
            </label>
            <input
              id="location"
              type="text"
              value={form.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Provincia, Departamento, Perú"
              className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.location
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
              }`}
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-500">{errors.location}</p>
            )}
            <p className="mt-1.5 text-xs text-stone-400">
              Ej: Parinacochas, Ayacucho, Perú
            </p>
          </div>

          {/* Description */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-stone-700"
              >
                Descripción
              </label>
              <span
                className={`text-xs ${
                  (form.description || '').length > 500
                    ? 'text-red-500'
                    : 'text-stone-400'
                }`}
              >
                {(form.description || '').length}/500
              </span>
            </div>
            <textarea
              id="description"
              rows={4}
              value={form.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Cuéntanos sobre ti, tus productos y tu historia como productor..."
              className={`w-full resize-none rounded-xl border bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="order-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition-all hover:border-stone-300 hover:text-stone-800 sm:order-1"
        >
          Restablecer valores
        </button>

        <div className="order-1 flex items-center gap-3 sm:order-2">
          {/* Feedback toast */}
          {saved && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 shadow-sm">
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
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Guardar cambios
              </>
            )}
          </button>
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
