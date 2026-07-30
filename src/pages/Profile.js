import "../components/Navbar.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="app-content" style={{ padding: "2rem", color: "#fff" }}>
      <h1 style={{ fontFamily: "'Exo 2', sans-serif", marginBottom: "1.5rem" }}>
        Your Profile
      </h1>

      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(183,228,0,0.25)",
          borderRadius: "12px",
          padding: "1.5rem",
          maxWidth: "400px",
          backdropFilter: "blur(6px)",
        }}
      >
        <ProfileRow label="Name" value={user.name} />
        <ProfileRow label="Email" value={user.email} />
      </div>
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <p style={{ color: "#B7E400", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
        {label.toUpperCase()}
      </p>
      <p style={{ fontSize: "1rem" }}>{value || "—"}</p>
    </div>
  );
}

export default Profile;