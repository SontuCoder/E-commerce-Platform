import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    return (

        <div>
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
                {/* Sign Up Form */}
                <div className="form-container sign-up-container">
                    <form action="#" id='form'>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" />
                        <input type="number" min="0000000000" max="9999999999" placeholder="Mobile Number" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="text" placeholder="Confirm Password" />
                        <button>Sign Up</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className="form-container sign-in-container">
                    <form action="#" id='form'>
                        <h1>Sign In</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign In</button>
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
