import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Item.css';
import axios from 'axios';
import all_light from '../Assest/all_light'; 
import toast from 'react-hot-toast';

const Item = ({ id }) => {
    const navigate = useNavigate();
    const item = all_light.find(item => item.id === id);
    if (!item) {
        return <p>Item not found</p>; 
    }
    const addToCart = () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            toast.error('You need to be logged in to add items to the cart', { position: 'top-right' });
            return;
        }
        axios.post('http://localhost:4000/addtocart', {
            itemId: id
        }, {
            headers: {
                'auth-token': token
            }
        })
        .then(response => {
            if (response.data.success) {
                toast.success('Item added to cart successfully!', { position: 'top-right' });
                // window.location.reload();
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
        const orderItem = { id: id, quantity: 1 };
        localStorage.setItem('orderItem', JSON.stringify(orderItem));
        navigate('/order');
    }; 

    const { name, catagori, image, new_price, old_price } = item;
    let describe = name + ' || ' + catagori;
    return (
        <div>
            <section className='cart-list'>
                <div className="item">
                    <Link to={`/item_page/${id}`}> 
                        <img src={image} alt={name} />
                    </Link>
                    <div className="decs">
                        <h4>{describe}</h4>
                        <p>Price: ₹<span>{new_price}</span></p> 
                        <p className="old-price">M.R.P: {old_price}</p>
                    </div>
                    <div className="item-button">
                        <button className='addcartButton' onClick={addToCart}>Add to Cart</button>
                        <button className='addcartButton' onClick={handleOrder}>Order</button>                  
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Item;
