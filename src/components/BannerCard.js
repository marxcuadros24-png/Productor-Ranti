import Link from 'next/link';

export default function BannerCard({
  title,
  description,
  actionLabel,
  actionHref,
  color = 'green',
}) {
  const colors = {
    green: 'bg-gradient-to-br from-green-600 to-green-700 text-white',
    earth: 'bg-gradient-to-br from-amber-600 to-amber-700 text-white',
    dark: 'bg-gradient-to-br from-stone-800 to-stone-900 text-white',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 shadow-sm sm:p-8 ${colors[color]}`}
    >
      {/* Background pattern */}
      <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />

      <div className="relative">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>
        {description && (
          <p className="mt-2 max-w-md text-sm opacity-90 sm:text-base">
            {description}
          </p>
        )}
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/20 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30"
          >
            {actionLabel}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
