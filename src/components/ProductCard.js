import Link from 'next/link';

export default function ProductCard({
  id,
  name,
  price,
  unit,
  image,
  producer,
  location,
}) {
  return (
    <Link
      href={`/marketplace/productos/${id}`}
      className="group block rounded-2xl border border-stone-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-stone-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-stone-100">
            <svg className="h-10 w-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        )}
        <div className="absolute right-2 top-2 rounded-lg bg-white/90 px-2.5 py-1 text-sm font-semibold text-green-700 shadow-sm backdrop-blur-sm">
          S/ {price} / {unit}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-stone-800 transition-colors group-hover:text-green-600">
          {name}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {producer}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </span>
        </div>
      </div>
    </Link>
  );
}
