'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/pedidos', label: 'Pedidos' },
  { href: '/rutas', label: 'Rutas' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white shadow-sm">
            R
          </div>
          <span className="text-xl font-bold tracking-tight text-stone-800">
            RANTI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/perfil"
            className={`hidden rounded-xl px-4 py-2 text-sm font-medium transition-all sm:block ${
              pathname === '/perfil'
                ? 'bg-green-600 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Mi Perfil
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 md:hidden"
            aria-label="Abrir menú"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-stone-200 bg-white md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/perfil"
              onClick={() => setMenuOpen(false)}
              className={`mt-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                pathname === '/perfil'
                  ? 'bg-green-600 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Mi Perfil
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
