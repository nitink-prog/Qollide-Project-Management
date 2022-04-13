import { Link } from "react-router-dom";
import Temple from "../assets/temple.svg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>Qollide</span>
        </li>

        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <button className="btn">Log out</button>
        </li>
      </ul>
    </nav>
  );
}
