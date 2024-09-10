import React from 'react';
import './Contact.css';

function Contact() {
    return (
        <div>
            <div className="contact">
                <div className="contact-text">
                    <h2>Contact <span>Me</span></h2>
                    <h4>Let's work together</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequuntur molestiae, unde obcaecati eos qui laborum ullam dicta. Modi quam ratione laborum sint fugiat illum, repellendus assumenda magnam consequuntur nobis praesentium optio voluptatum quidem reprehenderit sapiente eum eligendi a veniam atque cum iste? Nihil esse obcaecati delectus a iure accusamus.</p>
                </div>
                <div className="contact-form">
                    <form>
                        <input type="text" name="name" id="name" placeholder="Enter Your Name" required />
                        <br />
                        <input type="email" name="email" id="email" placeholder="Enter Your Email" required />
                        <br />
                        <input type="number" name="phone" id="phone" min="0000000000" max="9999999999" placeholder="Enter Your Phone Number" required />
                        <br />
                        <textarea name="message" id="message" cols="40" rows="10" placeholder="Enter Your Message"></textarea>
                        <br />
                        <input type="submit" value="Submit" className="send" id='button' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
