import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import Cart_Item from "../Components/Cart-Item/Cart_Item.jsx";
import toast from 'react-hot-toast';
import axios from 'axios';

const Cart = () => {
    const [itemArray, setItemArray] = useState([]); 
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
                    const cartItems = response.data.cart;
                    setItemArray(cartItems); 
                    
                    const total = cartItems.reduce((total, item) => total + item.new_price, 0);
                    setTotalCost(total); 
                    
                    toast.success("Cart items loaded successfully", { position: 'top-right' });
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

    const groupItemsById = (itemIds) => {
        const groupedItems = {};
        itemIds.forEach(id => {
            if (groupedItems[id]) {
                groupedItems[id].quantity += 1;
            } else {
                groupedItems[id] = { _id: id, quantity: 1 }; 
            }
        });
        return Object.values(groupedItems); 
    };
    
    const groupedItems = groupItemsById(itemArray);
    console.log("Grouped Items: ", groupedItems);

    const handleOrder = () => {
        const itemIds = groupedItems.map(item => ({
            id: item.id, 
            quantity: item.quantity
        }));
        if (itemIds.length > 0) {
            navigate('/order', { state: { itemIds } }); 
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
                {groupedItems.length > 0 && (
                    <button 
                        onClick={handleOrder} 
                        className='total-right'
                    >
                        Order All
                    </button>
                )}
            </section>

            {
                groupedItems.map((item) => (
                    <Cart_Item 
                        key={item.id} 
                        id={item._id} 
                        qty={item.quantity} 
                    />
                ))
            }
        </div>
    )
}

export default Cart;
