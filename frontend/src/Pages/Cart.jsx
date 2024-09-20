import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import Cart_Item from "../Components/Cart-Item/Cart_Item.jsx";
import toast from 'react-hot-toast';


const Cart = () => {
    const itemArray = [];
    const token = req.header('auth-token');
    if(!token){
        toast.error('You need to be logged in to add items to the cart', { position: 'top-right' });
        return;
    }
    try{
        const verified = jwt.verify(token, 'secret_ecom');
        const userId = verified.user.id;
        let user = userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.cartData.forEach((item)=> itemArray.push(item));
        console.log(itemArray);
    } catch(err) {
        console.error(err);
        toast.error('Failed to load the cart. Please try again.', { position: 'top-right' });
    };

    return (
        <div className='cart'>
            <section className='total'>
                <div className="total-left">
                    <h3>Total Items</h3>
                    <span id='item-no'>{itemArray.length}</span> {/* Dynamic item count */}
                </div>
                <div className="total-mid">
                    <h3>Total Cost</h3>
                    <p>₹<span id='price'>
                        {itemArray.reduce((total, item) => total + item.new_price, 0).toFixed(2)}
                    </span></p> {/* Dynamic total cost */}
                </div>
                    <Link to={`/order/${id}`} className='total-right'>
                    Order
                </Link> 
            </section>

            {
                itemArray.map((item) => (
                    <Cart_Item 
                        key={item} 
                        id={item} 
                    />
                ))
            }
        </div>
    )
}

export default Cart;
