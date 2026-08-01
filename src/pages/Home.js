import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={{ color: "#B7E400" }}>⚡</span> FITNESS 360
        </div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/classes" style={styles.navLink}>Classes</Link>
          <Link to="/membership" style={styles.navLink}>Membership</Link>
        </div>
        <div style={styles.navButtons}>
          <Link to="/login" style={styles.loginBtn}>Log In</Link>
          <Link to="/register" style={styles.joinBtn}>Join Now</Link>
        </div>
      </nav>

      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <span style={styles.badge}>⚡ NEXT-GEN FITNESS PLATFORM</span>
          <h1 style={styles.heroTitle}>
            TRAIN <span style={{ color: "#B7E400" }}>BEYOND</span>
            <br />
            LIMITS
          </h1>
          <p style={styles.heroText}>
            Join Fitness 360 to get the dream body you've always wanted with
            elite coaches and data-driven tracking.
          </p>
          <div style={styles.ctaRow}>
            <Link to="/register" style={styles.ctaPrimary}>JOIN NOW →</Link>
            <Link to="/membership" style={styles.ctaSecondary}>Explore Plans</Link>
          </div>

          <div style={styles.stats}>
            <div>
              <div style={styles.statNum}>10+</div>
              <div style={styles.statLabel}>Professional Coaches</div>
            </div>
            <div>
              <div style={styles.statNum}>50+</div>
              <div style={styles.statLabel}>Positive Reviews</div>
            </div>
            <div>
              <div style={styles.statNum}>10+</div>
              <div style={styles.statLabel}>Classes</div>
            </div>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.previewCard}>
            <div style={styles.previewBadge}>🔥 524 kcal</div>
            <p style={styles.previewLabel}>Today's burn</p>
            <div style={styles.previewBadge2}>12-day streak</div>
            <p style={styles.previewLabel}>Keep it up!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#101826",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.25rem 3rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  logo: {
    fontFamily: "'Exo 2', sans-serif",
    fontWeight: 800,
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  navLinks: { display: "flex", gap: "2rem" },
  navLink: { color: "#fff", textDecoration: "none", opacity: 0.85, fontSize: "0.95rem" },
  navButtons: { display: "flex", alignItems: "center", gap: "1rem" },
  loginBtn: { color: "#fff", textDecoration: "none", fontSize: "0.95rem" },
  joinBtn: {
    background: "#B7E400",
    color: "#101826",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: "0.9rem",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4rem 3rem",
    flexWrap: "wrap",
    gap: "3rem",
  },
  heroLeft: { flex: 1, minWidth: "300px" },
  badge: {
    display: "inline-block",
    background: "rgba(183,228,0,0.15)",
    color: "#B7E400",
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: "0.4rem 0.9rem",
    borderRadius: "999px",
    marginBottom: "1.5rem",
  },
  heroTitle: {
    fontFamily: "'Exo 2', sans-serif",
    fontSize: "3.5rem",
    fontWeight: 800,
    lineHeight: 1.05,
    marginBottom: "1.5rem",
  },
  heroText: { opacity: 0.75, fontSize: "1rem", maxWidth: "480px", marginBottom: "2rem" },
  ctaRow: { display: "flex", gap: "1rem", marginBottom: "3rem" },
  ctaPrimary: {
    background: "#B7E400",
    color: "#101826",
    padding: "0.9rem 1.5rem",
    borderRadius: "10px",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  ctaSecondary: {
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "0.9rem 1.5rem",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  stats: { display: "flex", gap: "2.5rem" },
  statNum: { fontFamily: "'Exo 2', sans-serif", fontSize: "1.6rem", fontWeight: 800 },
  statLabel: { opacity: 0.6, fontSize: "0.85rem" },
  heroRight: { flex: 1, display: "flex", justifyContent: "center", minWidth: "280px" },
  previewCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(183,228,0,0.2)",
    borderRadius: "20px",
    padding: "2.5rem",
    textAlign: "center",
    width: "100%",
    maxWidth: "300px",
  },
  previewBadge: { fontSize: "1.3rem", fontWeight: 700, color: "#B7E400", marginBottom: "0.3rem" },
  previewLabel: { opacity: 0.6, fontSize: "0.85rem", marginBottom: "1.5rem" },
  previewBadge2: { fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.3rem" },
};

export default Home;