'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClipboardText,
  ChatCircleDots,
  MagnifyingGlass,
  Funnel,
  CaretDown,
  XCircle,
  Package,
} from '@phosphor-icons/react/dist/ssr';
import Tabs from '@/components/Tabs';
import OrderCard from '@/components/OrderCard';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import ChatList from '@/components/ChatList';
import { orders } from '@/lib/pedidos-data';

const tabs = [
  {
    value: 'pedidos',
    label: 'Pedidos',
    icon: <ClipboardText size={16} weight="bold" />,
    count: orders.length,
  },
  {
    value: 'chats',
    label: 'Chats',
    icon: <ChatCircleDots size={16} weight="bold" />,
    count: 3,
  },
];

const STATUS_FILTERS = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregado', label: 'Entregado' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'oldest', label: 'Más antiguos' },
];

export default function PedidosPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('pedidos');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter & sort orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.buyer.toLowerCase().includes(q) ||
          o.product.toLowerCase().includes(q) ||
          o.id.toString().includes(q),
      );
    }

    // Status filter
    if (statusFilter !== 'todos') {
      result = result.filter((o) => o.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [searchQuery, statusFilter, sortOrder]);

  const pendingCount = orders.filter((o) => o.status === 'pendiente').length;
  const hasActiveFilters = searchQuery.trim() || statusFilter !== 'todos';

  function clearAllFilters() {
    setSearchQuery('');
    setStatusFilter('todos');
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ============================== */}
        {/* HEADER                        */}
        {/* ============================== */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex items-center gap-3"
        >
          {/* Back arrow */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-200/50 hover:text-stone-900"
            aria-label="Regresar"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <ClipboardText size={18} weight="bold" />
            </div>
            <h1 className="text-xl font-bold text-stone-800 sm:text-2xl">
              Pedidos
            </h1>
          </div>
        </motion.div>

        {/* ============================== */}
        {/* TABS                          */}
        {/* ============================== */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ============================== */}
        {/* TAB CONTENT: PEDIDOS          */}
        {/* ============================== */}
        {activeTab === 'pedidos' && (
          <section>
            {/* Green divider */}
            <motion.div
              layout
              className="mb-6 mt-4 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-40"
            />

            {/* ============================== */}
            {/* SEARCH + FILTERS + SORT      */}
            {/* ============================== */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              className="mb-5 space-y-4"
            >
              {/* Search bar */}
              <div className="relative">
                <MagnifyingGlass
                  size={18}
                  weight="bold"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por comprador, producto o #pedido..."
                  aria-label="Buscar pedidos"
                  className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-10 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all focus:border-green-400 focus:ring-2 focus:ring-green-100"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-stone-600"
                      aria-label="Limpiar búsqueda"
                    >
                      <XCircle size={18} weight="fill" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Status pills */}
                <div className="flex flex-wrap gap-1.5">
                  {STATUS_FILTERS.map((f) => {
                    const isActive = statusFilter === f.value;
                    return (
                      <motion.button
                        key={f.value}
                        type="button"
                        onClick={() => setStatusFilter(f.value)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-pressed={isActive}
                        className={`relative rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-green-600 text-white shadow-sm'
                            : 'bg-white text-stone-600 border border-stone-200 hover:border-green-300 hover:text-green-700'
                        }`}
                      >
                        {f.label}
                        {f.value !== 'todos' && (
                          <span
                            className={`ml-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-semibold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-stone-100 text-stone-500'
                            }`}
                          >
                            {orders.filter((o) => o.status === f.value).length}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Sort + Clear */}
                <div className="flex items-center gap-2">
                  {/* Clear filters */}
                  <AnimatePresence>
                    {hasActiveFilters && (
                      <motion.button
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        type="button"
                        onClick={clearAllFilters}
                        className="overflow-hidden whitespace-nowrap rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-500 transition-all hover:border-red-300 hover:text-red-600"
                      >
                        Limpiar
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Sort dropdown */}
                  <div className="relative">
                    <motion.button
                      type="button"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-all hover:border-stone-300"
                    >
                      <Funnel size={14} weight="bold" />
                      {SORT_OPTIONS.find((o) => o.value === sortOrder)?.label}
                      <motion.div
                        animate={{ rotate: showSortDropdown ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CaretDown size={12} weight="bold" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {showSortDropdown && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="fixed inset-0 z-10"
                            onClick={() => setShowSortDropdown(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute right-0 top-full z-20 mt-1 min-w-[160px] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg"
                          >
                            {SORT_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setSortOrder(opt.value);
                                  setShowSortDropdown(false);
                                }}
                                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                                  sortOrder === opt.value
                                    ? 'bg-green-50 text-green-700 font-medium'
                                    : 'text-stone-600 hover:bg-stone-50'
                                }`}
                              >
                                {sortOrder === opt.value && (
                                  <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                <span className={sortOrder === opt.value ? '' : 'ml-5'}>{opt.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ============================== */}
            {/* SUMMARY + RESULTS            */}
            {/* ============================== */}
            <motion.div layout className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-stone-800">
                  {statusFilter === 'todos' ? 'Todos los pedidos' : `Pedidos ${statusFilter === 'pendiente' ? 'pendientes' : statusFilter === 'enviado' ? 'enviados' : 'entregados'}`}
                </h2>
                <p className="text-sm text-stone-500">
                  {filteredOrders.length} de {orders.length} pedidos
                  {pendingCount > 0 && statusFilter === 'todos' && !searchQuery && (
                    <span className="ml-1 text-amber-600">
                      · {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>

              {/* Results count badge */}
              {searchQuery && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700"
                >
                  {filteredOrders.length}
                </motion.div>
              )}
            </motion.div>

            {/* ============================== */}
            {/* ORDER LIST                   */}
            {/* ============================== */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {filteredOrders.length > 0 ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {filteredOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <OrderCard order={order} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-white py-16 shadow-sm"
                  >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100 text-stone-400"
                  >
                    <Package size={32} weight="bold" />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-semibold text-stone-700">
                    {searchQuery
                      ? 'Sin resultados'
                      : 'No hay pedidos'}
                  </h3>
                  <p className="mt-1 max-w-xs text-center text-sm text-stone-500">
                    {searchQuery
                      ? `No encontramos pedidos que coincidan con "${searchQuery}".`
                      : `No tienes pedidos con estado "${STATUS_FILTERS.find((f) => f.value === statusFilter)?.label?.toLowerCase()}".`}
                  </p>
                  {hasActiveFilters && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={clearAllFilters}
                      className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
                    >
                      Limpiar filtros
                    </motion.button>
                  )}
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* ============================== */}
        {/* TAB CONTENT: CHATS            */}
        {/* ============================== */}
        {activeTab === 'chats' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              layout
              className="mb-6 mt-4 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-40"
            />
            <ChatList />
          </motion.section>
        )}
      </div>
    </div>
  );
}

/**
 * Parse a Spanish-ish relative date string into a Date for sorting.
 */
function parseDate(dateStr) {
  const now = Date.now();
  const lower = dateStr.toLowerCase();

  if (lower.includes('hoy')) return now;
  if (lower.includes('ayer')) return now - 86400000;

  // Try "24 Mayo" format
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  for (let i = 0; i < months.length; i++) {
    if (lower.includes(months[i])) {
      const day = parseInt(dateStr, 10);
      if (!isNaN(day)) {
        const year = new Date().getFullYear();
        return new Date(year, i, day).getTime();
      }
    }
  }

  // Fallback: oldest possible date for unrecognized formats
  return 0;
}
