import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Cart_Item from "../Components/Cart-Item/Cart_Item.jsx";
import toast from 'react-hot-toast';
import axios from 'axios';
import all_light from '../Components/Assest/all_light.js';


const Cart = () => {
    const [itemArray, setItemArray] = useState([]); 
    const [cartItems, setCartItems] = useState([]); 
    const [totalCost, setTotalCost] = useState(0);  
    const navigate = useNavigate();                

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('auth-token'); 
            if (!token) {
                toast.error('You need to be logged in to view your cart', { position: 'top-right' });
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/cartlist', {
                    headers: {
                        'auth-token': token
                    }
                });

                if (response.data.success) {
                    const cartItemIds = response.data.cart; // Assuming this returns an array of item IDs
                    setItemArray(cartItemIds); 
                } else {
                    toast.error(response.data.message, { position: 'top-right' });
                }
            } catch (err) {
                console.error(err);
                toast.error('Failed to load the cart. Please try again.', { position: 'top-right' });
            }
        };
        fetchCart();
    }, []); 

    useEffect(() => {
        const groupItemsById = (itemIds) => {
            const groupedItems = {};
            itemIds.forEach(id => {
                if (groupedItems[id]) {
                    groupedItems[id].quantity += 1; 
                } else {
                    const itemDetails = all_light.find(item => item.id === id);
                    if (itemDetails) {
                        groupedItems[id] = { ...itemDetails, quantity: 1 };
                    }
                }
            });
            return Object.values(groupedItems); 
        };
        
        if (itemArray.length > 0) {
            const groupedItems = groupItemsById(itemArray);
            setCartItems(groupedItems);
            const total = groupedItems.reduce((acc, item) => acc + (item.new_price * item.quantity), 0);
            setTotalCost(total);
        }
    }, [itemArray]);

    const handleOrder = () => {
        const itemIds = cartItems.map(item => ({
            id: item.id, 
            quantity: item.quantity
        }));
        if (itemIds.length > 0) {
            localStorage.setItem('orderCart', JSON.stringify(itemIds));
            navigate('/order'); 
        } else {
            toast.error('No items in the cart to order.', { position: 'top-right' });
        }
    };

    return (
        <div className='cart'>
            <section className='total'>
                <div className="total-left">
                    <h3>Total Items</h3>
                    <span id='item-no'>{itemArray.length}</span>
                </div>
                <div className="total-mid">
                    <h3>Total Cost</h3>
                    <p>₹<span id='price'>
                        {totalCost.toFixed(2)}
                    </span></p> 
                </div>
                {cartItems.length > 0 && (
                    <button 
                        onClick={handleOrder} 
                        className='total-right'
                    >
                        Order All
                    </button>
                )}
            </section>

            {
                cartItems.map((item) => (
                    <Cart_Item 
                        key={item.id} 
                        id={item.id} 
                        qty={item.quantity} 
                    />
                ))
            }
        </div>
    )
}

export default Cart;
