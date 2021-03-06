import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Avatar from "./Avatar";
import "./Sidebar.css";
import DashIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {user ? (
            <>
              {user.photoURL && <Avatar src={user.photoURL} />}
              <p>Good Afternoon, {user.displayName}.</p>
            </>
          ) : (
            <p>Let's Get Qrackin'!</p>
          )}
        </div>
        {user && (
          <nav className="links">
            <ul>
              <li>
                <NavLink exact to="/">
                  <img src={DashIcon} alt="Dashboard Icon Button" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/create">
                  <img src={AddIcon} alt="Add Icon Button" />
                  <span>New Project</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
