import React from "react";
import { useGetCurrentUser } from "../landing page/useGetCurrentUser";

const Profile = () => {
  const { currentUser } = useGetCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] py-16 px-4">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* Avatar */}
          <img
            src={
              currentUser.profilePicture ||
              `https://ui-avatars.com/api/?name=${currentUser.fullName}&background=6366f1&color=fff`
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
          />

          {/* User Info */}
          <div className="flex flex-col gap-2 text-center md:text-left">

            <h2 className="text-3xl font-semibold text-gray-900">
              {currentUser.fullName}
            </h2>

            <div className="flex justify-center md:justify-start">
              <span className="bg-indigo-100 text-indigo-600 text-xs px-4 py-1 rounded-full font-medium capitalize">
                {currentUser.role}
              </span>
            </div>

            <p className="text-gray-500 text-sm">
              {currentUser.email}
            </p>

            {/* CTA */}
            <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-6 py-2 rounded-full shadow-md transition w-fit mx-auto md:mx-0">
              Edit Profile
            </button>

          </div>

        </div>

        {/* ACCOUNT DETAILS CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Account Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-sm">

            <InfoItem label="Full Name" value={currentUser.fullName} />

            <InfoItem label="Email Address" value={currentUser.email} />

            <InfoItem
              label="Role"
              value={currentUser.role}
              highlight
            />

            <InfoItem
              label="Account Status"
              value="Active"
              highlightGreen
            />

          </div>

        </div>

        {/* QUICK STATS CARD (future-ready for vendor analytics) */}
        <div className="grid md:grid-cols-3 gap-5">

          <StatCard title="Products" value="0" />

          <StatCard title="Orders" value="0" />

          <StatCard title="Revenue" value="₦0" />

        </div>

      </div>

    </section>
  );
};

export default Profile;



/* Reusable components */

const InfoItem = ({
  label,
  value,
  highlight,
  highlightGreen
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-gray-400 text-xs">
      {label}
    </span>

    <span
      className={`font-medium ${
        highlight
          ? "text-indigo-600"
          : highlightGreen
          ? "text-emerald-600"
          : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);


const StatCard = ({ title, value }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">

    <p className="text-gray-400 text-xs mb-2">
      {title}
    </p>

    <h4 className="text-2xl font-semibold text-indigo-600">
      {value}
    </h4>

  </div>
);