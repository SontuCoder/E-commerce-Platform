import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import all_light from '../Components/Assest/all_light';
import './Order.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


const Order = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const navigate = useNavigate();
    const storedOrderCart = localStorage.getItem('orderCart');
    const storedOrderItem = localStorage.getItem('orderItem');

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.name); // Assuming the token has a 'name' field
            } catch (error) {
                console.error("Token decoding failed:", error);
                toast.error('Failed to retrieve user information.', { position: 'top-right' });
            }
        } else {
            toast.error('You need to be logged in to place an order.', { position: 'top-right' });
            navigate('/login'); // Redirect to login if not logged in
        }

        let parsedOrderItems = [];

        if (storedOrderCart) {
            const cartItems = JSON.parse(storedOrderCart);
            parsedOrderItems = cartItems.map(orderItem => {
                const storeItem = all_light.find(storeItem => storeItem.id === orderItem.id);
                return storeItem ? { ...storeItem, quantity: orderItem.quantity } : null;
            }).filter(item => item !== null);
        } else if (storedOrderItem) {
            const singleOrderItem = JSON.parse(storedOrderItem);
            const storeItem = all_light.find(storeItem => storeItem.id === singleOrderItem.id);
            if (storeItem) {
                parsedOrderItems = [{ ...storeItem, quantity: singleOrderItem.quantity }];
            }
        }

        if (parsedOrderItems.length > 0) {
            setOrderItems(parsedOrderItems);
        } else {
            toast.error('No valid items found for ordering.', { position: 'top-right' });
            navigate('/cart');
        }
    }, [storedOrderCart, storedOrderItem, navigate]);

    const handleSubmitOrder = async (event) => {
        event.preventDefault();

        const items = orderItems.map(item => ({
            itemId: item.id,
            quantity: item.quantity,
        }));

        try {
            const response = await axios.post('http://localhost:4000/orderbook', {
                items,
                userName,
                name,
                email,
                mobile,
                address,
                landmark
            });
            if (response.data.success) {
                await axios.post('http://localhost:4000/deleteallcart', {
                    email,
                    mobile,
                });

                localStorage.removeItem('orderCart');
                localStorage.removeItem('orderItem');
                toast.success('Order placed successfully!', { position: 'top-right' });
                navigate('/');
            } else {
                toast.error(response.data.message, { position: 'top-right' });
            }
        } catch (error) {
            console.error("Order submission error:", error);
            toast.error('Failed to place the order. Please try again.', { position: 'top-right' });
        }
    };

    if (orderItems.length === 0) {
        return <p>Loading order details...</p>;
    }

    return (
        <div className='order-page'>
            <form className="order-form" onSubmit={handleSubmitOrder}>
                <h2>Order Form</h2>
                <hr />
                {orderItems.map(item => (
                    <h3 key={item.id}>
                        {`${item.name} - ${item.category} - Qty: ${item.quantity}`}
                    </h3>
                ))}
                <hr />
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Enter Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="number">Phone:</label>
                <input
                    type="tel"
                    name="number"
                    id="number"
                    placeholder='Enter Your Phone Number'
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="address">Address:</label>
                <textarea
                    name="address"
                    id="address"
                    required
                    placeholder='Enter Your Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>

                <label htmlFor="landmark">Landmark:</label>
                <input
                    type="text"
                    id='landmark'
                    name='landmark'
                    placeholder='Enter Your Landmark'
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    required
                />

                <button type="submit" className='order'>Place Order</button>
                <Link className='cancel' to={'/'}>Cancel</Link>
            </form>
        </div>
    );
}

export default Order;
