import React, { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useGetCurrentUser } from '../landing page/useGetCurrentUser'
import { useGetCart } from './(cart_wishlist)/cart-hooks/useGetCart'
import { useGetWishlist } from './(cart_wishlist)/wish-hooks.js/usegetWishlist'

const ProductLayout = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const navigate = useNavigate()
    const {items} = useGetCart()
    const {products} = useGetWishlist()
    const {currentUser} =useGetCurrentUser()
  

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF]">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm shadow-indigo-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-24 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src="/vendora-logo.png"
                alt="Vendora"
                className="w-40" />
                        </Link>

          {/* Search — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-md items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, categories…"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1">

            {/* Mobile search toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="sm:hidden w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* Wishlist */}
            <Link
              to="/products/wishlist"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {/* badge — wire up your wishlist count here */}
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{products.length}</span>
            </Link>

            {/* Cart */}
            <Link
              to="/products/cart"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {/* badge — wire up your cart count here */}
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{items.length}</span>
            </Link>

        {currentUser ? (
            currentUser?.role === "admin" ? (
              <Link
              to="/dashboard"
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            ) : (
               <Link
              to="/dashboard"
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            )
          ): ("User") }
           
          </div>
        </div>

        {/* Mobile search bar — slides down */}
        {mobileSearchOpen && (
          <div className="sm:hidden px-6 pb-3 border-t border-gray-100">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 mt-3 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                autoFocus
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </form>
          </div>
        )}
      </header>

      {/* ── Page content ── */}
      <main>
        <Outlet />
      </main>

    </div>
  )
}

export default ProductLayout