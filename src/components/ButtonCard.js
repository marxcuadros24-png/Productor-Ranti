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
      className={`group flex items-center gap-3 rounded-2xl p-4 transition-all sm:gap-5 sm:p-6 ${variants[variant]}`}
    >
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 sm:h-14 sm:w-14">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <h3 className="text-xs font-semibold leading-tight sm:text-base">{title}</h3>
        {description && (
          <p className="mt-0.5 truncate text-xs leading-relaxed opacity-80 sm:mt-1 sm:text-sm">{description}</p>
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
