import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import Temple from "../assets/temple.svg";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout, isPending } = useLogout();
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>Qollide</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {isPending ? (
              <button className="btn" disabled>
                Logging out...
              </button>
            ) : (
              <button className="btn" onClick={logout}>
                Log out
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
