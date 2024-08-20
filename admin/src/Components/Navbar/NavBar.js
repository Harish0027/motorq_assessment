import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" />
      <img className="profile" src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default NavBar;
