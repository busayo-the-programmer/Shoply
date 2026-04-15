import { Link } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Create your store',
    description: 'Sign up and set up your vendor profile in minutes. Add your brand, bio, and payout details.',
  },
  {
    number: '02',
    title: 'List your products',
    description: 'Upload your products with photos, pricing, and inventory. Our tools make it effortless.',
  },
  {
    number: '03',
    title: 'Start earning',
    description: 'Go live instantly. Reach millions of buyers and watch your revenue grow from day one.',
  },
]

const perks = [
  { emoji: '💸', label: 'Up to 18% commissions' },
  { emoji: '📊', label: 'Real-time analytics' },
  { emoji: '🚀', label: 'Instant store setup' },
  { emoji: '🛡️', label: 'Seller protection' },
  { emoji: '🎯', label: 'Targeted promotions' },
  { emoji: '💬', label: '24/7 vendor support' },
]

export default function BecomeAVendor() {
  return (
    <section className="w-full bg-gradient-to-b from-[#E6EFFF] to-[#F5F7FF] py-24 px-6 sm:px-10 md:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Main card ── */}
        <div className="relative rounded-3xl bg-indigo-600 overflow-hidden">

          {/* Background blobs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-violet-500 rounded-full opacity-30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-indigo-400 rounded-full opacity-25 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-300 rounded-full opacity-20 blur-2xl pointer-events-none" />

          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Left — copy */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-indigo-200 uppercase bg-white/10 border border-white/20 px-4 py-1.5 rounded-full w-fit mb-6">
                🏪 For Sellers
              </span>

              <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight max-w-sm">
                Grow your business on Vendora
              </h2>

              <p className="text-indigo-200 text-sm md:text-base leading-relaxed mt-4 max-w-sm">
                Join 50,000+ vendors already selling on Vendora. Get access to millions of buyers, powerful tools, and commissions that reward your hustle.
              </p>

              {/* Perks grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-8 max-w-sm">
                {perks.map((p) => (
                  <div key={p.label} className="flex items-center gap-2.5 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5">
                    <span className="text-base leading-none">{p.emoji}</span>
                    <span className="text-white text-xs font-medium">{p.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <Link
                  to={"/vendor/apply"}
                  className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-sm px-6 py-3 rounded-full transition shadow-lg shadow-indigo-900/20"
                >
                  Apply to sell on Vendora
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/vendor/learn-more"
                  className="text-indigo-100 hover:text-white text-sm font-medium underline underline-offset-4 transition"
                >
                  Learn how it works
                </Link>
              </div>
            </div>

            {/* Right — steps */}
            <div className="lg:border-l border-white/10 p-10 md:p-14 flex flex-col justify-center gap-6">
              <p className="text-indigo-200 text-xs font-semibold tracking-widest uppercase">How it works</p>

              <div className="flex flex-col gap-5">
                {steps.map((step, i) => (
                  <div key={step.number} className="flex gap-5 group">
                    {/* Step number + connector */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition">
                        <span className="text-white text-xs font-bold">{step.number}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-white/15 min-h-[20px]" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pb-2">
                      <h4 className="text-white font-semibold text-sm">{step.title}</h4>
                      <p className="text-indigo-200 text-xs leading-relaxed mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-4 flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-5 py-4">
                <div className="flex -space-x-2">
                  {['#a5b4fc', '#818cf8', '#6366f1', '#4f46e5'].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-indigo-600 flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {['AK', 'JO', 'TM', '+'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">50,000+ active vendors</p>
                  <p className="text-indigo-200 text-xs mt-0.5">Avg. store earns $3,200/month</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom trust bar ── */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '50K+',  label: 'Active vendors' },
            { value: '2M+',   label: 'Monthly buyers' },
            { value: '18%',   label: 'Max commission' },
            { value: '4.9★',  label: 'Vendor satisfaction' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-indigo-100 rounded-2xl px-6 py-5 text-center shadow-sm shadow-indigo-50 hover:shadow-md hover:shadow-indigo-100 transition">
              <p className="text-indigo-600 text-2xl font-bold">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}