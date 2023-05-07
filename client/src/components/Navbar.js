import Wrapper from "../assets/wrappers/Navbar";
import { FaUtensils, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaUtensils />
        </button>

        <div className="navbar">
          <div className="nav-bar-link">
            <NavLink to="/">Dashboard </NavLink>
          </div>
          {user.role == "admin" ? (
            <div className="nav-bar-link">
              <NavLink to="/add-hotel">Add Hotels</NavLink>
            </div>
          ) : (
            ""
          )}
          <div className="nav-bar-link">
            <NavLink to="/all-jobs"> Hotels </NavLink>
          </div>
          <div className="nav-bar-link">
            <NavLink to="/profile">Profile</NavLink>
          </div>
        </div>

        <div className="btn-container">
          <button className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
