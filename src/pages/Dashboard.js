import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import apiRequest from "../api/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [workouts, setWorkouts] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    apiRequest("/workouts").then(setWorkouts).catch(() => setWorkouts([]));
    apiRequest("/enrollments").then(setEnrollments).catch(() => setEnrollments([]));
  }, []);

  const chartData = workouts
    .slice()
    .reverse()
    .map((w) => ({ date: w.date, weight: w.weight }));

  const pendingItems = [
    { text: "Log today's workout", to: "/progress" },
    { text: "Browse classes and book one this week", to: "/classes" },
    { text: "Review your membership plan", to: "/membership" },
    { text: "Complete your profile details", to: "/profile" },
  ];

  const recentActivity = [
    ...workouts.slice(0, 3).map((w) => ({
      icon: "🏋️",
      text: `Logged ${w.exercise} — ${w.sets}×${w.reps} @ ${w.weight}kg`,
      date: w.date,
    })),
    ...enrollments.slice(0, 2).map((e) => ({
      icon: "📅",
      text: `Enrolled in ${e.class_name}`,
      date: e.enrolled_at?.split("T")[0],
    })),
  ].slice(0, 5);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>
        Welcome back{user.name ? `, ${user.name}` : ""} 👋
      </h1>
      <p style={styles.subheading}>Here's a quick look at your Fitness 360 dashboard.</p>

      <div style={styles.cardGrid}>
        <DashboardCard to="/progress" title="Progress" desc="Track your workouts, weight, and personal bests." />
        <DashboardCard to="/classes" title="Classes" desc="Browse and book upcoming gym classes." />
        <DashboardCard to="/membership" title="Membership" desc="View or upgrade your current plan." />
        <DashboardCard to="/profile" title="Profile" desc="Manage your account and personal info." />
      </div>

      <div style={styles.twoCol}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Weight Progress</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a2436", border: "none", borderRadius: 8 }} />
                <Line type="monotone" dataKey="weight" stroke="#B7E400" strokeWidth={2} dot={{ fill: "#B7E400" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={styles.emptyText}>Log a workout to see your progress chart here.</p>
          )}
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Pending</h2>
          <ul style={styles.pendingList}>
            {pendingItems.map((item, i) => (
              <li key={i}>
                <Link to={item.to} style={styles.pendingItem}>
                  <span style={styles.dot} />
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.panel}>
        <h2 style={styles.panelTitle}>Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <ul style={styles.activityList}>
            {recentActivity.map((a, i) => (
              <li key={i} style={styles.activityItem}>
                <span>{a.icon}</span>
                <span style={{ flex: 1 }}>{a.text}</span>
                <span style={styles.activityDate}>{a.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.emptyText}>No activity yet — enroll in a class or log a workout to get started.</p>
        )}
      </div>
    </div>
  );
}

function DashboardCard({ to, title, desc }) {
  return (
    <Link to={to} style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{desc}</p>
    </Link>
  );
}

const styles = {
  page: { padding: "2rem", color: "#fff", fontFamily: "'DM Sans', sans-serif", background: "#101826", minHeight: "100vh" },
  heading: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.8rem", marginBottom: "0.25rem" },
  subheading: { opacity: 0.7, marginBottom: "2rem" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2rem" },
  card: {
    display: "block", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.25)",
    borderRadius: "12px", padding: "1.5rem", textDecoration: "none", color: "#fff", backdropFilter: "blur(6px)",
  },
  cardTitle: { color: "#B7E400", marginBottom: "0.5rem", fontFamily: "'Exo 2', sans-serif" },
  cardDesc: { opacity: 0.7, fontSize: "0.9rem" },
  twoCol: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" },
  panel: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.15)",
    borderRadius: "14px", padding: "1.5rem", marginBottom: "1.25rem",
  },
  panelTitle: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.1rem", marginBottom: "1rem" },
  emptyText: { opacity: 0.6, fontSize: "0.9rem" },
  pendingList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" },
  pendingItem: { display: "flex", alignItems: "center", gap: "0.6rem", color: "#fff", textDecoration: "none", fontSize: "0.9rem" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", background: "#B7E400", display: "inline-block" },
  activityList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" },
  activityItem: { display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" },
  activityDate: { opacity: 0.5, fontSize: "0.8rem" },
};

export default Dashboard;