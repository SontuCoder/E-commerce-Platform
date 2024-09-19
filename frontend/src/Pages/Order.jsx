import React from 'react';
import './Order.css';
import { useParams,Link } from 'react-router-dom';
import all_light from '../Components/Assest/all_light';



const Order = () => {
    const {id} = useParams();
    const orderId = Number(id);
    const item = all_light.find(item=> item.id===orderId);
    if(!item){
        return <p>Item id not fatch or Item not found in Store.</p>
    }
    return (
        <div className='order-page'>
                <form action="#" className="order-form">
                <h2>Order Form</h2>
                <hr />
                <label htmlFor="name">Name:</label>
                <input type="text" name="Name" id="name" placeholder='Enter Your Name'  required
                />
                <label htmlFor="number">Phone:</label>
                <input type="number" name="Number" id="number" placeholder='Enter Your Phone Number' required
                />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder='Enter Your Email'  required
                />
                <label htmlFor="address">Address:</label>
                <textarea name="address" id="address" required placeholder='Enter Your Address'
                ></textarea>
                <label htmlFor="landmark">Landmark:</label>
                <input type="text" id='landmark' name='landmark' placeholder='Enter Your Landmark'  required
                />
                <button type="submit" className='order'>Order</button>
                <Link className='cancel'  to={'/'}>Cancel</Link>
                </form>
        </div>
    )
}

export default Order
