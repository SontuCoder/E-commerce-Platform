import React from 'react';
import "./Navbar.css";
import logo from "../Assest/icon/2-removebg-preview.png";
import cart_icon from "../Assest/icon/cart-regular-24.png";


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
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">Car Booking</a>
            <a href="#">Contact</a>
            <a href="#">About Us</a>
          </div>
          <a href="#"><img src={cart_icon} alt="" id="cart"/></a>
          <div className="login-signup">
            <a href="#">Login/Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar
