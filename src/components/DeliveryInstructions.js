'use client';

export default function DeliveryInstructions({ value, onChange }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <label
        htmlFor="delivery-instructions"
        className="mb-1.5 block text-base font-semibold text-stone-800"
      >
        Indicaciones adicionales{' '}
        <span className="font-normal text-stone-400">(opcional)</span>
      </label>
      <p className="mb-4 text-sm leading-relaxed text-stone-500">
        Agrega información útil para que tus compradores puedan coordinar la
        entrega contigo.
      </p>
      <textarea
        id="delivery-instructions"
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Ej:\nReferencia de mi chacra:\nA 10 minutos del puente Shobol,\ncamino a Pullo.`}
        className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm leading-relaxed text-stone-800 placeholder-stone-400 transition-colors focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
      />
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-stone-400">
          Esta información se mostrará a tus compradores al confirmar el pedido.
        </p>
        <span className="text-xs text-stone-400">
          {value.length}/500
        </span>
      </div>
    </div>
  );
}
