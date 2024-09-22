import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import logo from "../Assest/icon/2-removebg-preview.png";
import cart_icon from "../Assest/icon/cart-regular-24.png";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import axios from 'axios';

function Navbar() {
  const [ countCart, setCartCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartCount = async () => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        setIsLoggedIn(true);
        try {
          const response = await axios.get('http://localhost:4000/cartcount', {
            headers: { 'auth-token': token }
          });
          if (response.data.success) {
            setCartCount(response.data.number);
          } else {
            toast.error(response.data.message, { position: 'top-right' });
          }
        } catch (err) {
          console.error(err);
          toast.error('Failed to load the cart count.', { position: 'top-right' });
        }
      }
    };

    fetchCartCount();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('auth-token'); 
    setIsLoggedIn(false); 
    toast.success('Logged out successfully', { position: 'top-right' }); 
    navigate('/'); 
    window.location.reload();
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
          <div className="cart-count">{countCart}</div>
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
