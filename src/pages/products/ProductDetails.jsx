import React, { useState } from 'react'
import { useGetSingleProducts } from './hooks/useGetSingleProduct'
import { useNavigate, useParams } from 'react-router-dom'
import { useToggleWishlist } from './(cart_wishlist)/wish-hooks.js/useAddWishlist'
import { useGetWishlist } from './(cart_wishlist)/wish-hooks.js/usegetWishlist'
import { useAddToCart } from './(cart_wishlist)/cart-hooks/useCartMutations'

const ProductDetails = () => {
  const {id} = useParams()
  const { product, loading } = useGetSingleProducts(id)
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
 const toggleWishlist = useToggleWishlist()
 const { products: wishlistProducts } = useGetWishlist()
   const addToCart = useAddToCart()
 

  const handleAddToCartUi = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  // ── Loading ──
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
        <p className="text-gray-400 text-sm tracking-wide">Loading product…</p>
      </div>
    </div>
  )

  // ── Not found ──
  if (!product) return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <h2 className="text-gray-900 text-xl font-semibold">Product not found</h2>
        <p className="text-gray-500 text-sm max-w-xs">This product may have been removed or doesn't exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition shadow-md shadow-indigo-200"
        >
          Go back
        </button>
      </div>
    </div>
  )

  // normalise images — support single image or array
  const images = product.images?.length
    ? product.images
    : product.image
    ? [product.image]
    : []

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const inStock = product.stock > 0
   const isWishlisted = wishlistProducts?.some(
  (item) => item._id === product._id
)

  // ── Details ──
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 transition">Home</button>
          <span>/</span>
          <button onClick={() => navigate(-1)} className="hover:text-indigo-600 transition">Products</button>
          <span>/</span>
          <span className="text-gray-600 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Image gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative bg-white rounded-2xl border border-indigo-50 shadow-lg shadow-indigo-100 overflow-hidden aspect-square flex items-center justify-center">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-300">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span className="text-sm">No image available</span>
                </div>
              )}

              {/* Discount badge */}
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discountPercent}%
                </span>
              )}

              {/* Stock badge */}
              {!inStock && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-gray-800 text-white text-sm font-semibold px-5 py-2 rounded-full">
                    Out of stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition flex-shrink-0
                      ${selectedImage === i ? 'border-indigo-500' : 'border-transparent hover:border-indigo-200'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ── */}
          <div className="flex flex-col gap-5">

            {/* Category + vendor */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  {product.category.replace(/_/g, ' ')}
                </span>
              )}
              {product.vendor && (
                <span className="text-xs text-gray-400">by <span className="text-gray-600 font-medium">{product.vendor}</span></span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-gray-900 text-3xl font-semibold leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="16" height="16" viewBox="0 0 24 24"
                      fill={star <= Math.round(product.rating) ? '#f59e0b' : 'none'}
                      stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} {product.reviewCount && `(${product.reviewCount} reviews)`}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-indigo-600 text-4xl font-bold">
                ${Number(product.price).toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-gray-400 text-lg line-through mb-1">
                  ${Number(product.originalPrice).toLocaleString()}
                </span>
              )}
              {hasDiscount && (
                <span className="text-rose-500 text-sm font-semibold mb-1">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-5">
              {product.description}
            </p>

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
              <span className={`text-sm font-medium ${inStock ? 'text-emerald-600' : 'text-red-500'}`}>
                {inStock ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 pt-2">
              {/* Quantity picker */}
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={!inStock}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition disabled:opacity-40"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>

              {/* Add to cart */}
              <button
                 onClick={() =>
    addToCart.mutate({
      id: product._id,
      quantity: 1
    }), handleAddToCartUi()
  }
                disabled={!inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition shadow-md
                  ${addedToCart
                    ? 'bg-emerald-500 shadow-emerald-200 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
              >
                {addedToCart ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Add to cart
                  </>
                )}
              </button>

              {/* Wishlist */}
             <button
  onClick={() => toggleWishlist.mutate(product._id)}
  className={`w-12 h-12 rounded-full border flex items-center justify-center transition
    ${
      isWishlisted
        ? "bg-rose-500 border-rose-500 text-white"
        : "border-gray-200 bg-white text-gray-400 hover:border-rose-300 hover:text-rose-500"
    }
  `}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={isWishlisted ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
</button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              {[
                { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, label: 'Buyer protection' },
                { icon: <><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8zm5 8h2"/></>, label: 'Fast delivery' },
                { icon: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.18-5.16"/></>, label: 'Easy returns' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl py-3 px-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {b.icon}
                  </svg>
                  <span className="text-[11px] text-gray-500 text-center font-medium leading-tight">{b.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Back button ── */}
        <button
          onClick={() => navigate(-1)}
          className="mt-12 flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-600 transition font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to products
        </button>

      </div>
    </div>
  )
}

export default ProductDetails