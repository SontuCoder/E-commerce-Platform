import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import logo from "../Assest/icon/2-removebg-preview.png";
import cart_icon from "../Assest/icon/cart-regular-24.png";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // To show notifications

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token'); // Assuming token presence indicates login status
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth-token'); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the state to reflect logged out status
    toast.success('Logged out successfully', { position: 'top-right' }); // Display a success message
    navigate('/'); // Redirect to home page or login page
  };

  return (
    <div className='Navbar'>
      <div className='header'>
        <p> Jharna Electronics & Travels</p>
      </div>
      <div className='navbar'>
        <img src={logo} alt="Logo" />
        <div className="left">
          <div className="nav-list">
            <Link to="/">Home</Link>
            <Link to="/car-booking">Car Booking</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About Us</Link>
          </div>
          <Link to="/cart"><img src={cart_icon} alt="Cart" id="cart"/></Link>
          <div className="cart-count">0</div>
          <div className="login-signup">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button> // Show logout button if logged in
            ) : (
              <Link to="/loginsignup">Login/Signup</Link> // Show login/signup button if not logged in
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
