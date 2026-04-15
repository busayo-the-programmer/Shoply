import { useGetWishlist } from "./wish-hooks.js/usegetWishlist"

const Wishlist = () => {
  const { products, loading, error, refetch } = useGetWishlist()

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 w-36 bg-gray-200 rounded-full animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                <div className="h-3 bg-gray-100 rounded-full w-1/4" />
                <div className="flex justify-between pt-2">
                  <div className="h-5 bg-gray-100 rounded-full w-16" />
                  <div className="h-8 bg-gray-100 rounded-full w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ── Error ──
  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8 text-center max-w-sm">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <p className="text-gray-800 font-medium text-sm">{error}</p>
        <button onClick={refetch} className="mt-4 text-indigo-600 text-sm font-medium hover:underline">
          Try again
        </button>
      </div>
    </div>
  )

  // ── Empty ──
  if (!products.length) return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <h2 className="text-gray-900 text-xl font-semibold">No saved items yet</h2>
        <p className="text-gray-500 text-sm max-w-xs">
          Tap the heart on any product to save it here for later.
        </p>
        <a
          href="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition shadow-md shadow-indigo-200"
        >
          Browse products
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">Vendora</span>
            <h1 className="text-gray-900 text-2xl font-semibold mt-1 flex items-center gap-2">
              Wishlist
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </h1>
          </div>
          <span className="text-gray-400 text-sm">
            {products.length} {products.length === 1 ? 'saved item' : 'saved items'}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-rose-50 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                )}

                {/* Category badge */}
                {product.category && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-indigo-600 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-indigo-100">
                    {product.category.replace('_', ' ')}
                  </span>
                )}

                {/* Saved heart badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-indigo-600 font-bold text-base">
                      ${Number(product.price).toLocaleString()}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-gray-400 text-xs line-through ml-1.5">
                        ${Number(product.originalPrice).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-sm shadow-indigo-200">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Wishlist