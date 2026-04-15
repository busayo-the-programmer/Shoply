import { useEffect, useRef } from "react"
import { useGetVendorStats } from "../hooks/useGetVendorStats"
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

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
)
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  revenue: [4200, 5800, 4100, 7200, 6800, 9100, 8300, 7600, 9800, 11200, 10400, 13500],
  orders:  [38,   52,   41,   68,   61,   84,   76,   69,   91,   103,   96,   124],
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
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79,70,229,0.08)",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#4f46e5",
            fill: true,
            tension: 0.4,
            yAxisID: "y",
          },
          {
            label: "Orders",
            data: salesData.orders,
            borderColor: "#10b981",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#10b981",
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
                  : ` ${ctx.parsed.y} orders`,
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

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold text-gray-800">Sales overview</p>
          <p className="text-xs text-gray-400 mt-0.5">Revenue and orders — last 12 months</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3 h-0.5 rounded bg-indigo-600 inline-block" />
            Revenue
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-3 h-0.5 rounded bg-emerald-500 inline-block" />
            Orders
          </span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: "relative", height: "280px", width: "100%" }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

const VendorAnalyticsCards = () => {
  const { productLenght, loading , totalWorth} = useGetVendorStats()

  const cards = [
    {
      label: "Total Capital",
      value: `$ ${totalWorth  }`,
      change: "+12.4%",
      trend: "up",
      sub: "vs last month",
      iconBg: "bg-indigo-50 text-indigo-600",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
    {
      label: "Total Orders",
      value: "318",
      change: "+8.1%",
      trend: "up",
      sub: "vs last month",
      iconBg: "bg-emerald-50 text-emerald-600",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h13" />
        </svg>
      ),
    },
    {
      label: "New Customers",
      value: "74",
      change: "-3.2%",
      trend: "down",
      sub: "vs last month",
      iconBg: "bg-amber-50 text-amber-600",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "Available Stock",
      value: loading ? "..." : productLenght,
      change: "+5.7%",
      trend: "up",
      sub: "vs last month",
      iconBg: "bg-rose-50 text-rose-500",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  return (
    <div>
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
    </div>
  )
}

export default VendorAnalyticsCards