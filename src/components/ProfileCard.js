import Link from 'next/link';

export default function ProfileCard({
  name,
  location,
  image,
  rating,
  reviewCount,
  description,
  memberSince,
  productCount,
  animalCount,
}) {
  return (
    <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:gap-6">
        {/* Avatar */}
        <div className="mb-4 sm:mb-0">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-2xl bg-stone-100 sm:mx-0">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-green-100 text-3xl text-green-600">
                {name?.charAt(0) || 'P'}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-stone-800">{name}</h1>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-sm text-stone-500 sm:justify-start">
            <span className="flex items-center gap-1">
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
            <span className="flex items-center gap-1">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Desde {memberSince}
            </span>
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center justify-center gap-2 sm:justify-start">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? 'text-amber-400'
                      : 'text-stone-200'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-stone-600">
              {rating}
            </span>
            <span className="text-sm text-stone-400">({reviewCount} reseñas)</span>
          </div>

          {description && (
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {description}
            </p>
          )}

          {/* Stats */}
          <div className="mt-4 flex justify-center gap-4 sm:justify-start">
            {productCount !== undefined && (
              <div className="rounded-xl bg-green-50 px-4 py-2 text-center">
                <p className="text-lg font-bold text-green-700">{productCount}</p>
                <p className="text-xs text-green-600">Productos</p>
              </div>
            )}
            {animalCount !== undefined && (
              <div className="rounded-xl bg-amber-50 px-4 py-2 text-center">
                <p className="text-lg font-bold text-amber-700">{animalCount}</p>
                <p className="text-xs text-amber-600">Animales</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
