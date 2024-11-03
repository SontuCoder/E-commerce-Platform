import React, { useState } from 'react';
import './Contact.css';
import toast from 'react-hot-toast';
import axios from 'axios';

function Contact() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const submitContact = (e)=>{
        e.preventDefault();

        if(!name || !email || !phone || !message){
            toast.error('All fields are required', { position: 'top-right' });
            return;
        }

        if(phone.length !==10){
            toast.error('Mobile number must be exactly 10 digits', { position: "top-right" });
            return;
        }
        
        axios.post('http://localhost:4000/contactsubmit',{
            name,
            email,
            phone,
            message,
        }).then(response=>{
            const result = response.data;
            if (result.success) {
                toast.success(result.message1, { position: 'top-right' });
                toast.success(result.message2, { position: 'top-right' });
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                toast.error(result.message, { position: 'top-right' });
            }
        }).catch(err=>{
            console.error(err);
            toast.error('An error occurred, please try again.', { position: 'top-right' });
        });
    };

    return (
        <div>
            <div className="contact">
                <div className="contact-text">
                    <h2>Contact <span>Me</span></h2>
                    <h4>Let's work together</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis consequuntur molestiae, unde obcaecati eos qui laborum ullam dicta. Modi quam ratione laborum sint fugiat illum, repellendus assumenda magnam consequuntur nobis praesentium optio voluptatum quidem reprehenderit sapiente eum eligendi a veniam atque cum iste? Nihil esse obcaecati delectus a iure accusamus.</p>
                </div>
                <div className="contact-form">
                    <form onSubmit={submitContact}>
                        <input type="text" name="name" id="name" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} required />
                        <br />
                        <input type="email" name="email" id="email" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} required />
                        <br />
                        <input type="number" name="phone" id="phone" min="0000000000" max="9999999999" placeholder="Enter Your Phone Number" onChange={(e)=>setPhone(e.target.value)} required />
                        <br />
                        <textarea name="message" id="message" cols="40" rows="10" placeholder="Enter Your Message" onChange={(e)=>setMessage(e.target.value)}></textarea>
                        <br />
                        <input type="submit" value="Submit" className="send" id='contact-button' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
