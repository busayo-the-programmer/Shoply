import { Link } from "react-router-dom";
import { useGetCart } from "./cart-hooks/useGetCart";
import {
  useClearCart,
  useRemoveCartItem,
  useUpdateCartQuantity,
} from "./cart-hooks/useCartMutations";

const Cart = () => {
  const { items, loading, error, refetch } = useGetCart();
  const { mutate: updateQuantity } = useUpdateCartQuantity();

  const removeItem = useRemoveCartItem();
  const clearCart = useClearCart();

  // ── Loading ──
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-16">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse mb-8" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 animate-pulse"
            >
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                <div className="h-3 bg-gray-100 rounded-full w-1/4" />
              </div>
              <div className="h-5 bg-gray-100 rounded-full w-16" />
            </div>
          ))}
        </div>
      </div>
    );

  // ── Error ──
  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8 text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-gray-800 font-medium text-sm">{error}</p>
          <button
            onClick={refetch}
            className="mt-4 text-indigo-600 text-sm font-medium hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );

  // ── Empty ──
  if (!items.length)
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className="text-gray-900 text-xl font-semibold">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-sm max-w-xs">
            Looks like you haven't added anything yet. Start shopping to fill it
            up.
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-3 rounded-full transition shadow-md shadow-indigo-200"
          >
            Browse products
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    );

  // ── Cart total ──
  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FF] to-[#EEF2FF] px-6 sm:px-10 md:px-24 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
              Vendora
            </span>
            <h1 className="text-gray-900 text-2xl font-semibold mt-1">
              Your Cart
            </h1>
          </div>
          <span className="text-gray-400 text-sm">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Items list ── */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:shadow-indigo-50 transition p-4 flex gap-4"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d1d5db"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-medium text-sm leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  {product.category && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {product.category.replace("_", " ")}
                    </span>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-indigo-600 font-bold text-sm">
                      ${(product.price * quantity).toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-xs">
                      ${product.price} × {quantity}
                    </span>
                  </div>
                </div>

                {/* Quantity badge */}
                <div className="flex flex-col items-end gap-2">
                   <button
    onClick={() =>
      updateQuantity({ productId: product._id, quantity: quantity - 1 })
    }
    disabled={quantity <= 1}
    className="px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
  >-</button>

  <span className="px-3 text-sm font-semibold">{quantity}</span>

  <button
    onClick={() =>
      updateQuantity({ productId: product._id, quantity: quantity + 1 })
    }
    className="px-2 py-1 hover:bg-gray-100"
  >+</button>

  {/* Remove — use product._id */}
                  <button
                    onClick={() => removeItem.mutate(product._id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => clearCart.mutate()}
              className="w-full mt-3 border border-red-200 text-red-500 bg-red-300 hover:bg-red-50 text-sm font-medium py-2 rounded-xl"
            >
              Clear Cart
            </button>
          </div>

          {/* ── Order summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-indigo-50 shadow-xl shadow-indigo-100 p-6 sticky top-24">
              <h2 className="text-gray-900 font-semibold text-base mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="text-gray-900 font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex justify-between text-gray-900 font-semibold text-base">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <Link to="/products/checkout">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 rounded-xl transition shadow-md shadow-indigo-200 mt-6 flex items-center justify-center gap-2">
                  Proceed to checkout
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
              <a
                href="/products"
                className="block text-center text-indigo-600 text-sm font-medium hover:underline mt-4"
              >
                Continue shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
