import React from 'react';
import { Link } from 'react-router-dom';
import './Cart_Item.css';
import all_light from '../Assest/all_light'; 

const Cart_Item = ({ id }) => {
    const item = all_light.find(light => light.id === id);

    if (!item) {
        return <p>Item not found</p>; 
    }

    const { name, catagori, image, new_price, old_price } = item;
    let describe = name + ' || ' + catagori;
    let qty=1;
    return (
        <div>
            <section className='cart-list'>
                <div className="item">
                    <Link> 
                        <img src={image} alt={name} />
                    </Link>
                    <div className="decs">
                        <h4>{describe}</h4>
                        <p>Qty:{qty}</p>
                        <p>Price: ₹<span>{new_price}</span></p> 
                        <p className="old-price">M.R.P: {old_price}</p>
                    </div>
                    <Link className='deleteButton'>Delete from Cart</Link>
                </div>
            </section>
        </div>
    )
}

export default Cart_Item;
