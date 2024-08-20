import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { assets } from "../../assets/assets";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-options-option">
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list-cars" className="sidebar-options-option">
          <img src={assets.order_icon} alt="List Cars Icon" />
          <p>List Cars</p>
        </NavLink>
        <NavLink to="/booking" className="sidebar-options-option">
          <img src={assets.order_icon} alt="Bookings Icon" />
          <p>Bookings</p>
        </NavLink>
        <NavLink to="/list-users" className="sidebar-options-option">
          <img src={assets.order_icon} alt="List Users Icon" />
          <p>List Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
