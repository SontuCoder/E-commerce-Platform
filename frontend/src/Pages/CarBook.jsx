import React, { useState, useEffect, useCallback } from 'react';
import './CarBook.css';
import s1 from '../Components/Assest/icon/Yellow Illustrative Discover India Facebook Ad.png';
import s2 from '../Components/Assest/icon/Gray Polaroid India Travel Facebook Ad.png';

const CarBook = () => {
    const slides = [s1, s2]; // Array of slide images
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
        <div className="out">
            <h1>This service under maintenance!</h1>
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
            <figcaption>*Hover for Hole Image*</figcaption>
            <div className="car-book-form">
                <h3>Fill the form for booking car</h3>
                <form>
                <input type="text" placeholder='Enter Pick Up Place' required />
                <input type="text" placeholder='Enter Destintion Place' required />
                <input type="datetime" name="date-time" id="date-time" placeholder='Enter date and time(dd/mm/yy-tt)' required/>
                <input type="number" min="0000000000" max="9999999999" placeholder='Enter mobile number'required/>
                <button type="submit" id='car-button'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CarBook;
