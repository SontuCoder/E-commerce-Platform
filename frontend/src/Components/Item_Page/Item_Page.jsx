import React from 'react';
import all_light from '../Assest/all_light';
import "./Item_Page.css";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Item_Page = () => {
    const { id } = useParams();
    const itemId = Number(id);
    const item = all_light.find(i => i.id === itemId);
    const navigate = useNavigate();

    if (!item) {
        return <p>Item not found.</p>;
    }

    const addToCart = () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            toast.error('You need to be logged in to add items to the cart', { position: 'top-right' });
            return;
        }
        axios.post('http://localhost:4000/addtocart', { itemId: id }, {
            headers: { 'auth-token': token }
        })
        .then(response => {
            if (response.data.success) {
                toast.success('Item added to cart successfully!', { position: 'top-right' });
                window.location.reload();
            } else {
                toast.error(response.data.message, { position: 'top-right' });
            }
        })
        .catch(err => {
            console.error(err);
            toast.error('Failed to add item to cart. Please try again.', { position: 'top-right' });
        });
    };

    const handleOrder = () => {
        const orderItem = { id: itemId, quantity: 1 };
        localStorage.setItem('orderItem', JSON.stringify(orderItem));
        navigate('/order');
    };    

    const { name, catagori, image, new_price, old_price } = item;
    const describe = `${name} || ${catagori}`;

    return (
        <div className='item-page'>
            <div className="one-items">
                <div className="image">
                    <img src={image} alt={describe} />
                </div>
                <div className='descr'>
                    <h4>{describe}</h4>
                    <p>Price: ₹<span>{new_price}</span></p>
                    <p className="old-price">M.R.P: {old_price}</p>
                    <div className="button">
                        <button className='addCart' onClick={addToCart}>Add to Cart</button>
                        <button className='addCart' onClick={handleOrder}>Order</button>                  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item_Page;
