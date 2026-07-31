import { useState, useEffect } from "react";
import apiRequest from "../api/api";

const CATEGORY_KEYWORDS = {
  HIIT: ["hiit"],
  Yoga: ["yoga", "pilates", "flow"],
  Boxing: ["boxing", "cardio"],
  Strength: ["strength", "conditioning", "lift"],
};

function getCategory(className) {
  const lower = className.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) return category;
  }
  return "Other";
}

function Classes() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    apiRequest("/classes")
      .then(setClasses)
      .catch(() => setError("Could not load classes"));
  }, []);

  function handleEnroll(classId) {
    setMessage("");
    apiRequest("/enrollments", {
      method: "POST",
      body: JSON.stringify({ class_id: classId }),
    })
      .then(() => setMessage("Enrolled successfully!"))
      .catch(() => setMessage("Enrollment failed"));
  }

  const categories = ["All", ...new Set(classes.map((c) => getCategory(c.name)))];
  const filtered = filter === "All" ? classes : classes.filter((c) => getCategory(c.name) === filter);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Classes</h1>
      <p style={styles.subheading}>Browse and book upcoming gym classes.</p>

      <div style={styles.filterRow}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={filter === cat ? styles.filterBtnActive : styles.filterBtn}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      <div style={styles.grid}>
        {filtered.map((c) => (
          <div key={c.id} style={styles.card}>
            <span style={styles.badge}>{getCategory(c.name)}</span>
            <h3 style={styles.cardTitle}>{c.name}</h3>
            <p style={styles.cardMeta}>with {c.instructor}</p>
            <p style={styles.cardDetail}>
              🕒 {new Date(c.schedule_time).toLocaleString(undefined, {
                month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
              })}
            </p>
            <p style={styles.cardDetail}>👥 Capacity: {c.capacity}</p>
            <button style={styles.button} onClick={() => handleEnroll(c.id)}>ENROLL</button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !error && (
        <p style={styles.emptyText}>No classes in this category yet.</p>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "2rem", color: "#fff", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#101826" },
  heading: { fontFamily: "'Exo 2', sans-serif", fontSize: "2rem", marginBottom: "0.25rem" },
  subheading: { opacity: 0.7, marginBottom: "1.5rem" },
  filterRow: { display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap" },
  filterBtn: {
    padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent", color: "#fff", fontSize: "0.85rem", cursor: "pointer",
  },
  filterBtnActive: {
    padding: "0.5rem 1rem", borderRadius: "999px", border: "1px solid #B7E400",
    background: "#B7E400", color: "#101826", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer",
  },
  error: { color: "#ff6b6b", marginBottom: "1rem" },
  success: { color: "#B7E400", marginBottom: "1rem" },
  emptyText: { opacity: 0.6, marginTop: "1rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" },
  card: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.2)",
    borderRadius: "14px", padding: "1.5rem", backdropFilter: "blur(6px)", position: "relative",
  },
  badge: {
    display: "inline-block", background: "rgba(183,228,0,0.15)", color: "#B7E400",
    fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "999px", marginBottom: "0.75rem",
  },
  cardTitle: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.2rem", marginBottom: "0.25rem" },
  cardMeta: { color: "#B7E400", fontSize: "0.9rem", marginBottom: "0.75rem" },
  cardDetail: { opacity: 0.7, fontSize: "0.85rem", marginBottom: "0.25rem" },
  button: {
    marginTop: "1rem", width: "100%", padding: "0.7rem", borderRadius: "8px", border: "none",
    background: "#B7E400", color: "#101826", fontWeight: 700, letterSpacing: "0.03em", cursor: "pointer",
  },
};

export default Classes;