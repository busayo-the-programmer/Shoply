import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../landing page/useGetCurrentUser";
import { Icon, ICON_PATHS } from "./Sidebar";

/* ── Bell icon (not in shared ICON_PATHS) ───────────────────────────────── */
const EXTRA_ICONS = {
  bell:    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  search:  "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  chevron: "M6 9l6 6 6-6",
  x:       "M18 6 6 18 M6 6l12 12",
  menu:    "M4 6h16 M4 12h16 M4 18h16",
};

function NavIcon({ name, size = 18 }) {
  const d = EXTRA_ICONS[name] ?? ICON_PATHS[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
} 

  /* ── Mock notifications ─────────────────────────────────────────────────── */
  const NOTIFICATIONS = [
    { id: 1, text: "New order #4821 received",        time: "2m ago",  unread: true  },
    { id: 2, text: "Payout of ₦42,000 processed",     time: "1h ago",  unread: true  },
    { id: 3, text: "Your product was approved",        time: "3h ago",  unread: false },
    { id: 4, text: "Kemi left a 5-star review",        time: "Yesterday", unread: false },
  ];

/* ── useClickOutside ────────────────────────────────────────────────────── */
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler(); };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

/* ── Navbar ─────────────────────────────────────────────────────────────── */
export function Navbar({ onMenuToggle }) {
  const { currentUser, setCurrentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchVal,   setSearchVal]   = useState("");

  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const searchRef  = useRef(null);

  useClickOutside(notifRef,   () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));
  useClickOutside(searchRef,  () => { setSearchOpen(false); setSearchVal(""); });

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "??";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/auth/login");
  };

  const profileLinks =
    currentUser?.role === "admin"
      ? [
          { label: "Admin Panel",  icon: "vendors",  link: "/vendors"  },
          { label: "Profile",      icon: "profile",  link: "/profile"  },
          { label: "Settings",     icon: "settings", link: "/settings" },
        ]
      : currentUser?.role === "vendor"
      ? [
          { label: "My Store",  icon: "store",    link: "/dashboard/vendor/store"    },
          { label: "Profile",   icon: "profile",  link: "/dashboard/profile"  },
          { label: "Settings",  icon: "settings", link: "/dashboard/settings" },
        ]
      : [
          { label: "My Orders", icon: "orders",   link: "/dashboard/orders"   },
          { label: "Wishlist",  icon: "wishlist",  link: "/dashboard/wishlist" },
          { label: "Profile",   icon: "profile",   link: "/dashboard/profile"            },
          { label: "Settings",  icon: "settings",  link: "/settings"           },
        ];

  /* role badge colours — indigo scale only */
  const roleBadge = {
    admin:  { bg: "#312e81", color: "#e0e7ff" },  /* indigo-900 / indigo-100 */
    vendor: { bg: "#4f46e5", color: "#ffffff" },   /* indigo-600 / white      */
    buyer:  { bg: "#eef2ff", color: "#4f46e5" },   /* indigo-50  / indigo-600 */
  }[currentUser?.role] ?? { bg: "#eef2ff", color: "#4f46e5" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .vendora-navbar * { box-sizing: border-box; }

        .vn-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid #e5e7eb; background: #fff;
          color: #6b7280; cursor: pointer;
          transition: background 0.13s, color 0.13s, border-color 0.13s;
        }
        .vn-icon-btn:hover { background: #eef2ff; color: #4f46e5; border-color: #c7d2fe; }

        .vn-search-input {
          border: none; outline: none; background: transparent;
          font-family: inherit; font-size: 13.5px; color: #111827;
          width: 100%;
        }
        .vn-search-input::placeholder { color: #9ca3af; }

        .vn-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: #fff; border: 1px solid #e5e7eb;
          border-radius: 14px; box-shadow: 0 12px 40px rgba(79,70,229,0.12);
          z-index: 50; overflow: hidden;
          animation: vn-pop 0.16s ease both;
        }
        @keyframes vn-pop {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        .vn-profile-link {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 16px; font-size: 13.5px; font-weight: 500;
          color: #374151; text-decoration: none;
          transition: background 0.12s, color 0.12s;
        }
        .vn-profile-link:hover { background: #eef2ff; color: #4f46e5; }
        .vn-profile-link:hover svg { stroke: #4f46e5; }

        .vn-notif-item { transition: background 0.12s; }
        .vn-notif-item:hover { background: #f5f3ff; }
      `}</style>

      <header
        className="vendora-navbar"
        style={{
          height: 60,
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          position: "sticky",
          top: 0,
          zIndex: 40,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 1px 0 #e5e7eb, 0 4px 16px rgba(79,70,229,0.05)",
        }}
      >
        {/* ── Left: hamburger (mobile) + breadcrumb ───────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Mobile menu toggle */}
          {onMenuToggle && (
            <button className="vn-icon-btn" onClick={onMenuToggle} aria-label="Toggle menu"
              style={{ display: "flex" }}>
              <NavIcon name="menu" size={17} />
            </button>
          )}

          {/* Brand wordmark (visible when sidebar is hidden on mobile) */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div className="w-28">
           <img src="/vendora-logo.png" alt="" />
            </div>
          </Link>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "#e5e7eb" }} />

          {/* Page label — swap for real breadcrumb if needed */}
          <span style={{ fontSize: 13, fontWeight: 500, color: "#9ca3af" }}>
            Dashboard
          </span>
        </div>

        {/* ── Right: search, bell, avatar ─────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          {/* Search */}
          <div ref={searchRef} style={{ position: "relative" }}>
            {searchOpen ? (
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "0 12px", height: 36, borderRadius: 9,
                border: "1px solid #c7d2fe", background: "#f5f3ff",
                width: 220, transition: "width 0.2s",
              }}>
                <NavIcon name="search" size={15} />
                <input
                  autoFocus
                  className="vn-search-input"
                  placeholder="Search…"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <button onClick={() => { setSearchOpen(false); setSearchVal(""); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex" }}>
                  <NavIcon name="x" size={14} />
                </button>
              </div>
            ) : (
              <button className="vn-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
                <NavIcon name="search" size={17} />
              </button>
            )}
          </div>

          {/* Notifications */}
          <div ref={notifRef} style={{ position: "relative" }}>
            <button className="vn-icon-btn" onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
              aria-label="Notifications" style={{ position: "relative" }}>
              <NavIcon name="bell" size={17} />
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute", top: 6, right: 6,
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#4f46e5", border: "1.5px solid #fff",
                }} />
              )}
            </button>

            {notifOpen && (
              <div className="vn-dropdown" style={{ width: 300 }}>
                {/* Header */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px 10px", borderBottom: "1px solid #f3f4f6",
                }}>
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: "#111827" }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                      background: "#eef2ff", color: "#4f46e5",
                      border: "1px solid #c7d2fe", borderRadius: 20, padding: "2px 8px",
                    }}>
                      {unreadCount} NEW
                    </span>
                  )}
                </div>

                {/* Items */}
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="vn-notif-item" style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "11px 16px", cursor: "pointer",
                    borderBottom: "1px solid #f9fafb",
                  }}>
                    {/* Unread dot */}
                    <div style={{
                      width: 7, height: 7, borderRadius: "50", flexShrink: 0,
                      marginTop: 5,
                      background: n.unread ? "#4f46e5" : "transparent",
                      border: n.unread ? "none" : "1.5px solid #d1d5db",
                    }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: n.unread ? 600 : 400, color: "#111827", lineHeight: 1.4 }}>
                        {n.text}
                      </p>
                      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{n.time}</p>
                    </div>
                  </div>
                ))}

                {/* Footer */}
                <div style={{ padding: "10px 16px", textAlign: "center" }}>
                  <Link to="/notifications" style={{
                    fontSize: 12, fontWeight: 600, color: "#4f46e5", textDecoration: "none",
                  }}
                    onClick={() => setNotifOpen(false)}>
                    View all notifications →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: "#e5e7eb" }} />

          {/* Profile dropdown */}
          <div ref={profileRef} style={{ position: "relative" }}>
            <button
              onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "4px 8px 4px 4px", borderRadius: 10,
                border: "1px solid #e5e7eb", background: "#fff",
                cursor: "pointer", transition: "border-color 0.13s, background 0.13s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.borderColor = "#c7d2fe"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff";    e.currentTarget.style.borderColor = "#e5e7eb"; }}
            >
              {/* Avatar */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "#4f46e5", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0,
                boxShadow: "0 2px 6px rgba(79,70,229,0.3)",
              }}>
                {initials}
              </div>

              {/* Name + role */}
              <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>
                  {currentUser?.firstName?.split(" ")[0] ?? "Account"}
                </p>
                <span style={{
                  display: "inline-block", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.09em", textTransform: "uppercase",
                  background: roleBadge.bg, color: roleBadge.color,
                  borderRadius: 3, padding: "1px 5px",
                }}>
                  {currentUser?.role ?? "guest"}
                </span>
              </div>

              <NavIcon name="chevron" size={13} />
            </button>

            {profileOpen && (
              <div className="vn-dropdown" style={{ width: 210 }}>
                {/* User summary */}
                <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>
                    {currentUser?.name}
                  </p>
                  <p style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>
                    {currentUser?.email}
                  </p>
                </div>

                {/* Role-gated links */}
                <div style={{ padding: "6px 0" }}>
                  {profileLinks.map((item) => (
                    <Link key={item.label} to={item.link} className="vn-profile-link"
                      onClick={() => setProfileOpen(false)}>
                      <Icon name={item.icon} size={15} />
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Logout */}
                <div style={{ borderTop: "1px solid #f3f4f6", padding: "6px 0 8px" }}>
                  <button onClick={handleLogout} className="vn-profile-link"
                    style={{
                      width: "100%", border: "none", background: "none",
                      cursor: "pointer", fontFamily: "inherit", color: "#ef4444",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    <Icon name="logout" size={15} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}