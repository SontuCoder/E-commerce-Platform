import React from 'react';
import "./Navbar.css";
import logo from "../Assest/icon/2-removebg-preview.png";
import cart_icon from "../Assest/icon/cart-regular-24.png";
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <div className='Navbar'>
      <div className='header'>
        <p> Jharna Electronics & Travels</p>
      </div>
      <div className='navbar'>
        <img src={logo} alt="" />
        <div className="left">
          <div className="nav-list">
            <Link to="/">Home</Link>
            <Link to="/car-booking">Car Booking</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About Us</Link>
          </div>
          <Link to="/cart"><img src={cart_icon} alt="" id="cart"/></Link>
          <div className="cart-count">0</div>
          <div className="login-signup">
            <Link to="/loginsignup">Login/Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
