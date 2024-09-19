import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginSignup = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [number,setNumber]=useState();
    const [password,setPassword]=useState();
    const [confirmpassword,setConfirmpassword]=useState();


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/register', {
            username: name,
            email,
            mobile: number,
            password,
        })
        .then(result => {
            console.log(result);
            toast.success('New user added successfully!', { position: "top-right" });
            // navigate("/");
        })
        .catch(err => {console.log(err);
            toast.error('Error', { position: "top-right" });
            // navigate("/");
        });
    };

    return (

        <div>
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form id='form' onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)}/>
                        <input type="number" min="0000000000" max="9999999999" placeholder="Mobile Number" onChange={(e)=> setNumber(e.target.value)}/>
                        <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
                        <input type="text" placeholder="Confirm Password" onChange={(e)=> setConfirmpassword(e.target.value)} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form action="#" id='form'>
                        <h1>Sign In</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Sign In</button>
                    </form>
                </div>

                {/* Overlay with Buttons */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected, please sign in with your personal info.</p>
                            <button className="ghost" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your details to create an account and start your journey with us.</p>
                            <button className="ghost" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
