import { Link } from "react-router-dom";
import Temple from "../assets/temple.svg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="Qollide Logo" />
          <span>Qollide - Project Management</span>
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
    </div>
  );
}
