import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiRequest from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.logo}>
          <span style={{ color: "#B7E400" }}>⚡</span> FITNESS 360
        </div>
        <h2 style={styles.tagline}>PUSH YOUR LIMITS</h2>
        <p style={styles.subtext}>Every rep counts. Every session matters.</p>
        <div style={styles.stats}>
          <div>
            <div style={styles.statNum}>3,200+</div>
            <div style={styles.statLabel}>Members</div>
          </div>
          <div>
            <div style={styles.statNum}>150+</div>
            <div style={styles.statLabel}>Classes</div>
          </div>
          <div>
            <div style={styles.statNum}>98%</div>
            <div style={styles.statLabel}>Satisfaction</div>
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formCard}>
          <h1 style={styles.heading}>Welcome Back</h1>
          <p style={styles.subheading}>Sign in to continue your fitness journey.</p>

          <form onSubmit={handleSubmit}>
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

            <div style={styles.row}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/reset-password" style={styles.link}>Forgot password?</Link>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.button}>SIGN IN</button>
          </form>

          <p style={styles.footerText}>
            Don't have an account? <Link to="/register" style={styles.link}>Create Account</Link>
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
  },
  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "3rem",
  },
  logo: {
    fontFamily: "'Exo 2', sans-serif",
    fontWeight: 700,
    fontSize: "1.1rem",
    marginBottom: "3rem",
  },
  tagline: {
    fontFamily: "'Exo 2', sans-serif",
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#B7E400",
    marginBottom: "0.5rem",
  },
  subtext: { opacity: 0.7, marginBottom: "2rem" },
  stats: { display: "flex", gap: "2rem" },
  statNum: { color: "#B7E400", fontSize: "1.5rem", fontWeight: 800 },
  statLabel: { opacity: 0.6, fontSize: "0.85rem" },
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
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    fontSize: "0.85rem",
  },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.8 },
  link: { color: "#B7E400", textDecoration: "none" },
  error: { color: "#ff6b6b", marginTop: "1rem", fontSize: "0.9rem" },
  button: {
    width: "100%",
    marginTop: "1.5rem",
    padding: "0.9rem",
    borderRadius: "10px",
    border: "none",
    background: "#B7E400",
    color: "#101826",
    fontWeight: 700,
    letterSpacing: "0.05em",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  footerText: { textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", opacity: 0.8 },
};

export default Login;