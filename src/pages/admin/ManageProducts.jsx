import React, { useState } from 'react'
import { useGetProducts } from './hooks/useGetproductsQuery'

const ManageProducts = () => {
  const { products, loading, error } = useGetProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')

  const getStockStatus = (stock) => {
    if (stock === 0) return 'out'
    if (stock <= 10) return 'low'
    return 'active'
  }

  const statusBadge = {
    active: { label: 'Active',       className: 'bg-emerald-50 text-emerald-700' },
    low:    { label: 'Low Stock',    className: 'bg-amber-50 text-amber-700' },
    out:    { label: 'Out of Stock', className: 'bg-red-50 text-red-700' },
  }

  const filtered = (products || []).filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    const matchStatus   = status === 'all' || getStockStatus(p.stock) === status
    return matchSearch && matchCategory && matchStatus
  })

  const stats = [
    { label: 'Total Products', value: products?.length ?? 0,                                            valueClass: 'text-indigo-900' },
    { label: 'Active',         value: products?.filter(p => getStockStatus(p.stock) === 'active').length ?? 0, valueClass: 'text-indigo-900' },
    { label: 'Low Stock',      value: products?.filter(p => getStockStatus(p.stock) === 'low').length ?? 0,    valueClass: 'text-amber-600'  },
    { label: 'Out of Stock',   value: products?.filter(p => getStockStatus(p.stock) === 'out').length ?? 0,    valueClass: 'text-red-600'    },
  ]

  if (loading) return <LoadingSkeleton />
  if (error)   return <ErrorState message={error.message} />

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-indigo-950">Products</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your store inventory and listings</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-indigo-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">{s.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${s.valueClass}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-2.5 mb-4">
        <input
          className="flex-1 h-9 border border-indigo-100 rounded-lg px-3 text-sm text-gray-700 outline-none focus:border-indigo-400 placeholder:text-gray-400"
          placeholder="Search products, SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="h-9 border border-indigo-100 rounded-lg px-3 text-sm text-gray-600 bg-white outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="footwear">Footwear</option>
        </select>
        <select
          className="h-9 border border-indigo-100 rounded-lg px-3 text-sm text-gray-600 bg-white outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
        <button className="h-9 px-4 border border-indigo-100 rounded-lg text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 transition-colors">
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-indigo-100 rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-50 border-b border-indigo-100">
              {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-sm text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              filtered.map((product) => {
                const stockStatus = getStockStatus(product.stock ?? product.countInStock)
                const badge = statusBadge[stockStatus]
                return (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors">
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-indigo-100"
                          onError={(e) => { e.target.src = 'https://placehold.co/40x40?text=?' }}
                        />
                        <div>
                          <p className="text-sm font-medium text-indigo-950">{product.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            SKU: {product.sku ?? product._id?.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3 text-sm text-gray-500">{product.category}</td>
                    {/* Price */}
                    <td className="px-4 py-3 text-sm font-medium text-indigo-900">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    {/* Stock */}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.stock ?? product.countInStock}
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${badge.className}`}>
                        {badge.label}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-indigo-100 hover:bg-indigo-50 text-indigo-500 text-sm transition-colors">
                          ✏
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 hover:bg-red-50 text-red-400 text-sm transition-colors">
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50">
          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {products?.length ?? 0} products
          </p>
        </div>
      </div>
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className="p-8 space-y-3">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="h-12 bg-indigo-50 rounded-lg animate-pulse" />
    ))}
  </div>
)

const ErrorState = ({ message }) => (
  <div className="p-8 text-center">
    <p className="text-sm font-medium text-red-600">Failed to load products</p>
    <p className="text-xs text-gray-400 mt-1">{message}</p>
  </div>
)

export default ManageProducts