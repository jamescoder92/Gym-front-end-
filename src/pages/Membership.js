import { useState, useEffect } from "react";
import apiRequest from "../api/api";

const PLANS = [
  { key: "Basic", price: 29, features: ["10 classes/month", "Basic progress tracking", "Mobile app access", "Community forum"] },
  { key: "Premium", price: 59, features: ["Unlimited classes", "Advanced analytics", "Personal trainer (2x/mo)", "Priority booking"] },
  { key: "VIP", price: 99, features: ["Unlimited classes", "Full analytics suite", "Dedicated trainer", "Priority access"] },
];

function Membership() {
  const [membership, setMembership] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/membership")
      .then(setMembership)
      .catch(() => setError("No membership found"));
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Membership</h1>
      <p style={styles.subheading}>No contracts. Cancel anytime.</p>

      {membership && (
        <div style={styles.currentBanner}>
          <span>Current Plan: <strong style={{ color: "#B7E400" }}>{membership.plan_type}</strong></span>
          <span style={styles.status}>{membership.status}</span>
        </div>
      )}
      {error && !membership && <p style={styles.error}>{error}</p>}

      <div style={styles.grid}>
        {PLANS.map((plan) => {
          const isCurrent = membership?.plan_type === plan.key;
          return (
            <div key={plan.key} style={isCurrent ? styles.cardActive : styles.card}>
              {isCurrent && <span style={styles.currentTag}>YOUR CURRENT PLAN</span>}
              <h3 style={styles.planName}>{plan.key.toUpperCase()}</h3>
              <p style={styles.price}>
                ${plan.price}
                <span style={styles.perMonth}>/mo</span>
              </p>
              <ul style={styles.featureList}>
                {plan.features.map((f, i) => (
                  <li key={i} style={styles.feature}>✓ {f}</li>
                ))}
              </ul>
              <button style={isCurrent ? styles.buttonCurrent : styles.button} disabled={isCurrent}>
                {isCurrent ? "Current Plan" : `Upgrade to ${plan.key}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", color: "#fff", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#101826" },
  heading: { fontFamily: "'Exo 2', sans-serif", fontSize: "2rem", marginBottom: "0.25rem" },
  subheading: { opacity: 0.7, marginBottom: "1.5rem" },
  currentBanner: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(183,228,0,0.1)", border: "1px solid rgba(183,228,0,0.3)",
    borderRadius: "12px", padding: "1rem 1.5rem", marginBottom: "2rem",
  },
  status: { color: "#B7E400", fontSize: "0.85rem", textTransform: "uppercase" },
  error: { color: "#ff6b6b", marginBottom: "1.5rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" },
  card: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px", padding: "1.75rem", position: "relative",
  },
  cardActive: {
    background: "rgba(183,228,0,0.08)", border: "2px solid #B7E400",
    borderRadius: "16px", padding: "1.75rem", position: "relative",
  },
  currentTag: {
    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
    background: "#B7E400", color: "#101826", fontSize: "0.7rem", fontWeight: 700,
    padding: "0.25rem 0.75rem", borderRadius: "999px",
  },
  planName: { fontFamily: "'Exo 2', sans-serif", color: "#B7E400", fontSize: "1rem", marginBottom: "0.5rem" },
  price: { fontFamily: "'Exo 2', sans-serif", fontSize: "2.2rem", fontWeight: 800, marginBottom: "1.25rem" },
  perMonth: { fontSize: "1rem", opacity: 0.6, fontWeight: 400 },
  featureList: { listStyle: "none", padding: 0, marginBottom: "1.5rem" },
  feature: { fontSize: "0.85rem", opacity: 0.85, marginBottom: "0.6rem" },
  button: {
    width: "100%", padding: "0.8rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent", color: "#fff", fontWeight: 700, cursor: "pointer",
  },
  buttonCurrent: {
    width: "100%", padding: "0.8rem", borderRadius: "10px", border: "none",
    background: "#B7E400", color: "#101826", fontWeight: 700, cursor: "default",
  },
};

export default Membership;