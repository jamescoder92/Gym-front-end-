import { useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../api/api";

function ResetPassword() {
  const [step, setStep] = useState(1); // 1 = request, 2 = confirm
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRequest(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const data = await apiRequest("/reset-password/request", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setToken(data.reset_token || "");
      setMessage("Reset token generated. Enter it below along with your new password.");
      setStep(2);
    } catch (err) {
      setError("No account found with that email.");
    }
  }

  async function handleConfirm(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await apiRequest("/reset-password/confirm", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setMessage("Password updated successfully! You can now log in.");
    } catch (err) {
      setError("Invalid or expired token.");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.logo}><span style={{ color: "#B7E400" }}>⚡</span> FITNESS 360</div>
        <h2 style={styles.tagline}>RESET & RETURN</h2>
        <p style={styles.subtext}>We'll help you get back into your account.</p>
      </div>

      <div style={styles.right}>
        <div style={styles.formCard}>
          <h1 style={styles.heading}>Reset Password</h1>
          <p style={styles.subheading}>
            {step === 1
              ? "Enter your email to receive a reset token."
              : "Enter your reset token and new password."}
          </p>

          {step === 1 ? (
            <form onSubmit={handleRequest}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />

              {error && <p style={styles.error}>{error}</p>}
              {message && <p style={styles.success}>{message}</p>}

              <button type="submit" style={styles.button}>SEND RESET TOKEN</button>
            </form>
          ) : (
            <form onSubmit={handleConfirm}>
              <label style={styles.label}>Reset Token</label>
              <input
                type="text"
                placeholder="Paste your token here"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                style={styles.input}
              />

              <label style={styles.label}>New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />

              {error && <p style={styles.error}>{error}</p>}
              {message && <p style={styles.success}>{message}</p>}

              <button type="submit" style={styles.button}>UPDATE PASSWORD</button>
            </form>
          )}

          <p style={styles.footerText}>
            Remembered it? <Link to="/login" style={styles.link}>Back to Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#101826", color: "#fff", fontFamily: "'DM Sans', sans-serif" },
  left: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem" },
  logo: { fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "3rem" },
  tagline: { fontFamily: "'Exo 2', sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#B7E400", marginBottom: "0.5rem" },
  subtext: { opacity: 0.7 },
  right: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" },
  formCard: { width: "100%", maxWidth: "400px" },
  heading: { fontFamily: "'Exo 2', sans-serif", fontSize: "2rem", marginBottom: "0.25rem" },
  subheading: { opacity: 0.7, marginBottom: "2rem" },
  label: { display: "block", fontSize: "0.75rem", letterSpacing: "0.05em", opacity: 0.7, marginBottom: "0.4rem", marginTop: "1.25rem" },
  input: {
    width: "100%", padding: "0.85rem 1rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "0.95rem", boxSizing: "border-box",
  },
  error: { color: "#ff6b6b", marginTop: "1rem", fontSize: "0.9rem" },
  success: { color: "#B7E400", marginTop: "1rem", fontSize: "0.9rem" },
  button: {
    width: "100%", marginTop: "1.5rem", padding: "0.9rem", borderRadius: "10px", border: "none",
    background: "#B7E400", color: "#101826", fontWeight: 700, letterSpacing: "0.05em", cursor: "pointer", fontSize: "0.95rem",
  },
  footerText: { textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", opacity: 0.8 },
  link: { color: "#B7E400", textDecoration: "none" },
};

export default ResetPassword;