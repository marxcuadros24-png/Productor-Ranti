'use client';

import { useState } from 'react';
import { FloppyDisk, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import OfflineBadge from './OfflineBadge';
import ProductImageUploader from './ProductImageUploader';
import ProductPriceInput from './ProductPriceInput';
import ProductStockInput from './ProductStockInput';
import { saveProduct } from '@/lib/product-service';

const initialErrors = {
  nombre: '',
  precio: '',
  stock: '',
  imagenes: '',
};

export default function ProductForm() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [unit, setUnit] = useState('kg');
  const [stock, setStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({ ...initialErrors });
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const validate = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es obligatorio';
      valid = false;
    }

    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      newErrors.precio = 'Ingresa un precio mayor a 0';
      valid = false;
    }

    if (stock && parseInt(stock, 10) < 0) {
      newErrors.stock = 'El stock debe ser mayor o igual a 0';
      valid = false;
    }

    if (images.length === 0) {
      newErrors.imagenes = 'Debes agregar al menos una foto del producto';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavedMessage('');

    if (!validate()) return;

    setSaving(true);

    try {
      // Save using the product service (always persists to localStorage)
      const saved = saveProduct({
        nombre: nombre.trim(),
        precio: parseFloat(precio),
        unit,
        stock: stock ? parseInt(stock, 10) : 0,
        descripcion: descripcion.trim(),
        images: images.map((img) => img.preview),
      });

      if (saved) {
        if (typeof navigator !== 'undefined' && navigator.onLine) {
          setSavedMessage('¡Producto publicado exitosamente!');
        } else {
          setSavedMessage(
            'Producto guardado localmente. Se sincronizará cuando vuelva la conexión.'
          );
        }

        // Reset form
        setNombre('');
        setPrecio('');
        setUnit('kg');
        setStock('');
        setDescripcion('');
        setImages([]);
        setErrors({ ...initialErrors });
      } else {
        setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
      }
    } catch (err) {
      console.error('Error al guardar producto:', err);
      setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const handleClearMessage = () => setSavedMessage('');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Offline banner */}
      <OfflineBadge />

      {/* Image upload */}
      <ProductImageUploader
        images={images}
        onImagesChange={setImages}
        error={errors.imagenes}
      />

      {/* Divider */}
      <hr className="border-stone-100" />

      {/* Nombre */}
      <div>
        <label
          htmlFor="product-name"
          className="text-sm font-semibold text-stone-700"
        >
          Nombre del producto
        </label>          <input
            id="product-name"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Papa Nativa, Quinua Real..."
            aria-invalid={!!errors.nombre}
            className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.nombre
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
        {errors.nombre && (
          <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
        )}
      </div>

      {/* Precio */}
      <ProductPriceInput
        price={precio}
        unit={unit}
        onPriceChange={setPrecio}
        onUnitChange={setUnit}
        error={errors.precio}
      />

      {/* Stock */}
      <ProductStockInput
        stock={stock}
        unit={unit}
        onStockChange={setStock}
        error={errors.stock}
      />

      {/* Descripción */}
      <div>
        <label
          htmlFor="product-desc"
          className="text-sm font-semibold text-stone-700"
        >
          Descripción{' '}
          <span className="font-normal text-stone-400">(opcional)</span>
        </label>
        <textarea
          id="product-desc"
          rows={4}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe tu producto, su origen, calidad..."
          className="mt-1.5 w-full resize-none rounded-xl border border-stone-200 bg-white py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 focus:border-green-400 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={saving}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FloppyDisk size={18} weight="bold" />
        {saving ? 'Guardando...' : 'Guardar producto'}
      </button>

      {/* Success/Info message */}
      {savedMessage && (
        <div className="flex items-start gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-green-600" />
          <p className="flex-1">{savedMessage}</p>
          <button
            type="button"
            onClick={handleClearMessage}
            className="shrink-0 text-green-500 hover:text-green-700"
            aria-label="Cerrar mensaje"
          >
            &times;
          </button>
        </div>
      )}
    </form>
  );
}
