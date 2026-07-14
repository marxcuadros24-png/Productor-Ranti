import Link from 'next/link';

export default function SectionTitle({
  title,
  subtitle,
  actionLabel,
  actionHref,
}) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-xl font-semibold text-stone-800 sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="flex items-center gap-1 text-sm font-medium text-green-600 transition-colors hover:text-green-700"
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
  );
}
