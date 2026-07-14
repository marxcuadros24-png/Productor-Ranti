import Link from 'next/link';

export default function ButtonCard({
  href,
  icon,
  title,
  description,
  variant = 'primary',
}) {
  const variants = {
    primary:
      'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md',
    secondary:
      'bg-white text-stone-700 border border-stone-200 hover:border-green-300 hover:text-green-600 shadow-sm hover:shadow-md',
    outline:
      'bg-transparent text-green-600 border border-green-200 hover:bg-green-50',
  };

  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-2xl p-5 transition-all ${variants[variant]}`}
    >
      {icon && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl">
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="mt-0.5 text-sm opacity-80">{description}</p>
        )}
      </div>
      <svg
        className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5"
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
  );
}
