const statusConfig = {
  enviado: {
    label: 'Enviado',
    classes: 'bg-green-100 text-green-700 border-green-200',
    dot: 'bg-green-500',
  },
  pendiente: {
    label: 'Pendiente',
    classes: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  entregado: {
    label: 'Entregado',
    classes: 'bg-stone-100 text-stone-600 border-stone-200',
    dot: 'bg-stone-400',
  },
};

export default function OrderStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pendiente;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
