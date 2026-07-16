import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {token ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/classes">Classes</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;