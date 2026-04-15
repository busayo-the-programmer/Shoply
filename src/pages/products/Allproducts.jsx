import React from 'react'
import { useGetAllProducts } from './hooks/useGetAllproducts'
import { useGetCurrentUser } from '../landing page/useGetCurrentUser'
import { Link } from 'react-router-dom'
import { useAddToCart } from './(cart_wishlist)/cart-hooks/useCartMutations'

// ── Skeleton card shown while loading ──
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="bg-gray-100 h-52 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-gray-100 rounded-full w-1/3" />
      <div className="h-4 bg-gray-100 rounded-full w-2/3" />
      <div className="h-3 bg-gray-100 rounded-full w-full" />
      <div className="h-3 bg-gray-100 rounded-full w-4/5" />
      <div className="flex items-center justify-between pt-2">
        <div className="h-5 bg-gray-100 rounded-full w-16" />
        <div className="h-8 bg-gray-100 rounded-full w-24" />
      </div>
    </div>
  </div>
)

const AllProducts = () => {
  const { products, loading, error } = useGetAllProducts()
  const {currentUser} = useGetCurrentUser()
  const addToCart = useAddToCart()

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="h-4 bg-gray-200 rounded-full w-24 mb-3 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded-full w-64 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    )
  }
  if (error){
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-gray-900 text-xl font-semibold mb-2">Error loading products</h2>
          <p className="text-gray-500 text-sm">{error.message || "An unexpected error occurred while fetching products."}</p>
        </div>
      </div>
    ) 
  }

  // ── Empty state ──
  if (!products.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h2 className="text-gray-900 text-xl font-semibold">No products yet</h2>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          Products will appear here once vendors start listing them.
        </p>
      </div>
    )
  }

  // ── Products grid ──
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
              Vendora Marketplace
            </span>
            <h1 className="text-gray-900 text-3xl font-semibold mt-1">
              All Products
            </h1>
          </div>
          {currentUser?.role === "admin" || currentUser?.role === "vendor" ?  
            
            <Link to={"/products/create"}><button
              type="button"
              className="bg-indigo-500 text-white border border-gray-300 mt-6 text-sm hover:bg-indigo-600 active:scale-95 transition-all w-40 h-11 rounded-full"
            >
             create new products
            </button></Link>  :  <p className="text-gray-400 text-sm">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </p>}
         
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            
            <div
              key={product._id ?? product.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-50 h-52">
                {product.image ? (
                 <Link to={`/products/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                 </Link>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                )}

                {/* Category badge */}
                {product.category && (
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-indigo-600 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-indigo-100">
                    {product.category}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2">

                {/* Name */}
                <h2 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {product.description}
                </p>

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
                  
                  <button
  onClick={() =>
    addToCart.mutate({
      id: product._id,
      quantity: 1
    })
  }
  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-sm shadow-indigo-200"
>
  {addToCart.isPending ? "Adding..." : "Add to cart"}
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

export default AllProducts