import React from 'react';
import './Order.css';
import { useParams } from 'react-router-dom';
import all_light from '../Components/Assest/all_light';



const Order = () => {
    const {id} = useParams();
    const orderId = Number(id);
    const item = all_light.find(item=> item.id===orderId);
    if(!item){
        return <p>Item id not fatch or Item not found in Store.</p>
    }
    return (
        <div>
            <div className="order-form">
                <h2>Order Form</h2>
                <hr />
                <label htmlFor="name">Name:</label>
                <input type="text" name="Name" id="name" placeholder='Enter Your Name' />
                <label htmlFor="number">Phone:</label>
                <input type="number" name="Number" id="number" placeholder='Enter Your Phone Number' />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder='Enter Your Email' />
                <button type="submit" id='order'>Order</button>
            </div>
        </div>
    )
}

export default Order
