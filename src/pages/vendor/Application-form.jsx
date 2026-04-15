import { Link } from 'react-router-dom'
import {STEPS, useVendorApplication } from './hooks/useVendorApplication'
const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
)

const inputClass = (hasError) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 bg-white
   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition
   ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'}`

const selectClass = (hasError) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 bg-white
   focus:outline-none focus:ring-2 focus:ring-indigo-400 transition appearance-none
   ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-200'}`

const ChevronDown = () => (
  <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

export default function VendorApplication() {
  const {
    register, handleSubmit, errors, onSubmit,
    step, nextStep, prevStep, isFirstStep, isLastStep,
    loading, reviewRows,
  } = useVendorApplication()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">


        {/* Card */}
        
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-50 p-8">
  {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
         <Link to="/" className="text-lg font-bold text-gray-900">Vendora</Link>
        </div>
          {/* Header */}
          <div className="mb-7">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              Vendor Application
            </span>
            <h1 className="text-gray-900 text-2xl font-semibold mt-3">Become a Vendora seller</h1>
            <p className="text-gray-500 text-sm mt-1">
              Already a vendor?{' '}
              <Link to="/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-1.5 mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-1.5 flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${i < step ? 'bg-indigo-600 text-white' : i === step ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-100 text-gray-400'}`}>
                    {i < step
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : i + 1}
                  </div>
                  <span className={`text-[10px] font-medium whitespace-nowrap ${i === step ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mb-3 transition-all ${i < step ? 'bg-indigo-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Step 0 — Personal */}
            {step === 0 && (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Personal Information</p>
                <Field label="Full name" error={errors.fullName?.message}>
                  <input {...register('fullName')} type="text" placeholder="Jane Doe" className={inputClass(errors.fullName)} />
                </Field>
              </div>
            )}

            {/* Step 1 — Business */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Business Details</p>

                <Field label="Business name" error={errors.businessName?.message}>
                  <input {...register('businessName')} type="text" placeholder="Acme Ltd." className={inputClass(errors.businessName)} />
                </Field>

                <Field label="Business type" error={errors.businessType?.message}>
                  <div className="relative">
                    <select {...register('businessType')} className={selectClass(errors.businessType)}>
                      <option value="">Select business type</option>
                      <option value="sole_proprietor">Sole Proprietor</option>
                      <option value="partnership">Partnership</option>
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown />
                  </div>
                </Field>

                <Field label="Business email" error={errors.businessEmail?.message}>
                  <input {...register('businessEmail')} type="email" placeholder="hello@yourbusiness.com" className={inputClass(errors.businessEmail)} />
                </Field>
              </div>
            )}

            {/* Step 2 — Store */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Store Information</p>

                <Field label="Store name" error={errors.storeName?.message}>
                  <input {...register('storeName')} type="text" placeholder="My Awesome Store" className={inputClass(errors.storeName)} />
                </Field>

                <Field label="Product category" error={errors.productCategory?.message}>
                  <div className="relative">
                    <select {...register('productCategory')} className={selectClass(errors.productCategory)}>
                      <option value="">Select a category</option>
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

                <Field label="Expected monthly revenue" error={errors.expectedMonthlyRevenue?.message}>
                  <div className="relative">
                    <select {...register('expectedMonthlyRevenue')} className={selectClass(errors.expectedMonthlyRevenue)}>
                      <option value="">Select revenue range</option>
                      <option value="under_1k">Under $1,000</option>
                      <option value="1k_5k">$1,000 – $5,000</option>
                      <option value="5k_20k">$5,000 – $20,000</option>
                      <option value="20k_50k">$20,000 – $50,000</option>
                      <option value="above_50k">Above $50,000</option>
                    </select>
                    <ChevronDown />
                  </div>
                </Field>
              </div>
            )}

            {/* Step 3 — Location */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Location</p>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Country" error={errors.country?.message}>
                    <input {...register('country')} type="text" placeholder="Nigeria" className={inputClass(errors.country)} />
                  </Field>
                  <Field label="State / Province" error={errors.state?.message}>
                    <input {...register('state')} type="text" placeholder="Lagos" className={inputClass(errors.state)} />
                  </Field>
                </div>
                <Field label="Address" error={errors.address?.message}>
                  <input {...register('address')} type="text" placeholder="12 Commerce Street, Victoria Island" className={inputClass(errors.address)} />
                </Field>
              </div>
            )}

            {/* Step 4 — Review */}
            {step === 4 && (
              <div className="space-y-5">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Review your application</p>

                <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
                  {reviewRows.map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between px-4 py-2.5 gap-4">
                      <span className="text-xs text-gray-500 w-40 flex-shrink-0">{label}</span>
                      <span className="text-xs text-gray-800 font-medium text-right capitalize">{value || '—'}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2.5">
                      <input {...register('agreeToTerms')} type="checkbox" id="agreeToTerms" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400" />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-500 leading-relaxed">
                        I agree to Vendora's <a href="#" className="text-indigo-600 hover:underline">Terms & Conditions</a>
                      </label>
                    </div>
                    {errors.agreeToTerms && <span className="text-red-500 text-xs pl-6">{errors.agreeToTerms.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2.5">
                      <input {...register('agreeToVendorPolicy')} type="checkbox" id="agreeToVendorPolicy" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400" />
                      <label htmlFor="agreeToVendorPolicy" className="text-sm text-gray-500 leading-relaxed">
                        I agree to the <a href="#" className="text-indigo-600 hover:underline">Vendor Policy</a>
                      </label>
                    </div>
                    {errors.agreeToVendorPolicy && <span className="text-red-500 text-xs pl-6">{errors.agreeToVendorPolicy.message}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              {isFirstStep
                ? <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition">Cancel</Link>
                : (
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Back
                  </button>
                )
              }

              {isLastStep ? (
                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-md shadow-indigo-200">
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </>
                  )}
                </button>
              ) : (
                <button type="button" onClick={nextStep} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-md shadow-indigo-200">
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              )}
            </div>

          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Questions? <a href="mailto:vendors@vendora.com" className="underline hover:text-gray-600">Contact vendor support</a>
        </p>

      </div>
    </div>
  )
}