// filepath: src/Pages/dashboard/DashboardLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Mobile overlay ───────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(17, 24, 39, 0.35)",
            backdropFilter: "blur(2px)",
            zIndex: 30,
          }}
        />
      )}

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 35,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
        }}
        className="lg:static lg:transform-none lg:translate-x-0 lg:z-auto lg:h-auto"
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Right column: Navbar + page content ──────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />

        <main
          style={{
            flex: 1,
            background: "#f9fafb",
            padding: "28px 28px",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}