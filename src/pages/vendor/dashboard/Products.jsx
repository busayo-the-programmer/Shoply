import React from "react";
import { Link } from "react-router-dom";
import { useGetVendorStats } from "../hooks/useGetVendorStats";

export const VendorProducts = () => {
  const { products, loading } = useGetVendorStats();

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading your products...
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No products yet. Start by creating one 🚀
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] px-6 py-16">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-semibold text-gray-900">
          Your Products
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Manage your listings easily from here
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col"
          >
            {/* Image */}
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-44 w-full object-cover rounded-xl"
            />

            {/* Content */}
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-gray-900 font-semibold text-lg">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>

              <span className="text-indigo-600 font-semibold text-sm mt-1">
                ₦{product.price?.toLocaleString()}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto pt-5">
              
              {/* Update button */}
              <Link
                to={`/dashboard/vendor/update/${product._id}`}
                className="flex-1"
              >
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded-full transition shadow-md">
                  Update
                </button>
              </Link>

              {/* Delete button */}
              <button
                onClick={() => console.log("delete", product._id)}
                className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 text-sm py-2 rounded-full transition font-medium"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};