import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import apiRequest from "../api/api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Step 1: request a reset link
  async function handleRequestReset(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await apiRequest("/reset-password/request", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage("If that email exists, a reset link has been sent.");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  }

  // Step 2: submit new password using the token from the URL
  async function handleResetPassword(e) {
    e.preventDefault();
    setError("");

    try {
      await apiRequest("/reset-password/confirm", {
        method: "POST",
        body: JSON.stringify({ token, password: newPassword }),
      });
      setMessage("Password updated! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Reset link is invalid or expired.");
    }
  }

  return (
    <div className="reset-password-page">
      {!token ? (
        <>
          <h2>Reset Password</h2>
          <form onSubmit={handleRequestReset}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
        </>
      ) : (
        <>
          <h2>Set New Password</h2>
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Update Password</button>
          </form>
        </>
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <p>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;