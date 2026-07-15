'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Plus,
  Trash,
  Camera,
  ImageSquare,
  FolderOpen,
  Warning,
} from '@phosphor-icons/react/dist/ssr';

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function getFileError(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(`.${ext}`)) {
      return `Formato no válido: ${file.name}. Solo se aceptan JPG, JPEG, PNG y WEBP.`;
    }
  }
  if (file.size > MAX_FILE_SIZE) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return `Archivo demasiado grande: ${file.name} (${mb} MB). Máximo 10 MB.`;
  }
  return null;
}

export default function ProductImageUploader({ images = [], onImagesChange, error }) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const filesInputRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Auto-clear validation error after 4 seconds
  useEffect(() => {
    if (validationError) {
      const timer = setTimeout(() => setValidationError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [validationError]);

  const processFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList);

      // Validate each file first
      for (const file of files) {
        const err = getFileError(file);
        if (err) {
          setValidationError(err);
          return;
        }
      }

      // Check max images limit
      const remaining = MAX_IMAGES - images.length;
      if (remaining <= 0) {
        setValidationError(`Solo puedes agregar un máximo de ${MAX_IMAGES} fotografías.`);
        return;
      }

      const validFiles = files.slice(0, remaining);
      if (validFiles.length < files.length) {
        setValidationError(
          `Solo puedes agregar un máximo de ${MAX_IMAGES} fotografías. Se agregaron ${validFiles.length} de ${files.length}.`
        );
      }

      // Read and add files
      Promise.all(
        validFiles.map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve({ file, preview: e.target.result });
              reader.readAsDataURL(file);
            })
        )
      ).then((results) => {
        onImagesChange([...images, ...results]);
        setShowPicker(false);
      });
    },
    [images, onImagesChange]
  );

  const handleCameraInput = (e) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleGalleryInput = (e) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleFilesInput = (e) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const closePicker = () => setShowPicker(false);

  const openCamera = () => {
    closePicker();
    setTimeout(() => cameraInputRef.current?.click(), 100);
  };

  const openGallery = () => {
    closePicker();
    setTimeout(() => galleryInputRef.current?.click(), 100);
  };

  const openFiles = () => {
    closePicker();
    setTimeout(() => filesInputRef.current?.click(), 100);
  };

  const maxReached = images.length >= MAX_IMAGES;

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-700">Fotos del producto</h3>

      {/* Image grid */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* Main image */}
        {images[0] && (
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-xl bg-stone-100">
            <img
              src={images[0].preview}
              alt="Foto principal"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(0)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Eliminar imagen principal"
            >
              <Trash size={14} weight="bold" />
            </button>
          </div>
        )}

        {/* Secondary images */}
        {images.slice(1, 3).map((img, i) => (
          <div key={`sec-${i}`} className="relative col-span-1 overflow-hidden rounded-xl bg-stone-100">
            <img
              src={img.preview}
              alt={`Foto ${i + 2}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(i + 1)}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Eliminar imagen"
            >
              <Trash size={12} weight="bold" />
            </button>
          </div>
        ))}

        {/* Extra images on new row */}
        {images.slice(3).map((img, i) => (
          <div key={`extra-${i}`} className="relative col-span-1 overflow-hidden rounded-xl bg-stone-100">
            <img
              src={img.preview}
              alt={`Foto ${i + 4}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(i + 3)}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Eliminar imagen"
            >
              <Trash size={12} weight="bold" />
            </button>
          </div>
        ))}

        {/* Add button */}
        {!maxReached && (
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            aria-label="Agregar imagen"
            className={`col-span-1 flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed transition-all ${
              dragOver
                ? 'border-green-400 bg-green-50'
                : 'border-stone-200 bg-stone-50 hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <Plus size={20} weight="bold" className="text-stone-400" />
            <span className="text-xs font-medium text-stone-400">Agregar</span>
          </button>
        )}
      </div>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraInput}
        className="hidden"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleGalleryInput}
        className="hidden"
      />
      <input
        ref={filesInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFilesInput}
        className="hidden"
      />

      {/* Validation error */}
      {validationError && (
        <div className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600">
          <Warning size={14} weight="bold" className="mt-0.5 shrink-0" />
          <p>{validationError}</p>
        </div>
      )}

      {/* Form-level error (from parent) */}
      {error && !validationError && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}

      {/* Hint */}
      {!maxReached && !validationError && (
        <p className="mt-1.5 text-xs text-stone-400">
          Arrastra imágenes aquí o haz clic en Agregar. Máximo {MAX_IMAGES} fotos · JPG, PNG, WEBP · hasta 10 MB cada una.
        </p>
      )}

      {/* Max reached info */}
      {maxReached && (
        <p className="mt-1.5 text-xs text-amber-600">
          Límite de {MAX_IMAGES} fotografías alcanzado.
        </p>
      )}

      {/* Action Sheet / Picker Overlay */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <button
            type="button"
            onClick={closePicker}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            aria-label="Cerrar selector"
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-sm animate-slide-up rounded-t-3xl bg-white px-5 pb-10 pt-5 shadow-2xl sm:rounded-2xl sm:animate-fade-in">
            {/* Handle bar (mobile only) */}
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-stone-200 sm:hidden" />

            {/* Title */}
            <h3 className="text-center text-lg font-semibold text-stone-800">
              Agregar fotografía
            </h3>
            <p className="mt-0.5 text-center text-sm text-stone-500">
              Selecciona el origen de la imagen
            </p>

            {/* Options */}
            <div className="mt-5 space-y-2">
              {/* Camera */}
              <button
                type="button"
                onClick={openCamera}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all hover:bg-green-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Camera size={20} weight="fill" />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-stone-800">
                    Tomar foto
                  </span>
                  <span className="block text-xs text-stone-400">
                    Usa la cámara del dispositivo
                  </span>
                </div>
              </button>

              {/* Divider */}
              <div className="mx-4 border-t border-stone-100" />

              {/* Gallery */}
              <button
                type="button"
                onClick={openGallery}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all hover:bg-green-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <ImageSquare size={20} weight="fill" />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-stone-800">
                    Elegir de la galería
                  </span>
                  <span className="block text-xs text-stone-400">
                    Selecciona desde tu dispositivo móvil
                  </span>
                </div>
              </button>

              {/* Divider */}
              <div className="mx-4 border-t border-stone-100" />

              {/* Files */}
              <button
                type="button"
                onClick={openFiles}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all hover:bg-green-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <FolderOpen size={20} weight="fill" />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-stone-800">
                    Elegir desde archivos
                  </span>
                  <span className="block text-xs text-stone-400">
                    Examina carpetas en tu computadora
                  </span>
                </div>
              </button>
            </div>

            {/* Cancel */}
            <button
              type="button"
              onClick={closePicker}
              className="mt-5 w-full rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-600 transition-all hover:bg-stone-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
