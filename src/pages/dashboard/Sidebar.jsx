import { NavLink, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../landing page/useGetCurrentUser";

export const ICON_PATHS = {
  overview:   "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  orders:     "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2",
  wishlist:   "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  profile:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  settings:   "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  products:   "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  store:      "M3 3h18v4H3z M3 7v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7 M9 11h6",
  payouts:    "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  analytics:  "M18 20V10 M12 20V4 M6 20v-6",
  vendors:    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 1-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  users:      "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 1-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  categories: "M4 6h16 M4 12h16 M4 18h7",
  commission: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  disputes:   "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  logout:     "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
};

export function Icon({ name, size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const sidebarItems = [
  { name: "Dashboard", icon: "overview", link: "/dashboard", end: true },
  { name: "My Orders", icon: "orders",   link: "/products/orders",  end: false },
  { name: "Wishlists", icon: "wishlist", link: "/products/wishlist", end: false },
];

const accountItems = [
  { name: "Profile",  icon: "profile",  link: "/dashboard/profile",  end: true },
  { name: "Settings", icon: "settings", link: "/settings", end: true },
];

const vendor = [
  { name: "Products",  icon: "products",  link: "/products",  end: false },
  { name: "My Store",  icon: "store",     link: "/dashboard/vendor/store",     end: true  },
  { name: "Payouts",   icon: "payouts",   link: "/payouts",   end: true  },
  { name: "Analytics", icon: "analytics", link: "/analytics", end: true  },
];

const admin = [
  { name: "Vendors",      icon: "vendors",  link: "/dashboard/admin/vendors",        end: false },
  { name: "Users",        icon: "users",    link: "/dashboard/admin/users",          end: false },
  { name: "All Products", icon: "products", link: "/dashboard/admin/products", end: false },
];

/* ── Nav link ────────────────────────────────────────────────────────────── */
function SidebarNavLink({ item }) {
  return (
    <NavLink
      to={item.link}
      end={item.end}               // prevents /dashboard matching /dashboard/orders
      className="vendora-nav-link"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        borderRadius: 10,
        fontSize: 13.5,
        fontWeight: 500,
        color: "#6b7280",
        textDecoration: "none",
        transition: "background 0.14s, color 0.14s, border-color 0.14s",
        border: "1px solid transparent",
        letterSpacing: "0.01em",
      }}
    >
      <Icon name={item.icon} size={16} />
      {item.name}
    </NavLink>
  );
}

/* ── Section label ───────────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#9ca3af",
        padding: "16px 12px 4px",
      }}
    >
      {children}
    </p>
  );
}

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
export function Sidebar() {
  const { currentUser, setCurrentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  const roleItems = currentUser?.role === "admin" ? admin : vendor;
  const roleLabel = currentUser?.role === "admin" ? "Admin" : "Vendor";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/auth/signin");
  };

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .vendora-sidebar { font-family: 'DM Sans', sans-serif; }

        /* Active — React Router's NavLink sets .active on the matched route */
        .vendora-nav-link.active {
          background: #4f46e5 !important;
          color: #ffffff !important;
          border-color: #4338ca !important;
          box-shadow: 0 2px 10px rgba(79, 70, 229, 0.28);
        }

        .vendora-nav-link.active svg {
          stroke: #ffffff !important;
        }

        /* Hover — only applies when NOT active */
        .vendora-nav-link:not(.active):hover {
          background: #eef2ff !important;
          color: #4f46e5 !important;
          border-color: #e0e7ff !important;
        }

        /* Logout hover */
        .vendora-logout:hover {
          background: #fef2f2 !important;
          color: #ef4444 !important;
          border-color: #fee2e2 !important;
        }

        @keyframes vendora-in {
          from { opacity: 0; transform: translateX(-5px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .vendora-section { animation: vendora-in 0.22s ease both; }
      `}</style>

      <aside
        className="vendora-sidebar"
        style={{
          width: 240,
          minHeight: "100vh",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid #e5e7eb",
          boxShadow: "2px 0 20px rgba(79, 70, 229, 0.07)",
          position: "relative",
        }}
      >
        {/* Indigo top accent stripe */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: 3,
            background: "#4f46e5",
            borderRadius: "0",
          }}
        />

        <div style={{ padding: "0 10px", flex: 1, overflowY: "auto" }}>

          {/* ── Brand ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "20px 8px 18px",
              borderBottom: "1px solid #f3f4f6",
              marginBottom: 4,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 17,
                color: "#fff",
                flexShrink: 0,
                boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
                letterSpacing: "-0.02em",
              }}
            >
              V
            </div>
            <div>
              <p
                style={{
                  color: "#111827",
                  fontWeight: 700,
                  fontSize: 15,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Vendora
              </p>
              <p
                style={{
                  color: "#9ca3af",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                Seller Portal
              </p>
            </div>
          </div>

          {/* ── General ────────────────────────────────────────────────── */}
          <div className="vendora-section" style={{ animationDelay: "0.04s" }}>
            <SectionLabel>General</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {sidebarItems.map((item) => (
                <SidebarNavLink key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* ── Role section ───────────────────────────────────────────── */}
          {currentUser && (
            <div className="vendora-section" style={{ animationDelay: "0.09s" }}>
              <SectionLabel>{roleLabel}</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {roleItems.map((item) => (
                  <SidebarNavLink key={item.name} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* ── Account ────────────────────────────────────────────────── */}
          <div className="vendora-section" style={{ animationDelay: "0.14s" }}>
            <SectionLabel>Account</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {accountItems.map((item) => (
                <SidebarNavLink key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div style={{ padding: "12px 14px 16px", borderTop: "1px solid #f3f4f6" }}>

          {/* User chip */}
          {currentUser && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: "#f5f3ff",
                border: "1px solid #e0e7ff",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)",
                }}
              >
                {initials}
              </div>

              <div style={{ overflow: "hidden", flex: 1 }}>
                <p
                  style={{
                    color: "#111827",
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.2,
                  }}
                >
                  {currentUser.name}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#4f46e5",
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    borderRadius: 4,
                    padding: "1px 6px",
                    marginTop: 3,
                  }}
                >
                  {currentUser.role}
                </span>
              </div>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="vendora-logout"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "9px 14px",
              borderRadius: 10,
              border: "1px solid #fee2e2",
              background: "#fff5f5",
              color: "#f87171",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.14s, color 0.14s, border-color 0.14s",
              fontFamily: "inherit",
              letterSpacing: "0.01em",
            }}
          >
            <Icon name="logout" size={15} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}