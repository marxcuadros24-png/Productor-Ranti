'use client';

import { useState, useEffect } from 'react';
import { FloppyDisk, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import OfflineBadge from './OfflineBadge';
import AnimalImageUploader from './AnimalImageUploader';
import AnimalCategorySelector from './AnimalCategorySelector';
import AnimalHealthSelect from './AnimalHealthSelect';
import { saveAnimal } from '@/lib/animal-service';

const initialErrors = {
  nombre: '',
  categoria: '',
  raza: '',
  edad: '',
  peso: '',
  precio: '',
  image: '',
};

export default function AnimalForm() {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [salud, setSalud] = useState('Bueno');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({ ...initialErrors });
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // Auto-clear success message after 4 seconds
  useEffect(() => {
    if (savedMessage) {
      const timer = setTimeout(() => setSavedMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [savedMessage]);

  const validate = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre del animal es obligatorio';
      valid = false;
    }

    if (!categoria) {
      newErrors.categoria = 'Selecciona una categoría';
      valid = false;
    }

    if (!raza.trim()) {
      newErrors.raza = 'La raza es obligatoria';
      valid = false;
    }

    if (!edad.trim()) {
      newErrors.edad = 'La edad es obligatoria';
      valid = false;
    }

    const pesoNum = parseFloat(peso);
    if (!peso || isNaN(pesoNum) || pesoNum <= 0) {
      newErrors.peso = 'El peso debe ser mayor a 0';
      valid = false;
    }

    const precioNum = parseFloat(precio);
    if (!precio || isNaN(precioNum) || precioNum <= 0) {
      newErrors.precio = 'Ingresa un precio de venta mayor a 0';
      valid = false;
    }

    if (!image) {
      newErrors.image = 'Debes agregar una foto del animal';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedMessage('');

    if (!validate()) return;

    setSaving(true);

    try {
      const saved = saveAnimal({
        nombre: nombre.trim(),
        categoria,
        raza: raza.trim(),
        edad: edad.trim(),
        peso: parseFloat(peso),
        salud,
        precio: parseFloat(precio),
        descripcion: descripcion.trim(),
        image: image?.preview || null,
        images: image ? [image.preview] : [],
      });

      if (saved) {
        if (typeof navigator !== 'undefined' && navigator.onLine) {
          setSavedMessage('¡Animal registrado exitosamente!');
        } else {
          setSavedMessage(
            'El animal se guardó localmente y se sincronizará cuando vuelva la conexión.'
          );
        }

        // Reset form
        setNombre('');
        setCategoria('');
        setRaza('');
        setEdad('');
        setPeso('');
        setSalud('Bueno');
        setPrecio('');
        setDescripcion('');
        setImage(null);
        setErrors({ ...initialErrors });
      } else {
        setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
      }
    } catch (err) {
      console.error('Error al guardar animal:', err);
      setSavedMessage('Ocurrió un error al guardar. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const handleClearMessage = () => setSavedMessage('');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <OfflineBadge />

      {/* Image upload */}
      <AnimalImageUploader
        image={image}
        onImageChange={setImage}
        error={errors.image}
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
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder='Ej: Vaca "Lucero" o ID: 4502'
          aria-invalid={!!errors.nombre}
          className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
            errors.nombre
              ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
          }`}
        />
        {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
      </div>

      {/* Categoría */}
      <AnimalCategorySelector
        value={categoria}
        onChange={setCategoria}
        error={errors.categoria}
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
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            placeholder="Ej: Angus"
            aria-invalid={!!errors.raza}
            className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.raza
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
          {errors.raza && <p className="mt-1 text-xs text-red-500">{errors.raza}</p>}
        </div>
        <div>
          <label htmlFor="animal-edad" className="text-sm font-semibold text-stone-700">
            Edad
          </label>
          <input
            id="animal-edad"
            type="text"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Ej: 2 años"
            aria-invalid={!!errors.edad}
            className={`mt-1.5 w-full rounded-xl border py-2.5 px-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.edad
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
          {errors.edad && <p className="mt-1 text-xs text-red-500">{errors.edad}</p>}
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
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
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
        {errors.peso && <p className="mt-1 text-xs text-red-500">{errors.peso}</p>}
      </div>

      {/* Salud */}
      <AnimalHealthSelect
        value={salud}
        onChange={setSalud}
      />

      {/* Precio de Venta */}
      <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
        <label className="text-sm font-semibold text-stone-700">Precio de Venta</label>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-bold text-green-600">S/</span>
          <input
            id="animal-precio"
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            aria-invalid={!!errors.precio}
            className={`w-full rounded-xl border py-2.5 pl-3 pr-3 text-sm text-stone-800 outline-none transition-all placeholder:text-stone-300 ${
              errors.precio
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-stone-200 bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100'
            }`}
          />
        </div>
        {errors.precio && <p className="mt-1 text-xs text-red-500">{errors.precio}</p>}
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
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe temperamento, historial médico, alimentación..."
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
        {saving ? 'Guardando...' : 'Guardar Animal'}
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
