import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1 style={{ fontFamily: "'Exo 2', sans-serif", marginBottom: "0.5rem" }}>
        Welcome back{user.name ? `, ${user.name}` : ""} 👋
      </h1>
      <p style={{ opacity: 0.7, marginBottom: "2rem" }}>
        Here's a quick look at your Fitness 360 dashboard.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}
      >
        <DashboardCard to="/progress" title="Progress" desc="Track your workouts, weight, and personal bests." />
        <DashboardCard to="/classes" title="Classes" desc="Browse and book upcoming gym classes." />
        <DashboardCard to="/membership" title="Membership" desc="View or upgrade your current plan." />
        <DashboardCard to="/profile" title="Profile" desc="Manage your account and personal info." />
      </div>
    </div>
  );
}

function DashboardCard({ to, title, desc }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(183,228,0,0.25)",
        borderRadius: "12px",
        padding: "1.5rem",
        textDecoration: "none",
        color: "#fff",
        backdropFilter: "blur(6px)",
        transition: "border-color 0.2s ease",
      }}
    >
      <h3 style={{ color: "#B7E400", marginBottom: "0.5rem" }}>{title}</h3>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>{desc}</p>
    </Link>
  );
}

export default Dashboard;