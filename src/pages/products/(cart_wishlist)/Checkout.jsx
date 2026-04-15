import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCart } from './cart-hooks/useGetCart'

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Standard Shipping', sub: '5–7 business days', price: 5 },
  { id: 'express',  label: 'Express Shipping',  sub: '2–3 business days', price: 9.99 },
  { id: 'overnight',label: 'Overnight',         sub: 'Next business day',  price: 24.99 },
]

const PAYMENT_METHODS = ['Credit Card', 'Bank Transfer', 'Paystack']

const CheckoutPage = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', apartment: '', city: '', state: '', zip: '', country: 'Nigeria',
  })
  const [shipping, setShipping] = useState('standard')
  const [payment, setPayment]   = useState('Credit Card')
  const [card, setCard]         = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [promo, setPromo]       = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [errors, setErrors]     = useState({})

  // --- replace this with your actual cart data ---
  const {items} = useGetCart()
  console.log(items);
  

  const shippingCost   = SHIPPING_OPTIONS.find(o => o.id === shipping)?.price ?? 0
  const subtotal       = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const tax            = subtotal * 0.075
  const discount       = promoApplied ? subtotal * 0.1 : 0
  const total          = subtotal + shippingCost + tax - discount

  const handleField = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleCard  = (e) => setCard(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.firstName) e.firstName = 'Required'
    if (!form.lastName)  e.lastName  = 'Required'
    if (!form.email)     e.email     = 'Required'
    if (!form.address)   e.address   = 'Required'
    if (!form.city)      e.city      = 'Required'
    if (!form.zip)       e.zip       = 'Required'
    if (payment === 'Credit Card') {
      if (!card.number) e.cardNumber = 'Required'
      if (!card.name)   e.cardName   = 'Required'
      if (!card.expiry) e.expiry     = 'Required'
      if (!card.cvv)    e.cvv        = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    // TODO: call your order mutation here
    console.log({ form, shipping, payment, card, cartItems, total })
    navigate('/order-success')
  }

  const applyPromo = () => {
    if (promo.toUpperCase() === 'SAVE10') setPromoApplied(true)
  }

  const inputClass = (field) =>
    `w-full h-10 border rounded-lg px-3 text-sm text-gray-800 outline-none focus:border-indigo-400 transition-colors ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-indigo-100'
    }`

  return (
    <div className="min-h-screen bg-indigo-50/40 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Brand */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-indigo-700">Vendora</h1>
          <p className="text-xs text-gray-400 mt-0.5">Secure Checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

          {/* ── Left column ── */}
          <div className="space-y-4">

            {/* 1. Contact */}
            <Section step="1" title="Contact Information">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" error={errors.firstName}>
                  <input name="firstName" value={form.firstName} onChange={handleField}
                    placeholder="John" className={inputClass('firstName')} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input name="lastName" value={form.lastName} onChange={handleField}
                    placeholder="Doe" className={inputClass('lastName')} />
                </Field>
              </div>
              <Field label="Email address" error={errors.email}>
                <input name="email" type="email" value={form.email} onChange={handleField}
                  placeholder="john@example.com" className={inputClass('email')} />
              </Field>
              <Field label="Phone number">
                <input name="phone" value={form.phone} onChange={handleField}
                  placeholder="+234 800 000 0000" className={inputClass('phone')} />
              </Field>
            </Section>

            {/* 2. Shipping Address */}
            <Section step="2" title="Shipping Address">
              <Field label="Street address" error={errors.address}>
                <input name="address" value={form.address} onChange={handleField}
                  placeholder="123 Main Street" className={inputClass('address')} />
              </Field>
              <Field label="Apartment, suite, etc. (optional)">
                <input name="apartment" value={form.apartment} onChange={handleField}
                  placeholder="Apt 4B" className={inputClass('apartment')} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="City" error={errors.city}>
                  <input name="city" value={form.city} onChange={handleField}
                    placeholder="Lagos" className={inputClass('city')} />
                </Field>
                <Field label="State">
                  <input name="state" value={form.state} onChange={handleField}
                    placeholder="Lagos State" className={inputClass('state')} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="ZIP / Postal code" error={errors.zip}>
                  <input name="zip" value={form.zip} onChange={handleField}
                    placeholder="100001" className={inputClass('zip')} />
                </Field>
                <Field label="Country">
                  <select name="country" value={form.country} onChange={handleField}
                    className="w-full h-10 border border-indigo-100 rounded-lg px-3 text-sm text-gray-800 bg-white outline-none focus:border-indigo-400">
                    <option>Nigeria</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Ghana</option>
                  </select>
                </Field>
              </div>
            </Section>

            {/* 3. Delivery */}
            <Section step="3" title="Delivery Method">
              <div className="space-y-2">
                {SHIPPING_OPTIONS.map((opt) => (
                  <button key={opt.id} onClick={() => setShipping(opt.id)}
                    className={`w-full flex items-center gap-3 border rounded-xl px-4 py-3 text-left transition-colors ${
                      shipping === opt.id
                        ? 'border-indigo-400 bg-indigo-50'
                        : 'border-indigo-100 bg-white hover:bg-indigo-50/50'
                    }`}>
                    <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                      shipping === opt.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-950">{opt.label}</p>
                      <p className="text-xs text-gray-400">{opt.sub}</p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600">
                      {opt.price === 0 ? 'Free' : `$${opt.price.toFixed(2)}`}
                    </span>
                  </button>
                ))}
              </div>
            </Section>

            {/* 4. Payment */}
            <Section step="4" title="Payment">
              <div className="flex gap-2 mb-4">
                {PAYMENT_METHODS.map((m) => (
                  <button key={m} onClick={() => setPayment(m)}
                    className={`flex-1 h-10 rounded-lg border text-sm font-medium transition-colors ${
                      payment === m
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-indigo-100 bg-white text-gray-600 hover:bg-indigo-50/50'
                    }`}>
                    {m}
                  </button>
                ))}
              </div>

              {payment === 'Credit Card' && (
                <div className="space-y-1">
                  <Field label="Card number" error={errors.cardNumber}>
                    <input name="number" value={card.number} onChange={handleCard}
                      placeholder="1234 5678 9012 3456" maxLength={19}
                      className={inputClass('cardNumber')} />
                  </Field>
                  <Field label="Cardholder name" error={errors.cardName}>
                    <input name="name" value={card.name} onChange={handleCard}
                      placeholder="John Doe" className={inputClass('cardName')} />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry date" error={errors.expiry}>
                      <input name="expiry" value={card.expiry} onChange={handleCard}
                        placeholder="MM / YY" className={inputClass('expiry')} />
                    </Field>
                    <Field label="CVV" error={errors.cvv}>
                      <input name="cvv" value={card.cvv} onChange={handleCard}
                        placeholder="123" maxLength={4} className={inputClass('cvv')} />
                    </Field>
                  </div>
                </div>
              )}

              {payment === 'Paystack' && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-700 text-center">
                  You'll be redirected to Paystack to complete your payment securely.
                </div>
              )}

              {payment === 'Bank Transfer' && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-700 space-y-1">
                  <p><span className="font-medium">Bank:</span> First Bank Nigeria</p>
                  <p><span className="font-medium">Account:</span> 1234567890</p>
                  <p><span className="font-medium">Name:</span> Vendora Ltd</p>
                  <p className="text-xs text-gray-400 mt-2">Use your order ID as the payment reference.</p>
                </div>
              )}
            </Section>
          </div>

          {/* ── Right column — Order Summary ── */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-white border border-indigo-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-4">Order Summary</p>

              {/* Items */}
             <div className="space-y-3 mb-4">
  {items.map((item) => (
    <div key={item._id} className="flex items-center gap-3">

      <div className="relative w-12 h-12 flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-12 h-12 rounded-lg object-cover border border-indigo-100"
        />

        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
          {item.quantity}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-indigo-950 truncate">
          {item.product.name}
        </p>

        <p className="text-xs text-gray-400">
          {item.product.category}
        </p>
      </div>

      <p className="text-sm font-semibold text-indigo-900 whitespace-nowrap">
        ${(item.product.price * item.quantity).toFixed(2)}
      </p>

    </div>
  ))}
</div>
              {/* Promo */}
              <div className="flex gap-2 mb-4">
                <input value={promo} onChange={(e) => setPromo(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 h-9 border border-indigo-100 rounded-lg px-3 text-sm outline-none focus:border-indigo-400" />
                <button onClick={applyPromo}
                  className="h-9 px-3 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-emerald-600 mb-3">✓ Promo SAVE10 applied — 10% off</p>
              )}

              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-emerald-600' : ''}>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (7.5%)</span><span>${tax.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount</span><span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold text-indigo-950 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleSubmit}
                className="w-full mt-4 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors">
                Place Order →
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">🔒 Secured by SSL encryption</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Helpers ──

const Section = ({ step, title, children }) => (
  <div className="bg-white border border-indigo-100 rounded-2xl p-5">
    <div className="flex items-center gap-2 mb-4">
      <span className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
        {step}
      </span>
      <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">{title}</p>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
)

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs text-gray-500 font-medium mb-1">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
)

export default CheckoutPage