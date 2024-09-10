import React from 'react';
import './About.css';
import Bro_img from "../Components/Assest/icon/Brother.jpg";
import Logo from "../Components/Assest/icon/2-removebg-preview.png";
import Best_saler from "../Components/Assest/icon/best selar2.jpg";
import whatsapp from "../Components/Assest/icon/whatsapp.png";

const About = () => {
    return (
        <div className='about'>
            <div className="upper">
                <div className='logo'>
                    <img src={Logo} alt="" id='logo'/>
                </div>
                <div className="logo-name">
                    <p>Jharna Electronics & Travels</p>
                </div>
            </div>
            <div className="mid">
                <div className="img">
                    <img src={Bro_img} alt="" id='img'/>
                </div>
                <div className="text">
                    <h1>
                        About Us
                    </h1>
                    <p>
                        <ol>
                            <li><p>Owner's Name:</p><span> Sarabendu Maity</span></li>
                            <li><p>Location:</p><span> Sonakhali Bajar, Sonakhali, Paschim Medinipur, West Bengal-721146;</span></li>
                            <li><p>Opening date:</p><span> 16/01/2001</span></li>
                            <li><p>Opening and Closing Hours:</p><span>7 A.M. - 9 P.M.</span></li>
                            <li><p>Days of Operation:</p><span>Sunday - Saturday,(Tuesday upto 6.P.M.);</span></li>
                            <li><p>Customer Service:</p>
                                <ul>
                                    <li><span>Verious Electronics sales and repair.</span></li>
                                    <li><span>Home Electronic service.</span></li>
                                    <li><span>Car Booking and Travel service.</span></li>
                                </ul></li>
                            <li><p>Phone No.</p><span>9933452415 <img src={whatsapp} alt="" /></span></li>
                        </ol>
                    </p>
                </div>
            </div>
            <div className="lower">
                <img src={Best_saler} alt="" className="best-saler" />
                <h3>Best Electronic Product saler from "Ebay"</h3>
            </div>
        </div>
    );
}

export default About;

