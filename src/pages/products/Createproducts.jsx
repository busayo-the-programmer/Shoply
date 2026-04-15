import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProduct } from './hooks/useCreateProduct'
import { createProductSchema } from './validation/createProductSchema'

const Field = ({ label, error, hint, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
    {hint && !error && <span className="text-gray-400 text-xs">{hint}</span>}
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
)

const inputClass = (hasError) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white
   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition
   ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'}`

const ChevronDown = () => (
  <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const Createproducts = () => {
  const { createProduct, loading } = useCreateProduct()
  const [imagePreview, setImagePreview] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: '',
      stock: '',
      image: '',
    },
  })

  const watchedImage = watch('image')
  const watchedDescription = watch('description')

  // live image preview
  React.useEffect(() => {
    const isValid = watchedImage?.startsWith('http')
    setImagePreview(isValid ? watchedImage : '')
  }, [watchedImage])

  const onSubmit = async (data) => {
    // cast numeric strings to numbers before sending
    const payload = {
      ...data,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      stock: Number(data.stock),
    }
    await createProduct(payload)
    reset()
    setImagePreview('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
            Vendor Dashboard
          </span>
          <h1 className="text-gray-900 text-2xl font-semibold mt-3">Create a new product</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to list your product on Vendora.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Form ── */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="lg:col-span-3 bg-white rounded-2xl border border-indigo-50 shadow-xl shadow-indigo-100 p-8 space-y-5"
          >

            {/* Name */}
            <Field label="Product name" error={errors.name?.message}>
              <input
                {...register('name')}
                type="text"
                placeholder="e.g. Wireless Noise-Cancelling Headphones"
                className={inputClass(errors.name)}
              />
            </Field>

            {/* Description */}
            <Field
              label="Description"
              error={errors.description?.message}
              hint="Min. 20 characters"
            >
              <div className="relative">
                <textarea
                  {...register('description')}
                  rows={4}
                  placeholder="Describe your product — features, materials, sizing…"
                  className={`${inputClass(errors.description)} resize-none`}
                />
                <span className={`absolute bottom-2 right-3 text-xs ${
                  watchedDescription?.length > 900 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {watchedDescription?.length ?? 0}/1000
                </span>
              </div>
            </Field>

            {/* Price + Original price */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price ($)" error={errors.price?.message}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    {...register('price')}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`${inputClass(errors.price)} pl-7`}
                  />
                </div>
              </Field>

              <Field
                label="Original price ($)"
                error={errors.originalPrice?.message}
                hint="Optional — shows as strikethrough"
              >
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    {...register('originalPrice')}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className={`${inputClass(errors.originalPrice)} pl-7`}
                  />
                </div>
              </Field>
            </div>

            {/* Category + Stock */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category" error={errors.category?.message}>
                <div className="relative">
                  <select
                    {...register('category')}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 bg-white
                      focus:outline-none focus:ring-2 focus:ring-indigo-400 transition appearance-none
                      ${errors.category ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'}`}
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                    <option value="home_garden">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="food_beverage">Food & Beverage</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown />
                </div>
              </Field>

              <Field label="Stock quantity" error={errors.stock?.message}>
                <input
                  {...register('stock')}
                  type="number"
                  min="0"
                  placeholder="e.g. 50"
                  className={inputClass(errors.stock)}
                />
              </Field>
            </div>

            {/* Image URL */}
            <Field
              label="Image URL"
              error={errors.image?.message}
              hint="Optional — paste a direct image link"
            >
              <input
                {...register('image')}
                type="text"
                placeholder="https://example.com/image.jpg"
                className={inputClass(errors.image)}
              />
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2 shadow-md shadow-indigo-200 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Creating product…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Publish product
                </>
              )}
            </button>

          </form>

          {/* ── Live preview ── */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Live preview</p>

            <div className="bg-white rounded-2xl border border-indigo-50 shadow-xl shadow-indigo-100 overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                {watch('category') && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-full">
                    {watch('category').replace('_', ' ')}
                  </span>
                )}
                <h3 className="text-gray-900 font-semibold text-sm leading-snug line-clamp-2">
                  {watch('name') || <span className="text-gray-300">Product name</span>}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">
                  {watch('description') || <span className="text-gray-300">Description will appear here</span>}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  {watch('price') && (
                    <span className="text-indigo-600 font-bold text-base">
                      ${Number(watch('price')).toLocaleString()}
                    </span>
                  )}
                  {watch('originalPrice') && (
                    <span className="text-gray-400 text-xs line-through">
                      ${Number(watch('originalPrice')).toLocaleString()}
                    </span>
                  )}
                </div>
                {watch('stock') && (
                  <p className="text-xs text-gray-400">
                    {watch('stock')} units in stock
                  </p>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 space-y-2">
              <p className="text-indigo-700 text-xs font-semibold">💡 Tips for better listings</p>
              {[
                'Use a clear, well-lit product photo',
                'Write descriptions that answer buyer questions',
                'Set a competitive price for your category',
                'Keep stock quantity accurate',
              ].map((tip) => (
                <p key={tip} className="text-indigo-500 text-xs flex items-start gap-1.5">
                  <svg className="mt-0.5 flex-shrink-0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {tip}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Createproducts