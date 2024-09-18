import React,{useCallback, useState,useEffect} from 'react'
import './Shop.css';
import { Link } from 'react-router-dom';
import Bulb from '../Components/Assest/b6.jpeg';
import Cl from "../Components/Assest/cl12.jpeg";
import Ch from "../Components/Assest/ch7.jpeg";
import Cv from "../Components/Assest/cv4.jpeg";
import Co from "../Components/Assest/co10.jpeg";
import Cf from "../Components/Assest/f6.jpeg";
import Tf from "../Components/Assest/f13.jpeg";
import Me from "../Components/Assest/m1.jpeg";
import Mix from "../Components/Assest/mx1.jpeg";
import Neo1 from "../Components/Assest/n22.jpeg";
import Neo2 from "../Components/Assest/n1.jpeg";
import Sl1 from "../Components/Assest/sl4.jpeg";
import Sw from "../Components/Assest/sw17.jpeg";
import Tl1 from "../Components/Assest/tl2.jpeg";
import Tl2 from "../Components/Assest/tl6.jpeg";
import Tar from "../Components/Assest/t6.jpeg";
import Tube from "../Components/Assest/tu2.jpeg";
import Wl1 from "../Components/Assest/wl3.jpeg";
import Wl2 from "../Components/Assest/wl17.jpeg";
import Tv from "../Components/Assest/tv1.jpeg";
import Eq1 from "../Components/Assest/eq7.jpeg";
import Eq2 from "../Components/Assest/eq16.jpeg";
import Eq3 from "../Components/Assest/eq11.jpeg";
import Eq4 from "../Components/Assest/eq15.jpeg";
import Off1 from "../Components/Assest/icon/off1.jpg";
import Off2 from "../Components/Assest/icon/12-10-2024.png";
import Off3 from "../Components/Assest/icon/off3.jpg";
import Tuer1 from "../Components/Assest/icon/Yellow Illustrative Discover India Facebook Ad.png";
import Tuer2 from "../Components/Assest/icon/Gray Polaroid India Travel Facebook Ad.png";
import CarBook from "../Components/Assest/icon/carBook.png";
import Logo from "../Components/Assest/icon/2-removebg-preview.png";



const Shop = () => {

        const slides = [Off1, Off2,Off3]; // Array of slide images
        const [activeSlide, setActiveSlide] = useState(1); // Start from 1 (second slide)
        const [isTransitioning, setIsTransitioning] = useState(false); // To handle smooth transitions
        const [isPaused, setIsPaused] = useState(false); // To track if the auto slide is paused
        const totalSlides = slides.length;
    
        // Memoize nextSlide using useCallback
        const nextSlide = useCallback(() => {
            if (!isTransitioning) {
                setIsTransitioning(true); // Enable transition
                setActiveSlide((prev) => prev + 1);
            }
        }, [isTransitioning]);
    
        // Handle auto slide change
        useEffect(() => {
            if (!isPaused) {
                const autoSlide = setInterval(() => {
                    nextSlide(); // Call the next slide function every 3 seconds
                }, 3000);
    
                return () => clearInterval(autoSlide); // Clear interval when the component unmounts or pauses
            }
        }, [nextSlide, isPaused]); // Include isPaused in dependency to stop when hovered
    
        useEffect(() => {
            if (activeSlide === 0) {
                setTimeout(() => {
                    setIsTransitioning(false); // Disable transition temporarily for snapping
                    setActiveSlide(totalSlides); // Snap to the last slide
                }, 500); // Timeout matches the CSS transition duration
            } else if (activeSlide === totalSlides + 1) {
                setTimeout(() => {
                    setIsTransitioning(false); // Disable transition temporarily for snapping
                    setActiveSlide(1); // Snap to the first slide
                }, 500); // Timeout matches the CSS transition duration
            }
        }, [activeSlide, totalSlides]);
    
        // Handle past button click
        const pastSlide = () => {
            if (!isTransitioning) {
                setIsTransitioning(true);
                setActiveSlide((prev) => prev - 1);
            }
        };
    
        // Handle dot click
        const goToSlide = (index) => {
            setIsTransitioning(true);
            setActiveSlide(index + 1); // Offset by 1 due to duplication
        };
    
        // Handle mouse enter and leave events
        const handleMouseEnter = () => {
            setIsPaused(true); // Pause auto-slide on hover
        };
    
        const handleMouseLeave = () => {
            setIsPaused(false); // Resume auto-slide on mouse leave
        };
    
    return (
        <div className='shop'>
            <section id='home'>
                <div className='items-boxs'>
                    <div className='boxs'>
                        <Link className='items'>
                            <img src={Bulb}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Cl}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Ch}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Cv}></img>
                        </Link>
                    </div>

                    <div className='boxs'>
                        <Link className='items'>
                            <img src={Co}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Cf}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Tf}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Mix}></img>
                        </Link>
                    </div>

                    <div className='boxs'>
                        <Link className='items'>
                            <img src={Neo1}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Tl1}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Tl2}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Neo2}></img>
                        </Link>
                    </div>

                    <div className='boxs'>
                        <Link className='items'>
                            <img src={Me}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Sw}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Tv}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Tar}></img>
                        </Link>
                    </div>

                    <div className='boxs'>
                        <Link className='items'>
                            <img src={Eq3}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Eq1}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Eq2}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Eq4}></img>
                        </Link>
                    </div>

                    <div className='boxs'>
                        <Link className='items'>
                            <img src={Sl1}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Wl1}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Wl2}></img>
                        </Link>
                        <Link className='items'>
                            <img src={Tube}></img>
                        </Link>
                    </div>
                </div>
            </section>
            <section id='offers'>
                <div className="slide-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div
                        className="slides"
                        style={{
                            transform: `translateX(-${activeSlide * 100}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                        }}
                        onTransitionEnd={() => setIsTransitioning(false)} // Reset transitioning after slide change
                    >
                        <img src={slides[totalSlides - 1]} alt="" /> {/* Last slide duplicate */}
                        {slides.map((slide, index) => (
                            <img key={index} src={slide} alt="" />
                        ))}
                        <img src={slides[0]} alt="" /> {/* First slide duplicate */}
                    </div>

                    {/* Next and previous buttons */}
                    <div className="buttons">
                        <span className="past" onClick={pastSlide}>&#10094;</span>
                        <span className="next" onClick={nextSlide}>&#10095;</span>
                    </div>

                    {/* Dot indicators */}
                    <div className="dotCounter">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`dot ${index === activeSlide - 1 ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></div>
                        ))}
                    </div>
                </div>
            </section>
            <section id='car-book-sec'>
                <Link className='left'>
                    <img src={Tuer1} alt="" />
                </Link>
                <Link className='right'>
                    <img src={Tuer2} alt="" />
                </Link>
            </section>
            <section id='carBooking'>
                <Link className='carBooking'>
                    <img src={CarBook} alt="" />
                </Link>
            </section>
            <section id='last'>
                <Link id='upButton'>
                    <p>Back to Top</p>
                </Link>
                <div id='mid'>
                    <div id="first">
                        <h3>Connect With Us</h3>
                        <p>Fackbook</p>
                        <p>Instagram</p>
                    </div>
                    <div id="second">
                        <h3>Our Services</h3>
                        <p>Electronic Product sells</p>
                        <p>Travels</p>
                        <p>Electical Work</p>
                    </div>
                    <div id="third">
                        <h3>Let us Help You</h3>
                        <p>Your Account</p>
                        <p>Help Lines</p>
                    </div>
                </div>
                <div id="down">
                    <img src={Logo} alt="" />
                    <p>Maintaining by "Maity Brother's"</p>
                </div>
            </section>
            
        </div>
    )
}

export default Shop;
