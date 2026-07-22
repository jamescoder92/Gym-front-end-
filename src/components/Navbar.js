import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function isActive(path) {
    return location.pathname === path;
  }

  if (!token) {
    return (
      <nav className="topnav">
        <Link to="/" className="logo">⚡ FITNESS 360</Link>
        <div className="topnav-links">
          <Link to="/login">Log In</Link>
          <Link to="/register" className="join-btn">Join Now</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sidebar">
      <Link to="/" className="logo">⚡ FITNESS 360</Link>
      <div className="sidebar-links">
        <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>Dashboard</Link>
        <Link to="/classes" className={isActive("/classes") ? "active" : ""}>Classes</Link>
        <Link to="/progress" className={isActive("/progress") ? "active" : ""}>Progress</Link>
        <Link to="/membership" className={isActive("/membership") ? "active" : ""}>Membership</Link>
        <Link to="/profile" className={isActive("/profile") ? "active" : ""}>Profile</Link>
      </div>
      <button onClick={handleLogout} className="logout-btn">Log Out</button>
    </nav>
  );
}

export default Navbar;