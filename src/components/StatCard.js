export default function StatCard({ icon, label, value, color = 'green' }) {
  const colors = {
    green: 'bg-green-50 text-green-600',
    earth: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-stone-800">{value}</p>
          <p className="text-sm text-stone-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
