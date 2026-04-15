import React, { useState } from "react";
import { useGetAllVendors } from "./hooks/useGetAllVendors";
import { Link } from "react-router-dom";

// ------------------------------------------------------------
// 1. SKELETON CARD (Shimmer)
// ------------------------------------------------------------
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden pointer-events-none shadow-sm">
    <div className="h-[88px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
    <div className="p-[1.1rem_1.25rem_1.35rem]">
      <div className="flex items-center gap-[0.9rem] -mt-[2.4rem] mb-4">
        <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer shrink-0" />
        <div className="flex flex-col gap-1 pt-[1.8rem] flex-1">
          <div className="h-[14px] w-[60%] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-md" />
          <div className="h-[11px] w-[40%] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-md" />
        </div>
      </div>
      <div className="h-[14px] w-full mt-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-md" />
      <div className="h-[14px] w-[80%] mt-1.5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-md" />
      <div className="flex items-center gap-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-[46px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer" />
        ))}
      </div>
    </div>
  </div>
);

// ------------------------------------------------------------
// 2. STAR RATING COMPONENT
// ------------------------------------------------------------
const StarRating = ({ rating }) => (
  <span className="flex items-center gap-[0.18rem]">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} viewBox="0 0 20 20" className={`w-[13px] h-[13px] ${s <= Math.round(rating || 0) ? "fill-yellow-400" : "fill-gray-300"}`}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-[0.82rem] font-semibold text-gray-700 ml-[0.2rem]">{(rating || 0).toFixed(1)}</span>
  </span>
);

// ------------------------------------------------------------
// 3. VENDOR CARD (Banner / Avatar overlap / Chips / Stats)
// ------------------------------------------------------------
const VendorCard = ({ vendor }) => {
  const displayName = vendor?.businessName || vendor?.fullName || vendor?.name || 'Vendor';
  
  const initials = displayName
    .split(" ")
    .map((w) => w?.[0] || "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const description = vendor?.description || "No description available";
  const location = vendor?.location || vendor?.businessAddress || "Location not specified";
  const categories = vendor?.categories || [];
  const rating = vendor?.rating || 0;
  const reviewCount = vendor?.reviewCount || 0;
  const productCount = vendor?.productCount || 0;
  const totalSales = vendor?.totalSales || 0;
  const responseRate = vendor?.responseRate || 0;
  const isVerified = vendor?.isVerified || vendor?.verified || false;
  const logo = vendor?.logo || vendor?.businessLogo || vendor?.avatar;

  return (
    <Link href={`/vendors/${vendor._id}`} className="block no-underline text-inherit">
      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
        {/* Banner with category chips */}
        <div className="relative h-[88px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
          {categories.slice(0, 3).map((cat, idx) => (
            <span
              key={cat}
              className="absolute top-[0.7rem] text-[0.68rem] font-semibold tracking-[0.06em] uppercase text-white bg-white/20 backdrop-blur-sm border border-white/30 px-[0.55rem] py-[0.2rem] rounded-[5px]"
              style={{ left: `${0.75 + idx * 80}px` }}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="p-[1.1rem_1.25rem_1.35rem]">
          {/* Avatar overlapping the banner */}
          <div className="flex items-center gap-[0.9rem] -mt-[2.4rem] mb-4">
            <div className="relative w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 border-[3px] border-white flex items-center justify-center font-['Syne',sans-serif] font-bold text-base text-white shrink-0 overflow-hidden shadow-md">
              {logo ? (
                <img src={logo} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
              {isVerified && (
                <span className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white" title="Verified Vendor">
                  <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] stroke-white fill-none stroke-[2.5] stroke-round stroke-join-round">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="pt-[1.8rem]">
             <Link to={`/dashboard/admin/vendor-details/${vendor._id}`} className="no-underline text-gray-900 hover:text-indigo-600 transition-colors">
              <h3 className="font-['Syne',sans-serif] font-bold text-base text-gray-900 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                {displayName}
              </h3>
             </Link>
              <span className="flex items-center gap-[0.3rem] text-[0.78rem] text-gray-500 mt-[0.2rem]">
                <svg viewBox="0 0 20 20" className="w-3 h-3 fill-current shrink-0">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[0.84rem] text-gray-600 leading-relaxed line-clamp-2 mb-[0.9rem]">
            {description}
          </p>

          {/* Star rating */}
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={rating} />
            <span className="text-[0.78rem] text-gray-500">({reviewCount.toLocaleString()})</span>
          </div>

          {/* 3-stat strip: Products / Sales / Response Rate */}
          <div className="flex items-center gap-0 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex-1 flex flex-col items-center py-[0.6rem] px-[0.4rem] gap-[0.15rem]">
              <span className="font-['Syne',sans-serif] font-bold text-[0.92rem] text-gray-900">{productCount}</span>
              <span className="text-[0.7rem] text-gray-500 font-normal">Products</span>
            </div>
            <div className="w-px h-9 bg-gray-200 shrink-0" />
            <div className="flex-1 flex flex-col items-center py-[0.6rem] px-[0.4rem] gap-[0.15rem]">
              <span className="font-['Syne',sans-serif] font-bold text-[0.92rem] text-gray-900">{totalSales.toLocaleString()}</span>
              <span className="text-[0.7rem] text-gray-500 font-normal">Sales</span>
            </div>
            <div className="w-px h-9 bg-gray-200 shrink-0" />
            <div className="flex-1 flex flex-col items-center py-[0.6rem] px-[0.4rem] gap-[0.15rem]">
              <span className="font-['Syne',sans-serif] font-bold text-[0.92rem] text-gray-900">{responseRate}%</span>
              <span className="text-[0.7rem] text-gray-500 font-normal">Response</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

// ------------------------------------------------------------
// 4. MAIN COMPONENT (Hero, Tabs, Grid, States)
// ------------------------------------------------------------
const Vendors = () => {
  const { vendors, loading, error } = useGetAllVendors();
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Top Rated", "New", "Trending"];

  return (
    <>
      {/* Global animation for shimmer effect */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        
        @keyframes shimmer {
          to { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.6s infinite;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 font-['DM_Sans',sans-serif] text-gray-900 pb-24">
        {/* ----- HERO with radial gold glow, eyebrow badge, and search bar ----- */}
        <header className="relative overflow-hidden py-20 px-8 md:py-20 md:px-8 text-center border-b border-gray-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
          {/* Radial gold glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(250,204,21,0.25),transparent_70%)] pointer-events-none" />
          
          {/* Eyebrow badge */}
          <div className="relative inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] uppercase text-yellow-700 bg-yellow-100/80 backdrop-blur-sm border border-yellow-300 px-4 py-1 rounded-full mb-5">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Trusted Marketplace
          </div>

          <h1 className="relative font-['Syne',sans-serif] text-[clamp(2.2rem,6vw,3.8rem)] font-extrabold leading-tight -tracking-[0.03em] text-gray-900 mb-3 max-sm:text-3xl">
            Discover <span className="text-indigo-600">Vendors</span>
          </h1>
          <p className="relative text-base text-gray-600 max-w-[420px] mx-auto mb-8 leading-relaxed">
            Browse verified sellers and independent merchants curated for quality and reliability.
          </p>

          {/* Search bar */}
          <div className="relative flex max-w-[520px] mx-auto border-2 border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-200 focus-within:border-indigo-400 focus-within:shadow-[0_0_0_3px_rgba(79,70,229,0.2)]">
            <span className="flex items-center px-4 text-gray-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input className="flex-1 bg-transparent border-none outline-none font-['DM_Sans',sans-serif] text-[0.95rem] text-gray-900 py-[0.85rem] placeholder:text-gray-400" type="text" placeholder="Search vendors by name, category…" />
            <button className="bg-indigo-600 text-white border-none font-['DM_Sans',sans-serif] font-semibold text-sm px-[1.4rem] cursor-pointer transition-colors hover:bg-indigo-700">Search</button>
          </div>
        </header>

        {/* ----- Filter tabs (All / Top Rated / New / Trending) ----- */}
        {!loading && !error && vendors && vendors.length > 0 && (
          <div className="flex items-center justify-between flex-wrap gap-4 max-w-7xl mx-auto pt-7 px-8 max-sm:px-5">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">{vendors.length}</strong> vendors found
            </p>
            <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-['DM_Sans',sans-serif] text-[0.82rem] font-medium px-[0.9rem] py-[0.4rem] rounded-md cursor-pointer transition-all ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ----- Responsive card grid ----- */}
        <main className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 max-w-7xl mx-auto mt-7 px-8 max-sm:px-5 max-sm:mt-5 max-sm:gap-4">
          {loading ? (
            // Skeleton shimmer cards while loading
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            // Error state
            <div className="max-w-[400px] mx-auto my-24 text-center px-8 col-span-full">
              <div className="w-[60px] h-[60px] mx-auto mb-5 rounded-2xl flex items-center justify-center bg-red-50 text-red-500">
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none stroke-[1.8] stroke-round stroke-join-round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="font-['Syne',sans-serif] text-xl font-bold text-gray-900 mb-2">Failed to load vendors</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {typeof error === "string" ? error : "Something went wrong. Please try again."}
              </p>
              <button className="mt-6 bg-indigo-600 text-white border-none font-['DM_Sans',sans-serif] font-semibold text-sm py-[0.65rem] px-[1.6rem] rounded-lg cursor-pointer transition-colors hover:bg-indigo-700" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          ) : !vendors || vendors.length === 0 ? (
            // Empty state
            <div className="max-w-[400px] mx-auto my-24 text-center px-8 col-span-full">
              <div className="w-[60px] h-[60px] mx-auto mb-5 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600">
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none stroke-[1.8] stroke-round stroke-join-round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h2 className="font-['Syne',sans-serif] text-xl font-bold text-gray-900 mb-2">No vendors yet</h2>
              <p className="text-sm text-gray-600 leading-relaxed">Vendors who register will appear here. Check back soon.</p>
            </div>
          ) : (
            // Vendor cards
            vendors.map((vendor) => <VendorCard key={vendor._id} vendor={vendor} />)
          )}
        </main>
      </div>
    </>
  );
};

export default Vendors;