export default function ActivityCard({ icon, title, description, time, type = 'default' }) {
  const typeStyles = {
    default: 'border-stone-100',
    sale: 'border-green-100 bg-green-50/50',
    new: 'border-blue-100 bg-blue-50/50',
    alert: 'border-amber-100 bg-amber-50/50',
  };

  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md ${typeStyles[type]}`}
    >
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-stone-800">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm text-stone-500 line-clamp-2">
            {description}
          </p>
        )}
        {time && (
          <p className="mt-1 text-xs text-stone-400">{time}</p>
        )}
      </div>
    </div>
  );
}
