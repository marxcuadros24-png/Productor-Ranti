'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Trash,
  Camera,
  ImageSquare,
  FolderOpen,
  Warning,
  UploadSimple,
} from '@phosphor-icons/react/dist/ssr';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function getFileError(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(`.${ext}`)) {
      return `Formato no válido. Solo se aceptan JPG, JPEG, PNG y WEBP.`;
    }
  }
  if (file.size > MAX_FILE_SIZE) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return `Archivo demasiado grande (${mb} MB). Máximo 5 MB.`;
  }
  return null;
}

export default function AnimalImageUploader({ image, onImageChange, error }) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const filesInputRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (validationError) {
      const timer = setTimeout(() => setValidationError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [validationError]);

  const processFile = useCallback(
    (file) => {
      const err = getFileError(file);
      if (err) {
        setValidationError(err);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange({ file, preview: e.target.result });
        setShowPicker(false);
      };
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const handleCameraInput = (e) => {
    if (e.target.files?.length) {
      processFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleGalleryInput = (e) => {
    if (e.target.files?.length) {
      processFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleFilesInput = (e) => {
    if (e.target.files?.length) {
      processFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  const handleRemove = () => {
    onImageChange(null);
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

  return (
    <div>
      <h3 className="text-sm font-semibold text-stone-700">Foto del animal</h3>
      <p className="mt-0.5 text-xs text-stone-400">
        Formatos JPG, PNG (Máx. 5 MB)
      </p>

      <div className="mt-3">
        {image ? (
          /* Preview */
          <div className="relative overflow-hidden rounded-2xl bg-stone-100">
            <img
              src={image.preview}
              alt="Foto del animal"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-gradient-to-t from-black/50 to-transparent p-3">
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                className="flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
              >
                <UploadSimple size={14} weight="bold" />
                Reemplazar
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1.5 rounded-xl bg-red-500/90 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-red-600"
              >
                <Trash size={14} weight="bold" />
                Eliminar
              </button>
            </div>
          </div>
        ) : (
          /* Upload area */
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 py-10 transition-all hover:border-green-300 hover:bg-green-50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <UploadSimple size={28} weight="bold" />
            </div>
            <div className="text-center">
              <span className="block text-sm font-semibold text-stone-700">
                Subir foto del animal
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Hidden inputs */}
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
        onChange={handleGalleryInput}
        className="hidden"
      />
      <input
        ref={filesInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
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

      {/* Form-level error */}
      {error && !validationError && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}

      {/* Action Sheet */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            type="button"
            onClick={closePicker}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            aria-label="Cerrar selector"
          />
          <div className="relative z-10 w-full max-w-sm animate-slide-up rounded-t-3xl bg-white px-5 pb-10 pt-5 shadow-2xl sm:rounded-2xl sm:animate-fade-in">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-stone-200 sm:hidden" />
            <h3 className="text-center text-lg font-semibold text-stone-800">
              Agregar fotografía
            </h3>
            <p className="mt-0.5 text-center text-sm text-stone-500">
              Selecciona el origen de la imagen
            </p>

            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={openCamera}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all hover:bg-green-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Camera size={20} weight="fill" />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-stone-800">Tomar foto</span>
                  <span className="block text-xs text-stone-400">Usa la cámara del dispositivo</span>
                </div>
              </button>
              <div className="mx-4 border-t border-stone-100" />
              <button
                type="button"
                onClick={openGallery}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all hover:bg-green-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <ImageSquare size={20} weight="fill" />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-stone-800">Elegir de la galería</span>
                  <span className="block text-xs text-stone-400">Selecciona desde tu dispositivo móvil</span>
                </div>
              </button>
              <div className="mx-4 border-t border-stone-100" />
              <button
                type="button"
                onClick={openFiles}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all hover:bg-green-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <FolderOpen size={20} weight="fill" />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-stone-800">Elegir desde archivos</span>
                  <span className="block text-xs text-stone-400">Examina carpetas en tu computadora</span>
                </div>
              </button>
            </div>

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
