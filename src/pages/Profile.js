import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../api/api";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [membership, setMembership] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest("/membership").then(setMembership).catch(() => setMembership(null));
    apiRequest("/workouts").then(setWorkouts).catch(() => setWorkouts([]));
  }, []);

  const achievements = [
    { label: "First Workout", earned: workouts.length > 0 },
    { label: "5+ Workouts Logged", earned: workouts.length >= 5 },
    { label: "Active Member", earned: !!membership },
    { label: "Premium/VIP Plan", earned: membership?.plan_type === "Premium" || membership?.plan_type === "VIP" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Profile</h1>

      <div style={styles.grid}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Personal Information</h2>
          <Field label="Full Name" value={user.name} />
          <Field label="Email" value={user.email} />
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Membership Information</h2>
          {membership ? (
            <>
              <Field label="Plan" value={membership.plan_type} />
              <Field label="Status" value={membership.status} />
              <Field label="Renews" value={membership.end_date} />
            </>
          ) : (
            <p style={styles.emptyText}>No active membership.</p>
          )}
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Achievements</h2>
          <div style={styles.badgeGrid}>
            {achievements.map((a, i) => (
              <div key={i} style={a.earned ? styles.badgeEarned : styles.badgeLocked}>
                {a.label}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Workout Summary</h2>
          <Field label="Total Workouts Logged" value={workouts.length} />
          <Field
            label="Last Workout"
            value={workouts[0] ? `${workouts[0].exercise} — ${workouts[0].date}` : "None yet"}
          />
        </div>
      </div>

      <div style={styles.panel}>
        <h2 style={styles.panelTitle}>Account Settings</h2>
        <div style={styles.settingsRow}>
          <button style={styles.settingsBtn} onClick={() => navigate("/reset-password")}>
            Change Password
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <p style={styles.fieldLabel}>{label.toUpperCase()}</p>
      <p style={styles.fieldValue}>{value ?? "—"}</p>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", color: "#fff", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#101826" },
  heading: { fontFamily: "'Exo 2', sans-serif", fontSize: "2rem", marginBottom: "1.5rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" },
  panel: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.15)",
    borderRadius: "14px", padding: "1.5rem",
  },
  panelTitle: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.05rem", marginBottom: "1rem", color: "#B7E400" },
  fieldLabel: { fontSize: "0.7rem", opacity: 0.6, marginBottom: "0.2rem", letterSpacing: "0.05em" },
  fieldValue: { fontSize: "0.95rem" },
  emptyText: { opacity: 0.6, fontSize: "0.9rem" },
  badgeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" },
  badgeEarned: {
    background: "rgba(183,228,0,0.15)", border: "1px solid #B7E400", color: "#B7E400",
    borderRadius: "8px", padding: "0.6rem", fontSize: "0.8rem", textAlign: "center", fontWeight: 600,
  },
  badgeLocked: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)",
    borderRadius: "8px", padding: "0.6rem", fontSize: "0.8rem", textAlign: "center",
  },
  settingsRow: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  settingsBtn: {
    padding: "0.7rem 1.25rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent", color: "#fff", cursor: "pointer", fontWeight: 600,
  },
  logoutBtn: {
    padding: "0.7rem 1.25rem", borderRadius: "10px", border: "1px solid #ff6b6b",
    background: "transparent", color: "#ff6b6b", cursor: "pointer", fontWeight: 600,
  },
};

export default Profile;