'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Eye, EyeSlash, CheckCircle } from '@phosphor-icons/react/dist/ssr';

export default function PasswordPage() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({});
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

  function toggleShow(field) {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function validate() {
    const errs = {};
    if (!form.currentPassword) errs.currentPassword = 'La contraseña actual es obligatoria.';
    if (!form.newPassword) errs.newPassword = 'La nueva contraseña es obligatoria.';
    else if (form.newPassword.length < 6)
      errs.newPassword = 'La contraseña debe tener al menos 6 caracteres.';
    if (!form.confirmPassword) errs.confirmPassword = 'Confirma tu nueva contraseña.';
    else if (form.newPassword !== form.confirmPassword)
      errs.confirmPassword = 'Las contraseñas no coinciden.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem(
          'ranti-password',
          JSON.stringify({ changed: Date.now() })
        );
      } catch {}
      setSaving(false);
      setSaved(true);
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 600);
  }

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Lock size={20} weight="bold" className="text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
                Cambiar contraseña
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                Actualiza tu clave de acceso para mantener segura tu cuenta.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
            <div className="space-y-5">
              {/* Current Password */}
              <div>
                <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Contraseña actual
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showPasswords.currentPassword ? 'text' : 'password'}
                    value={form.currentPassword}
                    onChange={(e) => handleChange('currentPassword', e.target.value)}
                    placeholder="Ingresa tu contraseña actual"
                    className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 pr-11 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.currentPassword
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                        : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow('currentPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600"
                    tabIndex={-1}
                    aria-label={showPasswords.currentPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPasswords.currentPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    value={form.newPassword}
                    onChange={(e) => handleChange('newPassword', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 pr-11 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.newPassword
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                        : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow('newPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600"
                    tabIndex={-1}
                    aria-label={showPasswords.newPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPasswords.newPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-stone-700">
                  Confirmar nueva contraseña
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPasswords.confirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Repite la nueva contraseña"
                    className={`w-full rounded-xl border bg-stone-50 px-4 py-2.5 pr-11 text-sm text-stone-800 placeholder-stone-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                        : 'border-stone-200 focus:border-green-400 focus:ring-green-100'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow('confirmPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600"
                    tabIndex={-1}
                    aria-label={showPasswords.confirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPasswords.confirmPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
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
                Contraseña actualizada
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
                'Guardar contraseña'
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
