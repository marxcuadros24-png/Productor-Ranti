'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderCard({ order }) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <div className="flex items-start gap-4">
        {/* Buyer photo */}
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-stone-100 sm:h-14 sm:w-14">
          {order.buyerImage ? (
            <img
              src={order.buyerImage}
              alt={order.buyer}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-50 text-lg font-bold text-green-700">
              {order.buyer.charAt(0)}
            </div>
          )}
        </div>

        {/* Order info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-stone-800">{order.buyer}</h3>
              <p className="mt-0.5 text-xs font-medium text-stone-400">
                Pedido #{order.id}
              </p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="mt-3 space-y-1">
            <p className="text-sm font-medium text-stone-700">
              {order.product}
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {order.date}
              </span>
              <span className="font-semibold text-green-700">
                S/ {order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => router.push(`/pedidos/${order.id}`)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
            >
              Ver detalles
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
