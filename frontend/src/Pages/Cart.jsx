import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import all_light from '../Components/Assest/all_light'; // Ensure the path is correct
import Cart_Item from "../Components/Cart-Item/Cart_Item.jsx";


const Cart = () => {
    return (
        <div className='cart'>
            <section className='total'>
                <div className="total-left">
                    <h3>Total Items</h3>
                    <span id='item-no'>{all_light.length}</span> {/* Dynamic item count */}
                </div>
                <div className="total-mid">
                    <h3>Total Cost</h3>
                    <p>₹<span id='price'>
                        {all_light.reduce((total, item) => total + item.new_price, 0).toFixed(2)}
                    </span></p> {/* Dynamic total cost */}
                </div>
                    <Link to={`/order/${3}`} className='total-right'>
                    Order
                </Link> 
            </section>

            {/* Render each item from all_light with its ID */}
            {
                all_light.map((item) => (
                    <Cart_Item 
                        key={item.id} 
                        id={item.id} // Pass only the product ID
                    />
                ))
            }
        </div>
    )
}

export default Cart;
