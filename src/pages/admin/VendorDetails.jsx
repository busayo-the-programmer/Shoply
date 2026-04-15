import React from "react";
import { useGetVendorById } from "./hooks/useGetAllVendors";
import { useParams } from "react-router-dom";

const VendorDetails = () => {
  const { id } = useParams();
  const { vendor, loading, error } = useGetVendorById(id);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading vendor profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error loading vendor</p>
      </div>
    );

  if (!vendor)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg">Vendor not found</p>
      </div>
    );

  const initials = vendor.businessName
    ?.split(" ")
    ?.map((w) => w[0])
    ?.join("")
    ?.slice(0, 2)
    ?.toUpperCase();

  const isVerified = vendor.status === "approved";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          
          {/* Avatar */}
          <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold">
            {initials}

            {isVerified && (
              <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                ✔
              </span>
            )}
          </div>

          {/* Name + location */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {vendor.storeName}
            </h2>

            <p className="text-gray-500">
              {vendor.state}, {vendor.country}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Owner: {vendor.fullName}
            </p>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <InfoCard
            title="Business Type"
            value={vendor.businessType.replace("_", " ")}
          />

          <InfoCard
            title="Expected Revenue"
            value={vendor.expectedMonthlyRevenue}
          />

          <InfoCard
            title="Product Category"
            value={vendor.productCategory}
          />

          <InfoCard
            title="Email"
            value={vendor.businessEmail}
          />

          <InfoCard
            title="Status"
            value={vendor.status}
          />

          <InfoCard
            title="Address"
            value={vendor.address}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;


/* Reusable info card */

const InfoCard = ({ title, value }) => (
  <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-gray-800 font-medium capitalize mt-1">
      {value || "N/A"}
    </p>
  </div>
);