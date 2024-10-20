import React, { useState, useEffect } from 'react'
import img  from '../Components/Assest/icon/user.png';
import './User.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const User = () => {

    const [username, setName] = useState();
    const [number, setNumber]  = useState();
    const [email, setEmail] = useState();
    

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('auth-token'); 
            if (!token) {
                toast.error('You need to be logged in to view your cart', { position: 'top-right' });
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/userdetails', {
                    headers: {
                        'auth-token': token
                    }
                });

                if (response.data.success) {
                    // const userDetails = response.data.user; 
                    setName(response.data.user.name); 
                    setNumber(response.data.user.number); 
                    setEmail(response.data.user.email); 
                } else {
                    toast.error(response.data.message, { position: 'top-right' });
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to load the User details. Please try again.', { position: 'top-right' });
            }
        };
        fetchData();
    }, []); 


    return (
        <div id='user'>
            <div className="container" id='userContainer'>
                <div className="img-side">
                    <div className="img">
                        <img src={img} alt="user imag" />
                    </div>
                </div>
                <div className="details-side">
                    <h2>Hey, friend</h2>
                    <ul>
                        <li><h3>Name :</h3> {username}</li>
                        <li><h3>Mobile number :</h3> {number}</li>
                        <li><h3>Email :</h3> {email}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default User
