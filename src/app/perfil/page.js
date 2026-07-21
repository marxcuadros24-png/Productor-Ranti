'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Lock,
  MapPin,
  SignOut,
  Camera,
  PencilSimple,
  CheckCircle,
  XCircle,
  MapPinLine,
  Quotes,
} from '@phosphor-icons/react/dist/ssr';
import { APP_VERSION, APP_TAGLINE } from '@/lib/app-config';

const STORAGE_KEY = 'ranti-profile-data';

const DEFAULT_PROFILE = {
  name: 'Comunidad Campesina de Qero',
  tagline: 'Productora de Granos Andinos',
  location: 'Cusco, Perú',
  description:
    'Comunidad dedicada al cultivo de papas nativas y crianza de alpacas. Producimos con técnicas ancestrales transmitidas por generaciones. Nuestros productos son 100% orgánicos y cultivados a más de 3,800 msnm.',
  image:
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=200&h=200&fit=crop&crop=face&auto=format',
};

function loadProfile() {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export default function PerfilPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [discarded, setDiscarded] = useState(false);
  const initialData = useRef(loadProfile());

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: initialData.current,
    mode: 'onBlur',
  });

  const formValues = watch();
  const hasChanges = isDirty;

  // Auto-dismiss feedback
  useEffect(() => {
    if (saved || discarded) {
      const t = setTimeout(() => {
        setSaved(false);
        setDiscarded(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [saved, discarded]);

  // Reset img error when URL changes
  useEffect(() => {
    setImgError(false);
  }, [formValues.image]);

  const onSubmit = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      initialData.current = data;
      setSaved(true);
      setIsEditing(false);
    } catch {
      // storage full
    }
  };

  const handleCancel = () => {
    reset(initialData.current);
    setImgError(false);
    setDiscarded(true);
    setIsEditing(false);
  };

  const handleStartEditing = () => {
    reset(initialData.current);
    setImgError(false);
    setIsEditing(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[650px]">
        {/* ============================== */}
        {/* PROFILE HEADER WITH LIVE PREVIEW */}
        {/* ============================== */}
        <motion.section
          layout
          className="mb-8 flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="relative mb-5">
            <motion.div
              layout
              className="h-28 w-28 overflow-hidden rounded-full bg-stone-100 ring-4 ring-white shadow-lg sm:h-32 sm:w-32"
            >
              {formValues.image && !imgError ? (
                <img
                  src={formValues.image}
                  alt={formValues.name}
                  className="h-full w-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-50 text-4xl text-green-600">
                  {formValues.name?.charAt(0) || 'P'}
                </div>
              )}
            </motion.div>

            {/* Camera button */}
            <AnimatePresence>
              {isEditing && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  type="button"
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-95"
                  aria-label="Cambiar foto de perfil"
                  onClick={() => document.getElementById('profile-image-url')?.focus()}
                >
                  <Camera size={16} weight="bold" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Editable Name */}
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md"
            >
              <label htmlFor="profile-name" className="sr-only">
                Nombre
              </label>
              <input
                id="profile-name"
                type="text"
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                })}
                className="w-full rounded-xl border border-green-300 bg-green-50/50 px-4 py-2 text-center text-2xl font-bold text-stone-800 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 sm:text-3xl"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </motion.div>
          ) : (
            <motion.h1
              layout
              className="text-2xl font-bold text-stone-800 sm:text-3xl"
            >
              {formValues.name}
            </motion.h1>
          )}

          {/* Editable Tagline */}
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 w-full max-w-md"
            >
              <label htmlFor="profile-tagline" className="sr-only">
                Título profesional
              </label>
              <input
                id="profile-tagline"
                type="text"
                {...register('tagline')}
                placeholder="Tu título o especialidad"
                className="w-full rounded-xl border border-green-200 bg-green-50/30 px-4 py-2 text-center text-base font-medium text-green-700 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </motion.div>
          ) : (
            <motion.p
              layout
              className="mt-1 text-base font-medium text-green-700"
            >
              {formValues.tagline}
            </motion.p>
          )}

          {/* Editable Location */}
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 w-full max-w-md"
            >
              <label htmlFor="profile-location" className="sr-only">
                Ubicación
              </label>
              <div className="relative">
                <MapPinLine
                  size={16}
                  weight="fill"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
                />
                <input
                  id="profile-location"
                  type="text"
                  {...register('location', {
                    required: 'La ubicación es obligatoria',
                  })}
                  placeholder="Ciudad, Departamento, Perú"
                  className="w-full rounded-xl border border-green-200 bg-green-50/30 py-2 pl-8 pr-4 text-center text-sm text-stone-500 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-500"
            >
              <MapPin size={15} weight="fill" />
              <span>{formValues.location}</span>
            </motion.div>
          )}

          {/* Edit / Save Controls */}
          <motion.div layout className="mt-5 flex items-center gap-3">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing-controls"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <motion.button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md disabled:opacity-60"
                  >
                    <CheckCircle size={16} weight="bold" />
                    {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-600 shadow-sm transition-all hover:border-stone-300 hover:text-stone-800"
                  >
                    <XCircle size={16} weight="bold" />
                    Cancelar
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="view-controls"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button
                    type="button"
                    onClick={handleStartEditing}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-green-300 hover:text-green-600 hover:shadow-md"
                  >
                    <PencilSimple size={15} weight="bold" />
                    Editar Perfil
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Feedback messages */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 overflow-hidden"
              >
                <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 shadow-sm">
                  <CheckCircle size={16} weight="fill" className="text-green-600" />
                  Perfil actualizado correctamente
                </div>
              </motion.div>
            )}
            {discarded && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 overflow-hidden"
              >
                <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-sm">
                  <XCircle size={16} weight="bold" className="text-stone-400" />
                  Cambios descartados
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editable Description */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-6 w-full max-w-lg overflow-hidden"
            >
              <div className="space-y-3">
                {/* Image URL */}
                <div>
                  <label htmlFor="profile-image-url" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-stone-500">
                    <Camera size={12} weight="bold" />
                    URL de la foto de perfil
                  </label>
                  <input
                    id="profile-image-url"
                    type="url"
                    {...register('image')}
                    placeholder="https://ejemplo.com/mi-foto.jpg"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs text-stone-700 outline-none transition-all placeholder:text-stone-300 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="profile-description" className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                      <Quotes size={12} weight="bold" />
                      Descripción
                    </label>
                    <span
                      className={`text-[10px] ${
                        (formValues.description || '').length > 500
                          ? 'text-red-500'
                          : 'text-stone-400'
                      }`}
                    >
                      {(formValues.description || '').length}/500
                    </span>
                  </div>
                  <textarea
                    id="profile-description"
                    rows={3}
                    {...register('description', {
                      maxLength: { value: 500, message: 'Máximo 500 caracteres' },
                    })}
                    placeholder="Cuéntanos sobre ti, tus productos y tu historia..."
                    className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 outline-none transition-all placeholder:text-stone-300 focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Live preview of description in view mode */}
          {!isEditing && formValues.description && (
            <motion.p
              layout
              className="mt-4 max-w-md text-sm leading-relaxed text-stone-600"
            >
              {formValues.description}
            </motion.p>
          )}

          {/* Stats row */}
          <motion.div
            layout
            className="mt-5 flex justify-center gap-4"
          >
            <div className="rounded-xl bg-green-50 px-4 py-2 text-center">
              <p className="text-lg font-bold text-green-700">12</p>
              <p className="text-xs text-green-600">Productos</p>
            </div>
            <div className="rounded-xl bg-amber-50 px-4 py-2 text-center">
              <p className="text-lg font-bold text-amber-700">8</p>
              <p className="text-xs text-amber-600">Animales</p>
            </div>
            <div className="rounded-xl bg-blue-50 px-4 py-2 text-center">
              <p className="text-lg font-bold text-blue-700">45</p>
              <p className="text-xs text-blue-600">Pedidos</p>
            </div>
          </motion.div>
        </motion.section>

        {/* ============================== */}
        {/* SETTINGS SECTION              */}
        {/* ============================== */}
        <motion.section
          layout
          className="mb-6"
        >
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
            Configuración
          </h2>
          <div className="divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
            {/* Información Personal */}
            <button
              type="button"
              onClick={() => router.push('/configuracion')}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-stone-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <User size={18} weight="bold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-stone-800">
                  Información Personal
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  Nombre, descripción y foto de perfil
                </p>
              </div>
              <svg
                className="h-5 w-5 shrink-0 text-stone-300 transition-colors group-hover:text-stone-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Cambiar Contraseña */}
            <button
              type="button"
              onClick={() => router.push('/configuracion/password')}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-stone-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Lock size={18} weight="bold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-stone-800">
                  Cambiar contraseña
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  Actualiza tu clave de acceso
                </p>
              </div>
              <svg
                className="h-5 w-5 shrink-0 text-stone-300 transition-colors group-hover:text-stone-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Cambiar Ubicación GPS */}
            <button
              type="button"
              onClick={() => router.push('/configuracion/ubicacion')}
              className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-stone-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MapPin size={18} weight="bold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-stone-800">
                  Cambiar ubicación GPS
                </p>
                <p className="mt-0.5 text-sm text-stone-500">
                  Actualiza tu dirección y ubicación
                </p>
              </div>
              <svg
                className="h-5 w-5 shrink-0 text-stone-300 transition-colors group-hover:text-stone-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.section>

        {/* ============================== */}
        {/* ACCOUNT SECTION               */}
        {/* ============================== */}
        <motion.section layout className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
            Cuenta
          </h2>
          <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
            <button
              type="button"
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-red-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <SignOut size={18} weight="bold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-red-600">Cerrar sesión</p>
                <p className="mt-0.5 text-sm text-stone-500">
                  Salir de tu cuenta de RANTI
                </p>
              </div>
            </button>
          </div>
        </motion.section>

        {/* ============================== */}
        {/* PAGE FOOTER                   */}
        {/* ============================== */}
        <motion.footer
          layout
          className="mt-10 border-t border-stone-100 pt-6 pb-6 text-center"
        >
          <p className="text-xs text-stone-400">
            Versión {APP_VERSION}
          </p>
          <p className="mt-1 text-xs italic text-stone-400">
            &ldquo;{APP_TAGLINE}&rdquo;
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
