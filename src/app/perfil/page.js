'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Lock,
  MapPin,
  SignOut,
  Camera,
} from '@phosphor-icons/react/dist/ssr';
import { APP_VERSION, APP_TAGLINE } from '@/lib/app-config';
import { loadProductorData } from '@/lib/productor-data';

export default function PerfilPage() {
  const router = useRouter();
  const [productor, setProductor] = useState({ name: '', location: '', image: '', description: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = loadProductorData();
    setProductor(data);
    setLoaded(true);
  }, []);

  const { name, location, image, description } = productor;

  if (!loaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[650px] animate-pulse space-y-6">
          <div className="mx-auto h-28 w-28 rounded-full bg-stone-200" />
          <div className="mx-auto h-6 w-48 rounded-xl bg-stone-200" />
          <div className="mx-auto h-64 rounded-2xl bg-stone-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[650px]">
        {/* ============================== */}
        {/* CABECERA DEL PERFIL           */}
        {/* ============================== */}
        <section className="mb-8 flex flex-col items-center text-center">
          {/* Avatar con botón de cámara */}
          <div className="relative mb-5">
            <div className="h-28 w-28 overflow-hidden rounded-full bg-stone-100 ring-4 ring-white shadow-lg sm:h-32 sm:w-32">
              {image ? (
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-50 text-4xl text-green-600">
                  {name?.charAt(0) || 'P'}
                </div>
              )}
            </div>
            {/* Botón flotante de cámara */}
            <button
              type="button"
              onClick={() => router.push('/configuracion')}
              className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-95"
              aria-label="Cambiar foto de perfil"
            >
              <Camera size={16} weight="bold" />
            </button>
          </div>

          {/* Nombre */}
          <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
            {name}
          </h1>

          {/* Tagline */}
          <p className="mt-1 text-base font-medium text-green-700">
            Productora de Granos Andinos
          </p>

          {/* Ubicación */}
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-stone-500">
            <MapPin size={15} weight="fill" />
            <span>{location}</span>
          </div>

          {/* Botón cambiar foto */}
          <button
            type="button"
            onClick={() => router.push('/configuracion')}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition-all hover:border-green-300 hover:text-green-600 hover:shadow-md active:scale-[0.98]"
          >
            <Camera size={15} weight="bold" />
            Cambiar foto de perfil
          </button>
        </section>

        {/* ============================== */}
        {/* SECCIÓN CONFIGURACIÓN          */}
        {/* ============================== */}
        <section className="mb-6">
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
        </section>

        {/* ============================== */}
        {/* SECCIÓN CUENTA                 */}
        {/* ============================== */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
            Cuenta
          </h2>
          <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => {
                /* TODO: Implementar función de logout
                 * Debe:
                 *   1. Limpiar sesión/tokens del usuario
                 *   2. Redirigir a la página de inicio de sesión
                 *   3. Limpiar cualquier estado en localStorage relacionado
                 *
                 * Ejemplo cuando exista:
                 *   await auth.signOut()
                 *   router.push('/login')
                 */
              }}
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
        </section>

        {/* ============================== */}
        {/* FOOTER DE PÁGINA              */}
        {/* ============================== */}
        <footer className="mt-10 border-t border-stone-100 pt-6 pb-6 text-center">
          <p className="text-xs text-stone-400">
            Versión {APP_VERSION}
          </p>
          <p className="mt-1 text-xs italic text-stone-400">
            &ldquo;{APP_TAGLINE}&rdquo;
          </p>
        </footer>
      </div>
    </div>
  );
}
