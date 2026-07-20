'use client';

import { useState, useCallback } from 'react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      if (!text.trim()) return;

      onSend(text.trim());
      setText('');
    },
    [text, onSend],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-stone-100 bg-white px-4 py-3"
    >
      {/* Attach button */}
      <button
        type="button"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
        aria-label="Adjuntar imagen"
        tabIndex={-1}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {/* Text input */}
      <div className="flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
        />
      </div>

      {/* Send button */}
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.95]"
        aria-label="Enviar mensaje"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </form>
  );
}
