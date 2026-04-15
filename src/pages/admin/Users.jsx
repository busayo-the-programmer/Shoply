import React, { useState } from "react";
import { useGetAllUsers } from "./hooks/usegetUsers";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "—";

const statusConfig = {
  active:   { label: "Active",   color: "#059669", bg: "#d1fae5" },
  inactive: { label: "Inactive", color: "#6b7280", bg: "#f3f4f6" },
  banned:   { label: "Banned",   color: "#dc2626", bg: "#fee2e2" },
  pending:  { label: "Pending",  color: "#d97706", bg: "#fef3c7" },
};

const roleConfig = {
  admin:    { label: "Admin",    color: "#4f46e5", bg: "#ede9fe" },
  vendor:   { label: "Vendor",   color: "#0369a1", bg: "#e0f2fe" },
  customer: { label: "Customer", color: "#6b7280", bg: "#f3f4f6" },
};

const StatCard = ({ icon, label, value, change, accent }) => (
  <div className={`u-stat-card${accent ? " accent" : ""}`}>
    <div className="u-stat-icon">{icon}</div>
    <div className="u-stat-body">
      <span className="u-stat-value">{value}</span>
      <span className="u-stat-label">{label}</span>
    </div>
    {change != null && (
      <span className={`u-stat-change ${change >= 0 ? "pos" : "neg"}`}>
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
      </span>
    )}
  </div>
);

const Avatar = ({ user }) => {
  const initials = user.name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() ?? "??";
  const hue = (user.name?.charCodeAt(0) ?? 0) * 47 % 360;
  return (
    <div className="u-avatar" style={user.avatar ? {} : { background: `hsl(${hue},55%,88%)`, color: `hsl(${hue},55%,35%)` }}>
      {user.avatar ? <img src={user.avatar} alt={user.name} /> : <span>{initials}</span>}
    </div>
  );
};

const SkeletonRow = () => (
  <tr className="u-table-row">
    <td><div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
      <div className="skeleton" style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
        <div className="skeleton" style={{ width: 110, height: 12 }} />
        <div className="skeleton" style={{ width: 85, height: 10 }} />
      </div>
    </div></td>
    <td><div className="skeleton" style={{ width: 66, height: 22, borderRadius: 6 }} /></td>
    <td><div className="skeleton" style={{ width: 66, height: 22, borderRadius: 6 }} /></td>
    <td><div className="skeleton" style={{ width: 76, height: 12 }} /></td>
    <td><div style={{ display: "flex", gap: ".35rem" }}>
      {[1,2,3].map(i => <div key={i} className="skeleton" style={{ width: 28, height: 28, borderRadius: 7 }} />)}
    </div></td>
  </tr>
);

const Users = () => {
  const { users, loading, error } = useGetAllUsers();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalUsers   = users?.length ?? 0;
  const activeUsers  = users?.filter((u) => u.status === "active").length ?? 0;
  const newThisMonth = users?.filter((u) => {
    if (!u.createdAt) return false;
    const d = new Date(u.createdAt), now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length ?? 0;
  const bannedUsers  = users?.filter((u) => u.status === "banned").length ?? 0;

  const filtered = (users ?? []).filter((u) => {
    const matchSearch = !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter   === "all" || u.role   === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="u-root">

        {/* Page header */}
        <div className="u-page-header">
          <div>
            <h1 className="u-page-title">Users</h1>
            <p className="u-page-sub">Manage and monitor all registered users</p>
          </div>
          <button className="u-export-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* Stat cards */}
        <div className="u-stats-grid">
          <StatCard
            accent
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>}
            label="Total Users" value={loading ? "—" : totalUsers.toLocaleString()} change={12}
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>}
            label="Active Users" value={loading ? "—" : activeUsers.toLocaleString()} change={8}
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>}
            label="New This Month" value={loading ? "—" : newThisMonth.toLocaleString()} change={5}
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>}
            label="Banned" value={loading ? "—" : bannedUsers.toLocaleString()} change={bannedUsers > 0 ? -2 : null}
          />
        </div>

        {/* Table card */}
        <div className="u-table-card">
          <div className="u-toolbar">
            <div className="u-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                className="u-search-input"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="u-filter-row">
              <select className="u-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="all">All roles</option>
                <option value="admin">Admin</option>
                <option value="vendor">Vendor</option>
                <option value="customer">Customer</option>
              </select>
              <select className="u-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>

          <div className="u-table-wrap">
            {error ? (
              <div className="u-state-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p>Failed to load users</p>
                <button className="u-retry-btn" onClick={() => window.location.reload()}>Retry</button>
              </div>
            ) : (
              <table className="u-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                    : filtered.length === 0
                    ? (
                      <tr><td colSpan={5}>
                        <div className="u-state-box">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                          </svg>
                          <p>{search || roleFilter !== "all" || statusFilter !== "all" ? "No users match your filters" : "No users yet"}</p>
                        </div>
                      </td></tr>
                    )
                    : filtered.map((user) => {
                        const role   = roleConfig[user.role]    ?? roleConfig.customer;
                        const status = statusConfig[user.status] ?? statusConfig.inactive;
                        return (
                          <tr key={user._id} className="u-table-row">
                            <td>
                              <div className="u-user-cell">
                                <Avatar user={user} />
                                <div className="u-user-info">
                                  <span className="u-user-name">{user.name}</span>
                                  <span className="u-user-email">{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="u-badge" style={{ color: role.color, background: role.bg }}>{role.label}</span>
                            </td>
                            <td>
                              <span className="u-badge" style={{ color: status.color, background: status.bg }}>
                                <span className="u-badge-dot" style={{ background: status.color }} />
                                {status.label}
                              </span>
                            </td>
                            <td><span className="u-date">{fmtDate(user.createdAt)}</span></td>
                            <td>
                              <div className="u-actions-cell">
                                <button className="u-action-btn" title="View">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                  </svg>
                                </button>
                                <button className="u-action-btn" title="Edit">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                </button>
                                <button className="u-action-btn danger" title="Ban">
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </table>
            )}
          </div>

          {!loading && !error && filtered.length > 0 && (
            <div className="u-table-footer">
              Showing <strong>{filtered.length}</strong> of <strong>{totalUsers}</strong> users
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  :root{--bg:#f5f6fa;--surface:#ffffff;--surface-2:#f0f1f8;--border:#e4e6f0;--border-2:#c7d2fe;--indigo:#4f46e5;--indigo-light:#ede9fe;--indigo-mid:#c7d2fe;--indigo-dark:#3730a3;--text-1:#1a1b2e;--text-2:#4b5068;--text-3:#9396b0;--red:#ef4444;--green:#059669}
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  .u-root{min-height:100vh;background:var(--bg);font-family:'DM Sans',sans-serif;color:var(--text-1);padding:2.5rem 2rem 6rem;max-width:1280px;margin:0 auto}

  .u-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:2rem}
  .u-page-title{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.6rem,4vw,2.2rem);letter-spacing:-.03em;color:var(--text-1);line-height:1.1}
  .u-page-sub{font-size:.87rem;color:var(--text-2);margin-top:.3rem}
  .u-export-btn{display:inline-flex;align-items:center;gap:.45rem;background:var(--surface);color:var(--text-2);border:1.5px solid var(--border-2);font-family:'DM Sans',sans-serif;font-weight:500;font-size:.85rem;padding:.58rem 1.1rem;border-radius:9px;cursor:pointer;transition:all .2s}
  .u-export-btn:hover{color:var(--indigo);border-color:var(--indigo);background:var(--indigo-light)}
  .u-export-btn svg{width:15px;height:15px}

  .u-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.75rem}
  @media(max-width:900px){.u-stats-grid{grid-template-columns:repeat(2,1fr)}}

  .u-stat-card{position:relative;display:flex;align-items:center;gap:1rem;background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:1.1rem 1.25rem;overflow:hidden;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.04)}
  .u-stat-card:hover{border-color:var(--border-2);box-shadow:0 4px 12px rgba(79,70,229,.08)}
  .u-stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:transparent}
  .u-stat-card.accent{border-color:var(--indigo-mid);background:linear-gradient(135deg,#fff 60%,var(--indigo-light))}
  .u-stat-card.accent::before{background:linear-gradient(90deg,var(--indigo),#818cf8)}
  .u-stat-icon{width:40px;height:40px;border-radius:10px;background:var(--surface-2);display:flex;align-items:center;justify-content:center;color:var(--text-3);flex-shrink:0}
  .u-stat-card.accent .u-stat-icon{background:var(--indigo-light);color:var(--indigo)}
  .u-stat-icon svg{width:17px;height:17px}
  .u-stat-body{display:flex;flex-direction:column;gap:.15rem;flex:1}
  .u-stat-value{font-family:'Syne',sans-serif;font-weight:800;font-size:1.5rem;color:var(--text-1);line-height:1}
  .u-stat-card.accent .u-stat-value{color:var(--indigo)}
  .u-stat-label{font-size:.74rem;color:var(--text-3)}
  .u-stat-change{font-size:.71rem;font-weight:600;padding:.18rem .42rem;border-radius:5px;white-space:nowrap;align-self:flex-start}
  .u-stat-change.pos{color:var(--green);background:#d1fae5}
  .u-stat-change.neg{color:var(--red);background:#fee2e2}

  .u-table-card{background:var(--surface);border:1.5px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)}

  .u-toolbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;padding:1.1rem 1.25rem;border-bottom:1px solid var(--border);background:var(--surface)}
  .u-search-wrap{display:flex;align-items:center;gap:.55rem;background:var(--surface-2);border:1.5px solid var(--border);border-radius:9px;padding:.48rem .85rem;flex:1;max-width:320px;transition:border-color .2s,box-shadow .2s}
  .u-search-wrap:focus-within{border-color:var(--indigo);box-shadow:0 0 0 3px rgba(79,70,229,.1)}
  .u-search-wrap svg{width:15px;height:15px;color:var(--text-3);flex-shrink:0}
  .u-search-input{background:transparent;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:.87rem;color:var(--text-1);width:100%}
  .u-search-input::placeholder{color:var(--text-3)}
  .u-filter-row{display:flex;gap:.55rem;flex-wrap:wrap}
  .u-select{background:var(--surface);border:1.5px solid var(--border);color:var(--text-2);font-family:'DM Sans',sans-serif;font-size:.83rem;padding:.46rem .8rem;border-radius:8px;cursor:pointer;outline:none;transition:border-color .2s}
  .u-select:focus{border-color:var(--indigo);color:var(--text-1)}

  .u-table-wrap{overflow-x:auto}
  .u-table{width:100%;border-collapse:collapse}
  .u-table thead tr{border-bottom:1px solid var(--border);background:var(--surface-2)}
  .u-table th{text-align:left;font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--text-3);padding:.8rem 1.25rem;white-space:nowrap}
  .u-table-row{border-bottom:1px solid var(--border);transition:background .15s}
  .u-table-row:last-child{border-bottom:none}
  .u-table-row:hover{background:#fafbff}
  .u-table td{padding:.82rem 1.25rem;vertical-align:middle}

  .u-user-cell{display:flex;align-items:center;gap:.75rem}
  .u-avatar{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;font-size:.78rem;flex-shrink:0;overflow:hidden}
  .u-avatar img{width:100%;height:100%;object-fit:cover}
  .u-user-info{display:flex;flex-direction:column;gap:.12rem}
  .u-user-name{font-size:.87rem;font-weight:500;color:var(--text-1);white-space:nowrap}
  .u-user-email{font-size:.76rem;color:var(--text-3);white-space:nowrap}

  .u-badge{display:inline-flex;align-items:center;gap:.32rem;font-size:.73rem;font-weight:600;padding:.26rem .6rem;border-radius:6px;white-space:nowrap}
  .u-badge-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}

  .u-date{font-size:.82rem;color:var(--text-2);white-space:nowrap}

  .u-actions-cell{display:flex;align-items:center;gap:.3rem}
  .u-action-btn{width:28px;height:28px;border-radius:7px;border:1px solid var(--border);background:transparent;color:var(--text-3);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s}
  .u-action-btn:hover{background:var(--surface-2);color:var(--indigo);border-color:var(--indigo-mid)}
  .u-action-btn.danger:hover{background:#fee2e2;color:var(--red);border-color:#fca5a5}
  .u-action-btn svg{width:12px;height:12px}

  .u-state-box{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;padding:4rem 2rem;color:var(--text-3);text-align:center}
  .u-state-box svg{width:38px;height:38px}
  .u-state-box p{font-size:.87rem}
  .u-retry-btn{background:var(--indigo);color:#fff;border:none;font-family:'DM Sans',sans-serif;font-weight:600;font-size:.83rem;padding:.5rem 1.2rem;border-radius:8px;cursor:pointer;transition:background .2s}
  .u-retry-btn:hover{background:var(--indigo-dark)}

  .u-table-footer{padding:.82rem 1.25rem;border-top:1px solid var(--border);font-size:.81rem;color:var(--text-3);background:var(--surface-2)}
  .u-table-footer strong{color:var(--text-2)}

  .skeleton{background:linear-gradient(90deg,#f0f1f8 25%,#e4e6f0 50%,#f0f1f8 75%);background-size:200% 100%;animation:shimmer 1.6s infinite;border-radius:6px}
  @keyframes shimmer{to{background-position:-200% 0}}

  @media(max-width:640px){.u-root{padding:1.5rem 1rem 4rem}.u-toolbar{flex-direction:column;align-items:stretch}.u-search-wrap{max-width:100%}.u-filter-row{width:100%}.u-select{flex:1}}
`;

export default Users;