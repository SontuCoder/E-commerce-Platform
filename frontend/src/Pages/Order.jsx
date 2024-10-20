import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import all_light from '../Components/Assest/all_light';
import './Order.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const Order = () => {
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();
    const storedOrderCart = localStorage.getItem('orderCart');
    const storedOrderItem = localStorage.getItem('orderItem');

    useEffect(() => {

        let parsedOrderItems = [];

        if (storedOrderCart) {
            const cartItems = JSON.parse(storedOrderCart);
            parsedOrderItems = cartItems.map(orderItem => {
                const storeItem = all_light.find(storeItem => storeItem.id === orderItem.id);
                return storeItem ? { ...storeItem, quantity: orderItem.quantity } : null;
            }).filter(item => item !== null);
        }
        else if (storedOrderItem) {
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
    }, [storedOrderCart, storedOrderItem,navigate]);

    if (orderItems.length === 0) {
        return <p>Loading order details...</p>;
    }

    const handleSubmitOrder = (event) => {
        event.preventDefault();
        if (storedOrderItem) {
            toast.success('Order placed successfully!', { position: 'top-right' });
            localStorage.removeItem('orderItem');
        } else if (storedOrderCart) {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                toast.error('You need to be logged in to add items to the cart', { position: 'top-right' });
                return;
            }
            axios.post('http://localhost:4000/deleteallcart',{}, {
                headers: { 'auth-token': token }
            })
                .then(response => {
                    if (response.data.success) {
                        localStorage.removeItem('orderCart');
                        window.location.reload();
                        toast.success('Order placed successfully!', { position: 'top-right' });
                    } else {
                        toast.error(response.data.message, { position: 'top-right' });
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Failed to add item to cart. Please try again.', { position: 'top-right' });
                });
        }
        navigate('/');
    };

    return (
        <div className='order-page'>
            <form className="order-form" onSubmit={handleSubmitOrder}>
                <h2>Order Form</h2>
                <hr />
                {orderItems.map(item => (
                    <h3 key={item.id}>
                        {`${item.name} - ${item.catagori} - Qty: ${item.quantity}`}
                    </h3>
                ))}
                <hr />
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Enter Your Name'
                    required
                />

                <label htmlFor="number">Phone:</label>
                <input
                    type="tel"
                    name="number"
                    id="number"
                    placeholder='Enter Your Phone Number'
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter Your Email'
                    required
                />

                <label htmlFor="address">Address:</label>
                <textarea
                    name="address"
                    id="address"
                    required
                    placeholder='Enter Your Address'
                ></textarea>

                <label htmlFor="landmark">Landmark:</label>
                <input
                    type="text"
                    id='landmark'
                    name='landmark'
                    placeholder='Enter Your Landmark'
                    required
                />

                <button type="submit" className='order'>Place Order</button>
                <Link className='cancel' to={'/'}>Cancel</Link>
            </form>
        </div>
    );
}

export default Order;
