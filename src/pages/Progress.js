import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import apiRequest from "../api/api";

function Progress() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadWorkouts();
  }, []);

  function loadWorkouts() {
    apiRequest("/workouts")
      .then((data) => {
        setWorkouts(data);
        setError("");
      })
      .catch(() => setError("Could not load workouts"));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      await apiRequest("/workouts", {
        method: "POST",
        body: JSON.stringify({
          exercise,
          sets: Number(sets),
          reps: Number(reps),
          weight: Number(weight),
        }),
      });
      setExercise("");
      setSets("");
      setReps("");
      setWeight("");
      setMessage("Workout logged!");
      loadWorkouts();
    } catch (err) {
      setMessage("Could not log workout. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await apiRequest(`/workouts/${id}`, { method: "DELETE" });
      loadWorkouts();
    } catch (err) {
      setMessage("Could not delete workout.");
    }
  }

  const chartData = workouts.slice().reverse().map((w) => ({ date: w.date, weight: w.weight }));

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Your Progress</h1>
      <p style={styles.subheading}>Log your workouts and watch your progress over time.</p>

      <div style={styles.twoCol}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Log a Workout</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Exercise</label>
            <input
              type="text"
              placeholder="Bench Press"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
              style={styles.input}
            />

            <div style={styles.row3}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Sets</label>
                <input
                  type="number"
                  min="1"
                  placeholder="4"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Reps</label>
                <input
                  type="number"
                  min="1"
                  placeholder="8"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Weight (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="60"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {message && (
              <p style={message.includes("logged") ? styles.success : styles.error}>{message}</p>
            )}

            <button type="submit" disabled={submitting} style={styles.button}>
              {submitting ? "LOGGING..." : "LOG WORKOUT"}
            </button>
          </form>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Weight Over Time</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a2436", border: "none", borderRadius: 8 }} />
                <Line type="monotone" dataKey="weight" stroke="#B7E400" strokeWidth={2} dot={{ fill: "#B7E400" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={styles.emptyText}>Log your first workout to see your chart here.</p>
          )}
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>}

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
            <button style={styles.deleteBtn} onClick={() => handleDelete(w.id)} title="Delete">
              ✕
            </button>
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
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" },
  panel: {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.15)",
    borderRadius: "14px", padding: "1.5rem",
  },
  panelTitle: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.1rem", marginBottom: "1rem" },
  form: { display: "flex", flexDirection: "column" },
  label: { fontSize: "0.75rem", opacity: 0.7, marginBottom: "0.3rem", marginTop: "0.9rem", letterSpacing: "0.03em" },
  input: {
    width: "100%", padding: "0.7rem 0.85rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box",
  },
  row3: { display: "flex", gap: "0.75rem" },
  error: { color: "#ff6b6b", marginTop: "0.75rem", fontSize: "0.85rem" },
  success: { color: "#B7E400", marginTop: "0.75rem", fontSize: "0.85rem" },
  button: {
    marginTop: "1.25rem", padding: "0.8rem", borderRadius: "8px", border: "none",
    background: "#B7E400", color: "#101826", fontWeight: 700, letterSpacing: "0.03em", cursor: "pointer",
  },
  emptyText: { opacity: 0.6, fontSize: "0.9rem" },
  list: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  row: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(183,228,0,0.15)",
    borderRadius: "12px", padding: "1rem 1.25rem", gap: "1rem",
  },
  exercise: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.05rem", marginBottom: "0.2rem" },
  detail: { opacity: 0.65, fontSize: "0.85rem" },
  right: { textAlign: "right", flex: 1 },
  weight: { color: "#B7E400", fontWeight: 700, fontSize: "1.1rem" },
  date: { opacity: 0.5, fontSize: "0.8rem" },
  deleteBtn: {
    background: "transparent", border: "1px solid rgba(255,107,107,0.4)", color: "#ff6b6b",
    borderRadius: "6px", width: "28px", height: "28px", cursor: "pointer", fontSize: "0.8rem",
  },
};

export default Progress;