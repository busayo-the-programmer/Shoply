import React, { useEffect, useRef } from 'react'
import { useGetCurrentUser } from '../landing page/useGetCurrentUser';
import { useGetAdminController } from './hooks/useGetAdminController';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from "chart.js"

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Tooltip)

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  revenue: [4200, 5800, 4100, 7200, 6800, 9100, 8300, 7600, 9800, 11200, 10400, 13500],
  orders:  [38, 52, 41, 68, 61, 84, 76, 69, 91, 103, 96, 124],
}

const SalesChart = () => {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const existingChart = Chart.getChart(canvasRef.current)
    if (existingChart) existingChart.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: salesData.labels,
        datasets: [
          {
            label: "Revenue",
            data: salesData.revenue,
            borderColor: "#7c3aed",
            backgroundColor: "rgba(124,58,237,0.08)",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#7c3aed",
            fill: true,
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "Users",
            data: salesData.orders,
            borderColor: "#f59e0b",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#f59e0b",
            fill: false,
            tension: 0.4,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ctx.datasetIndex === 0
                  ? ` $${ctx.parsed.y.toLocaleString()}`
                  : ` ${ctx.parsed.y} users`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.04)" },
            ticks: { color: "#9ca3af", font: { size: 12 }, autoSkip: false },
          },
          y: {
            position: "left",
            grid: { color: "rgba(0,0,0,0.04)" },
            ticks: {
              color: "#9ca3af",
              font: { size: 12 },
              callback: (v) => "$" + (v >= 1000 ? v / 1000 + "k" : v),
            },
          },
          y1: {
            position: "right",
            grid: { drawOnChartArea: false },
            ticks: { color: "#9ca3af", font: { size: 12 } },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [])

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-100 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold text-gray-800">Platform overview</p>
          <p className="text-xs text-gray-400 mt-0.5">Revenue and users — last 12 months</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3 h-0.5 rounded bg-violet-600 inline-block" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3 h-0.5 rounded bg-amber-400 inline-block" />
            Users
          </span>
        </div>
      </div>
      <div style={{ position: "relative", height: "280px", width: "100%" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

const AdminLayout = () => {
  const { currentUser } = useGetCurrentUser()
  const { loading, users, vendors, products } = useGetAdminController()  

  const cards = [
    {
      label: "Total Users",
      value: loading ? "..." : users?.length ?? 0,
      change: "+8.1%",
      trend: "up",
      sub: "vs last month",
      iconBg: "bg-violet-50 text-violet-600",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "Total Vendors",
      value: loading ? "..." : vendors?.length ?? 0,
      change: "+5.2%",
      trend: "up",
      sub: "vs last month",
      iconBg: "bg-amber-50 text-amber-600",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10" />
        </svg>
      ),
    },
    {
      label: "Total Products",
      value: loading ? "..." : products?.length ?? 0,
      change: "+3.7%",
      trend: "up",
      sub: "vs last month",
      iconBg: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12l-2-4z" />
        </svg>
      ),
    },
    {
      label: "Platform Revenue",
      value: "$84,320",
      change: "+12.4%",
      trend: "up",
      sub: "vs last month",
      iconBg: "bg-rose-50 text-rose-500",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
  ]

  return (
    <div className="p-6">

      {/* Welcome bar */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Welcome back, {currentUser?.name || "Admin"}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Here's what's happening on the platform today.</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 ring-1 ring-violet-100">
          Admin
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-white p-5 ring-1 ring-gray-100 shadow-sm"
          >
            <div className={`mb-4 inline-flex rounded-xl p-2.5 ${card.iconBg}`}>
              {card.icon}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {card.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {card.value}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                card.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              }`}>
                {card.trend === "up" ? "▲" : "▼"} {card.change}
              </span>
              <span className="text-xs text-gray-400">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <SalesChart />
      {/* USERS TABLE */}

<div className="mt-6 rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">

  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
    <h2 className="text-sm font-semibold text-gray-800">
      Platform Users
    </h2>
    <span className="text-xs text-gray-400">
      {users?.length ?? 0} users
    </span>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">

      <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
        <tr>
          <th className="text-left px-5 py-3">Name</th>
          <th className="text-left px-5 py-3">Email</th>
          <th className="text-left px-5 py-3">Role</th>
          <th className="text-left px-5 py-3">Status</th>
          <th className="text-left px-5 py-3">Joined</th>
          <th className="text-right px-5 py-3">Action</th>
        </tr>
      </thead>

      <tbody>

        {users?.map((user) => (
          <tr
            key={user._id}
            className="border-t border-gray-100 hover:bg-gray-50 transition"
          >
            <td className="px-5 py-4 font-medium text-gray-800">
              {user.fullName || user.name}
            </td>

            <td className="px-5 py-4 text-gray-500">
              {user.email}
            </td>

            <td className="px-5 py-4">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 capitalize">
                {user.role}
              </span>
            </td>

            <td className="px-5 py-4">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Active
              </span>
            </td>

            <td className="px-5 py-4 text-gray-400">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "--"}
            </td>

            <td className="px-5 py-4 text-right">
              <button className="text-xs text-violet-600 font-semibold hover:underline">
                View
              </button>
            </td>
          </tr>
        ))}

      </tbody>

    </table>
  </div>

</div>
{/* VENDORS TABLE */}

<div className="mt-6 rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm overflow-hidden">

  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
    <h2 className="text-sm font-semibold text-gray-800">
      Vendors
    </h2>
    <span className="text-xs text-gray-400">
      {vendors?.length ?? 0} vendors
    </span>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">

      <thead className="bg-gray-50 text-gray-400 uppercase text-xs">
        <tr>
          <th className="text-left px-5 py-3">Vendor</th>
          <th className="text-left px-5 py-3">Email</th>
          <th className="text-left px-5 py-3">Store</th>
          <th className="text-left px-5 py-3">Status</th>
          <th className="text-left px-5 py-3">Joined</th>
          <th className="text-right px-5 py-3">Action</th>
        </tr>
      </thead>

      <tbody>

        {vendors?.map((vendor) => (
          <tr
            key={vendor._id}
            className="border-t border-gray-100 hover:bg-gray-50 transition"
          >
            <td className="px-5 py-4 font-medium text-gray-800">
              {vendor.fullName || vendor.name}
            </td>

            <td className="px-5 py-4 text-gray-500">
              {vendor.businessEmail}
            </td>

            <td className="px-5 py-4 text-gray-500">
              {vendor.storeName || "--"}
            </td>

            <td className="px-5 py-4">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Active
              </span>
            </td>

            <td className="px-5 py-4 text-gray-400">
              {vendor.createdAt
                ? new Date(vendor.createdAt).toLocaleDateString()
                : "--"}
            </td>

            <td className="px-5 py-4 text-right">
              <button className="text-xs text-violet-600 font-semibold hover:underline">
                View
              </button>
            </td>
          </tr>
        ))}

      </tbody>

    </table>
  </div>

</div>
    </div>
  )
}

export default AdminLayout