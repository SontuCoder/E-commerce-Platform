// Navbar.jsx
import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import logo from "../Assest/icon/2-removebg-preview.png";
import cart_icon from "../Assest/icon/cart-regular-24.png";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [aEmail, setEmail] = useState('');

  const extructEmail = async (token) => {
    try {
      const response = await axios.get('http://localhost:4000/userdetails', {
        headers: {
          'auth-token': token
        }
      });

      if (response.data.success) {
        return response.data.user.email;
      } else {
        toast.error(response.data.message, { position: 'top-right' });
        return null;
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load the admin details. Please try again.', { position: 'top-right' });
      return null;
    }
  };


  useEffect(() => {
    // Check if the user is logged in
    const fetchUserEmail = async () => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        const email = await extructEmail(token);
        if (email) {
          setIsLoggedIn(true);
          setEmail(email);
        }
      }
    }; fetchUserEmail();
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success('Logged out successfully', { position: 'top-right' });
    navigate('/'); // Navigate to home after logout
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
            {isLoggedIn && aEmail === 'admin@gmail.com' && (
              <Link to="/admin-panel">Admin Panel</Link>
            )}
          </div>
          <Link to="/cart"><img src={cart_icon} alt="Cart" id="cart" /></Link>
          <div className="login-signup">
            {isLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/loginsignup">Login/Signup</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
