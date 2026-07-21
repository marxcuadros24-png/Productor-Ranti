'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloppyDisk, CheckCircle, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import OfflineBadge from './OfflineBadge';
import ProductImageUploader from './ProductImageUploader';
import ProductPriceInput from './ProductPriceInput';
import ProductStockInput from './ProductStockInput';
import FieldError from './FieldError';
import { saveProduct } from '@/lib/product-service';

export default function ProductForm() {
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
      precio: '',
      unit: 'kg',
      stock: '',
      descripcion: '',
    },
    mode: 'onBlur',
  });

  const [images, setImages] = useState([]);
  const [savedMessage, setSavedMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const unit = watch('unit');

  const onSubmit = async (data) => {
    setSavedMessage('');

    if (images.length === 0) {
      setMessageType('error');
      setSavedMessage('Debes agregar al menos una foto del producto.');
      return;
    }

    try {
      const saved = saveProduct({
        nombre: data.nombre.trim(),
        precio: parseFloat(data.precio),
        unit: data.unit,
        stock: data.stock ? parseInt(data.stock, 10) : 0,
        descripcion: data.descripcion.trim(),
        images: images.map((img) => img.preview),
      });

      if (saved) {
        const isOnline = typeof navigator !== 'undefined' && navigator.onLine;
        setMessageType('success');
        setSavedMessage(
          isOnline
            ? '¡Producto publicado exitosamente!'
            : 'Producto guardado localmente. Se sincronizará cuando vuelva la conexión.'
        );

        reset();
        setImages([]);
      } else {
        setMessageType('error');
        setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
      }
    } catch {
      setMessageType('error');
      setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Offline banner */}
      <OfflineBadge />

      {/* Image upload */}
      <ProductImageUploader
        images={images}
        onImagesChange={setImages}
        error={images.length === 0 && savedMessage ? 'required' : ''}
      />

      <hr className="border-stone-100" />

      {/* Nombre */}
      <div>
        <label htmlFor="product-name" className="text-sm font-semibold text-stone-700">
          Nombre del producto
        </label>
        <input
          id="product-name"
          type="text"
          {...register('nombre', {
            required: 'El nombre del producto es obligatorio',
            minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
          })}
          placeholder="Ej. Papa Nativa, Quinua Real..."
          aria-invalid={!!errors.nombre}
          className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
            errors.nombre
              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
          }`}
        />
        <FieldError error={errors.nombre?.message} />
      </div>

      {/* Precio */}
      <ProductPriceInput
        price={watch('precio')}
        unit={unit}
        onPriceChange={(val) => setValue('precio', val, { shouldValidate: true })}
        onUnitChange={(val) => setValue('unit', val)}
        error={errors.precio?.message}
      />

      {/* Stock */}
      <ProductStockInput
        stock={watch('stock')}
        unit={unit}
        onStockChange={(val) => setValue('stock', val, { shouldValidate: true })}
        error={errors.stock?.message}
      />

      {/* Descripción */}
      <div>
        <label htmlFor="product-desc" className="text-sm font-semibold text-stone-700">
          Descripción{' '}
          <span className="font-normal text-stone-400">(opcional)</span>
        </label>
        <textarea
          id="product-desc"
          rows={4}
          {...register('descripcion', {
            maxLength: { value: 500, message: 'La descripción no puede superar los 500 caracteres' },
          })}
          placeholder="Describe tu producto, su origen, calidad..."
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
            Guardar producto
          </>
        )}
      </motion.button>

      {/* Success/Info message */}
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
