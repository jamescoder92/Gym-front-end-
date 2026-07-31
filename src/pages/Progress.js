import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import apiRequest from "../api/api";

function Progress() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/workouts")
      .then(setWorkouts)
      .catch(() => setError("Could not load workouts"));
  }, []);

  const chartData = workouts.slice().reverse().map((w) => ({ date: w.date, weight: w.weight }));

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Progress</h1>
      <p style={styles.subheading}>Every workout logged, tracked over time.</p>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.panel}>
        <h2 style={styles.panelTitle}>Weight Over Time</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip contentStyle={{ background: "#1a2436", border: "none", borderRadius: 8 }} />
              <Line type="monotone" dataKey="weight" stroke="#B7E400" strokeWidth={2} dot={{ fill: "#B7E400" }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p style={styles.emptyText}>No workouts logged yet — your chart will appear here.</p>
        )}
      </div>

      <div style={styles.list}>
        {workouts.map((w) => (
          <div key={w.id} style={styles.row}>
            <div>
              <h3 style={styles.exercise}>{w.exercise}</h3>
              <p style={styles.detail}>{w.sets} sets × {w.reps} reps</p>
            </div>
            <div style={styles.right}>
              <p style={styles.weight}>{w.weight} kg</p>
              <p style={styles.date}>{w.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "2rem", color: "#fff", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#101826" },
  heading: { fontFamily: "'Exo 2', sans-serif", fontSize: "2rem", marginBottom: "0.25rem" },
  subheading: { opacity: 0.7, marginBottom: "1.5rem" },
  error: { color: "#ff6b6b", marginBottom: "1rem" },
  emptyText: { opacity: 0.6 },
  panel: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.15)",
    borderRadius: "14px", padding: "1.5rem", marginBottom: "1.5rem",
  },
  panelTitle: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.1rem", marginBottom: "1rem" },
  list: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  row: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.15)",
    borderRadius: "12px", padding: "1rem 1.25rem",
  },
  exercise: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.05rem", marginBottom: "0.2rem" },
  detail: { opacity: 0.65, fontSize: "0.85rem" },
  right: { textAlign: "right" },
  weight: { color: "#B7E400", fontWeight: 700, fontSize: "1.1rem" },
  date: { opacity: 0.5, fontSize: "0.8rem" },
};

export default Progress;