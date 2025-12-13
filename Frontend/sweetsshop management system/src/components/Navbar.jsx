import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link> | {" "}
      <Link to="/admin">Admin</Link>
    </nav>
  );
}
