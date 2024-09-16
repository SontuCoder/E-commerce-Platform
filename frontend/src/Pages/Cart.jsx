import React from 'react';
import {Link} from 'react-router-dom'
import './Cart.css';
import Neo1 from "../Components/Assest/neon light/n3.jpeg";


const Cart = () => {
    return (
        <div>
            <section className='total'>
                <div className="total-left">
                    <h3>Total Items</h3>
                    <span id='item-no'>2</span>
                </div>
                <div className="total-mid">
                    <h3>Total Cost</h3>
                    <p>₹<span id='price'>234.99</span></p>
                </div>
                <Link className='total-right'>
                    Order
                </Link>
            </section>
            <section className='cart-list'>
                <div className="item">
                    <Link>
                    <img src={Neo1} alt="" />
                    </Link>
                    <div className="decs">
                        <h4>Neon Led Light</h4>
                        <p>Qty: <span>1</span></p>
                    </div>
                    <Link className='deleteButton'>Delete from Cart</Link>
                </div>
            </section>
        </div>
    )
}

export default Cart;
