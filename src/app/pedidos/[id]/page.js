'use client';

import { useRouter, useParams } from 'next/navigation';
import { orders } from '@/lib/pedidos-data';
import OrderStatusBadge from '@/components/OrderStatusBadge';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const order = orders.find((o) => o.id === Number(params.id));

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F7F4]">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-200/50"
            aria-label="Regresar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-stone-600">Pedido no encontrado</p>
            <button
              type="button"
              onClick={() => router.push('/pedidos')}
              className="mt-4 rounded-xl bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Volver a pedidos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-200/50 hover:text-stone-900"
            aria-label="Regresar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-stone-800 sm:text-2xl">
              Pedido #{order.id}
            </h1>
          </div>
        </div>

        {/* Green divider */}
        <div className="mb-6 mt-4 h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-40" />

        {/* Buyer info card */}
        <div className="mb-6 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-stone-100">
              {order.buyerImage ? (
                <img src={order.buyerImage} alt={order.buyer} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-100 to-green-50 text-xl font-bold text-green-700">
                  {order.buyer.charAt(0)}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-stone-800">{order.buyer}</h2>
              <div className="mt-1 flex items-center gap-2 text-sm text-stone-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{order.phone}</span>
              </div>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {/* Order details */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
              Información del pedido
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Producto</span>
                <span className="font-medium text-stone-800">{order.product}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Fecha</span>
                <span className="font-medium text-stone-800">{order.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Total</span>
                <span className="font-semibold text-green-700">S/ {order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Pago</span>
                <span className="font-medium text-stone-800">{order.payment}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-stone-500">
              Entrega
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Modalidad</span>
                <span className="font-medium text-stone-800">{order.delivery}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Dirección</span>
                <span className="text-right font-medium text-stone-800">{order.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="mb-8 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500">
            Productos
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-left text-xs font-medium uppercase text-stone-400">
                <th className="pb-2 font-medium">Producto</th>
                <th className="pb-2 font-medium">Cantidad</th>
                <th className="pb-2 font-medium">Precio</th>
                <th className="pb-2 text-right font-medium">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-b border-stone-50 last:border-0">
                  <td className="py-3 font-medium text-stone-800">{item.name}</td>
                  <td className="py-3 text-stone-500">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-3 text-stone-500">S/ {item.price.toFixed(2)}</td>
                  <td className="py-3 text-right font-semibold text-stone-800">
                    S/ {(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="pt-3 text-right text-sm font-semibold text-stone-700">
                  Total
                </td>
                <td className="pt-3 text-right text-base font-bold text-green-700">
                  S/ {order.total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pb-8 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push('/pedidos')}
            className="flex-1 rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:border-stone-300 hover:shadow-md"
          >
            Volver a pedidos
          </button>
          {order.status === 'pendiente' && (
            <button
              type="button"
              className="flex-1 rounded-xl bg-[#184E22] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0f3617] hover:shadow-md"
            >
              Marcar como enviado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
