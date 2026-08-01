import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../api/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await apiRequest("/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Registration failed. Try a different email.");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.right}>
        <div style={styles.formCard}>
          <h1 style={styles.heading}>Create Account</h1>
          <p style={styles.subheading}>Start your fitness journey today.</p>

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />

            {error && <p style={styles.error}>{error}</p>}
            {success && (
              <p style={styles.success}>Account created! Redirecting to login...</p>
            )}

            <button type="submit" style={styles.button}>
              REGISTER
            </button>
          </form>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#101826",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  formCard: { width: "100%", maxWidth: "400px" },
  heading: { fontFamily: "'Exo 2', sans-serif", fontSize: "2rem", marginBottom: "0.25rem" },
  subheading: { opacity: 0.7, marginBottom: "2rem" },
  label: {
    display: "block",
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    opacity: 0.7,
    marginBottom: "0.4rem",
    marginTop: "1.25rem",
  },
  input: {
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    fontSize: "0.95rem",
    boxSizing: "border-box",
  },
  error: { color: "#ff6b6b", marginTop: "1rem", fontSize: "0.9rem" },
  success: { color: "#B7E400", marginTop: "1rem", fontSize: "0.9rem" },
  button: {
    width: "100%",
    marginTop: "1.5rem",
    padding: "0.9rem",
    borderRadius: "10px",
    border: "none",
    background: "#B7E400",
    color: "#101826",
    fontWeight: 700,
    letterSpacing: "0.03em",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  link: { color: "#B7E400", textDecoration: "none" },
  footerText: { textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", opacity: 0.8 },
};

export default Register;