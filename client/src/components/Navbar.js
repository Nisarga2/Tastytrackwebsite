import Wrapper from "../assets/wrappers/Navbar";
import './navbar.css';

import {
  FaUtensils,
  FaUserCircle,
  FaCaretDown,
  FaHome,
  FaShoppingCart,
  FaPhoneAlt,
  FaHotel,
  FaGrinAlt,
  FaClipboardList,
  FaUser,
} from "react-icons/fa";
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
          <Logo />
          {/* <FaUtensils /> */}
        </button>

        <div className="navbar">
          <div className="nav-bar-link">
            <FaHome style={{ margin: "10px" }} fontSize={20} />
            <NavLink
              to="/"
              onClick={localStorage.setItem("cart", JSON.stringify([]))}
            >
              Dashboard{" "}
            </NavLink>
          </div>
          <div className="nav-bar-link">
            <FaShoppingCart style={{ margin: "10px" }} fontSize={20} />
            <NavLink to="/cart"> Cart </NavLink>
          </div>
          <div className="nav-bar-link">
            <FaClipboardList style={{ margin: "10px" }} fontSize={20} />
            <NavLink to="/wishlist"> WishList </NavLink>
          </div>
          {user.role == "admin" ? (
            <div className="nav-bar-link">
              <FaHotel style={{ margin: "10px" }} fontSize={20} />
              <NavLink to="/add-hotel">Add Hotels</NavLink>
            </div>
          ) : (
            ""
          )}
          {user.role == "admin" ? (
            <div className="nav-bar-link">
              <FaHotel style={{ margin: "10px" }} fontSize={20} />
              <NavLink to="/delete-hotel">Delete Hotels</NavLink>
            </div>
          ) : (
            ""
          )}
          <div className="nav-bar-link">
            <FaGrinAlt style={{ margin: "10px" }} fontSize={20} />
            <NavLink to="/about"> About Us </NavLink>
          </div>
          <div className="nav-bar-link">
            <FaPhoneAlt style={{ margin: "10px" }} fontSize={20} />
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
          <div className="nav-bar-link">
            <FaUser style={{ margin: "10px" }} fontSize={20} />
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
