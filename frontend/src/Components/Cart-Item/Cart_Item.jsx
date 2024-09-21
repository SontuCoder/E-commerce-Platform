import React from 'react';
import { Link } from 'react-router-dom';
import './Cart_Item.css';
import all_light from '../Assest/all_light';
import toast from 'react-hot-toast';
import axios from 'axios';

const Cart_Item = ({ id, qty }) => {
    const item = all_light.find(light => light.id === id);
    if (!item) {
        return <p className="error-message">Item not found for ID: {id}</p>;
    }

    const { name, catagori, image, new_price, old_price } = item;
    const description = `${name} || ${catagori}`;

    const handleDelete = () => {
        axios.post("http://localhost:4000/deleteitemcart",{id},{header : 'auth-token'}).then(response=>{
            if(response.success){
                toast.success(`Item with ID ${id} deleted from cart.`, { position: 'top-right' });
            } else {
                toast.error(response.message,{position:'top-right'});
            }
        }).catch(err=>{
            console.error(err);
            toast.error('An error occurred, please try again.', { position: 'top-right' });
        });
    };

    return (
        <div>
            <section className='cart-list'>
                <div className="item">
                    <Link to={`/product/${id}`}> 
                        <img src={image} alt={name} />
                    </Link>
                    <div className="decs">
                        <h4>{description}</h4>
                        <p>Qty: {qty}</p>
                        <p>Price: ₹<span>{new_price}</span></p>
                        <p className="old-price">M.R.P: {old_price}</p>
                    </div>
                    <button className='deleteButton' onClick={handleDelete}>
                        Delete from Cart
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Cart_Item;
