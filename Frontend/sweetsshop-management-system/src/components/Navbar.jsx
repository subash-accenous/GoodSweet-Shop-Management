import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function Navbar() {
  return (
    <nav className="navbar">
  <div className="navInner">
    <div className="navLogo">Sweet Shop Management System</div>

    <div className="navLinks">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/admin">Admin</Link>
    </div>
  </div>
</nav>

  );
}
