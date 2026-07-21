'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/pedidos', label: 'Pedidos' },
  { href: '/perfil', label: 'Perfil' },
];

const menuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.2, ease: 'easeOut' },
  }),
};

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-sm font-bold text-white shadow-sm"
          >
            R
          </motion.div>
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
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'text-green-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-tab"
                    className="absolute inset-0 rounded-xl bg-green-50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 md:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <motion.path
                  key="close"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <motion.path
                  key="menu"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-t border-stone-200 bg-white md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-green-50 text-green-700'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                custom={navLinks.length}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className={`mt-2 block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    pathname === '/perfil'
                      ? 'bg-green-600 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Mi Perfil
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
