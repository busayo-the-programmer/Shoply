import { useUpdateProducts } from "../hooks/useUpdateProducts"

const UpdateProductdata = () => {
const { mutate, isPending } = useUpdateProducts();


  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <h1 className="mb-8 text-2xl font-bold text-gray-900">Edit Product</h1>

          <form onSubmit={() => {mutate({ id: product._id, productData });
}} className="space-y-5">

            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Title
              </label>
              <input
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                placeholder="Product title"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Image URL
              </label>
              <input
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
              />
              {productData.image && (
                <img
                  src={productData.image}
                  alt="preview"
                  className="mt-3 h-40 w-full rounded-xl object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

            {/* Category */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="hair">Hair and Accessories</option>
                <option value="food">Food</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  min={0}
                  step={0.01}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-8 pr-4 text-sm text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Description
              </label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Describe the product…"
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-300 transition"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProductdata