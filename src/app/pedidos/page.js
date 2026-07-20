'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardText, ChatCircleDots } from '@phosphor-icons/react/dist/ssr';
import Tabs from '@/components/Tabs';
import OrderCard from '@/components/OrderCard';
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

export default function PedidosPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('pedidos');

  const pendingCount = orders.filter((o) => o.status === 'pendiente').length;

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ============================== */}
        {/* HEADER                        */}
        {/* ============================== */}
        <div className="mb-6 flex items-center gap-3">
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
        </div>

        {/* ============================== */}
        {/* TABS                          */}
        {/* ============================== */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Green divider */}
        <div className="mb-6 mt-4 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-40" />

        {/* ============================== */}
        {/* TAB CONTENT: PEDIDOS          */}
        {/* ============================== */}
        {activeTab === 'pedidos' && (
          <section>
            {/* Summary */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-stone-800">
                  Todos los pedidos
                </h2>
                <p className="text-sm text-stone-500">
                  {orders.length} pedidos recibidos
                  {pendingCount > 0 && (
                    <span className="ml-1 text-amber-600">
                      · {pendingCount} pendiente{pendingCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Order list */}
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}

        {/* ============================== */}
        {/* TAB CONTENT: CHATS            */}
        {/* ============================== */}
        {activeTab === 'chats' && (
          <section>
            <ChatList />
          </section>
        )}
      </div>
    </div>
  );
}
