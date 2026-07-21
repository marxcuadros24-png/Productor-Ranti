'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloppyDisk, CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import OfflineBadge from './OfflineBadge';
import AnimalImageUploader from './AnimalImageUploader';
import AnimalCategorySelector from './AnimalCategorySelector';
import AnimalHealthSelect from './AnimalHealthSelect';
import FieldError from './FieldError';
import { saveAnimal } from '@/lib/animal-service';

export default function AnimalForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: '',
      categoria: '',
      raza: '',
      edad: '',
      peso: '',
      salud: 'Bueno',
      precio: '',
      descripcion: '',
    },
    mode: 'onBlur',
  });

  const [image, setImage] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  // Auto-clear message after 4 seconds
  useEffect(() => {
    if (savedMessage) {
      const timer = setTimeout(() => setSavedMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [savedMessage]);

  const onSubmit = async (data) => {
    setSavedMessage('');

    if (!image) {
      setMessageType('error');
      setSavedMessage('Debes agregar una foto del animal.');
      return;
    }

    try {
      const saved = saveAnimal({
        nombre: data.nombre.trim(),
        categoria: data.categoria,
        raza: data.raza.trim(),
        edad: data.edad.trim(),
        peso: parseFloat(data.peso),
        salud: data.salud,
        precio: parseFloat(data.precio),
        descripcion: data.descripcion.trim(),
        image: image?.preview || null,
        images: image ? [image.preview] : [],
      });

      if (saved) {
        const isOnline = typeof navigator !== 'undefined' && navigator.onLine;
        setMessageType('success');
        setSavedMessage(
          isOnline
            ? '¡Animal registrado exitosamente!'
            : 'El animal se guardó localmente y se sincronizará cuando vuelva la conexión.'
        );

        reset();
        setImage(null);
      } else {
        setMessageType('error');
        setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
      }
    } catch {
      setMessageType('error');
      setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
    }
  };

  const onError = () => {
    if (!image) {
      setMessageType('error');
      setSavedMessage('Debes agregar una foto del animal.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <OfflineBadge />

      {/* Image upload */}
      <AnimalImageUploader
        image={image}
        onImageChange={setImage}
        error={!image && savedMessage ? 'required' : ''}
      />

      <hr className="border-stone-100" />

      {/* Nombre */}
      <div>
        <label htmlFor="animal-name" className="text-sm font-semibold text-stone-700">
          Identificador / Nombre
        </label>
        <input
          id="animal-name"
          type="text"
          {...register('nombre', {
            required: 'El nombre del animal es obligatorio',
            minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' },
          })}
          placeholder='Ej: Vaca "Lucero" o ID: 4502'
          aria-invalid={!!errors.nombre}
          className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
            errors.nombre
              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
          }`}
        />
        <FieldError error={errors.nombre?.message} />
      </div>

      {/* Categoría */}
      <AnimalCategorySelector
        value={watch('categoria')}
        onChange={(val) => setValue('categoria', val, { shouldValidate: true })}
        error={errors.categoria?.message}
      />

      {/* Two columns: Raza + Edad */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="animal-raza" className="text-sm font-semibold text-stone-700">
            Raza
          </label>
          <input
            id="animal-raza"
            type="text"
            {...register('raza', {
              required: 'La raza es obligatoria',
            })}
            placeholder="Ej: Angus"
            aria-invalid={!!errors.raza}
            className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.raza
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
          <FieldError error={errors.raza?.message} />
        </div>
        <div>
          <label htmlFor="animal-edad" className="text-sm font-semibold text-stone-700">
            Edad
          </label>
          <input
            id="animal-edad"
            type="text"
            {...register('edad', {
              required: 'La edad es obligatoria',
            })}
            placeholder="Ej: 2 años"
            aria-invalid={!!errors.edad}
            className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.edad
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
          <FieldError error={errors.edad?.message} />
        </div>
      </div>

      {/* Peso */}
      <div>
        <label htmlFor="animal-peso" className="text-sm font-semibold text-stone-700">
          Peso
        </label>
        <div className="relative mt-1.5">
          <input
            id="animal-peso"
            type="number"
            min="0"
            step="0.01"
            {...register('peso', {
              required: 'El peso es obligatorio',
              min: { value: 0.1, message: 'El peso debe ser mayor a 0' },
            })}
            placeholder="0.00"
            aria-invalid={!!errors.peso}
            className={`w-full rounded-xl border py-2.5 pl-3 pr-10 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.peso
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-stone-400">
            kg
          </span>
        </div>
        <FieldError error={errors.peso?.message} />
      </div>

      {/* Salud */}
      <AnimalHealthSelect
        value={watch('salud')}
        onChange={(val) => setValue('salud', val)}
        error={''}
      />

      {/* Precio */}
      <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
        <label className="text-sm font-semibold text-stone-700">Precio de Venta</label>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-bold text-green-600">S/</span>
          <input
            id="animal-precio"
            type="number"
            min="0"
            step="0.01"
            {...register('precio', {
              required: 'Ingresa un precio de venta',
              min: { value: 0.1, message: 'El precio debe ser mayor a 0' },
            })}
            placeholder="0.00"
            aria-invalid={!!errors.precio}
            className={`w-full rounded-xl border py-2.5 pl-3 pr-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.precio
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
        </div>
        <FieldError error={errors.precio?.message} />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="animal-desc" className="text-sm font-semibold text-stone-700">
          Descripción{' '}
          <span className="font-normal text-stone-400">(opcional)</span>
        </label>
        <textarea
          id="animal-desc"
          rows={4}
          {...register('descripcion', {
            maxLength: { value: 1000, message: 'La descripción no puede superar los 1000 caracteres' },
          })}
          placeholder="Describe temperamento, historial médico, alimentación..."
          className="mt-1.5 w-full resize-none rounded-xl border border-stone-200 bg-white py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 focus:border-green-400 focus:ring-2 focus:ring-green-100"
        />
        <FieldError error={errors.descripcion?.message} />
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
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
            <FloppyDisk size={18} weight="bold" />
            Guardar Animal
          </>
        )}
      </motion.button>

      {/* Success/Error message */}
      <AnimatePresence>
        {savedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`flex items-start gap-2 overflow-hidden rounded-xl p-3 text-sm ${
              messageType === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-green-600" />
            ) : (
              <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-red-600" />
            )}
            <p className="flex-1">{savedMessage}</p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setSavedMessage('')}
              className={`shrink-0 ${
                messageType === 'success' ? 'text-green-500 hover:text-green-700' : 'text-red-500 hover:text-red-700'
              }`}
              aria-label="Cerrar mensaje"
            >
              &times;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
