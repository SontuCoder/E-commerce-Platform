import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';
import all_light from '../Assest/all_light'; // Import the array of products

const Item = ({ id }) => {
    // Find the item with the corresponding ID
    const item = all_light.find(light => light.id === id);

    if (!item) {
        return <p>Item not found</p>; // Handle case where the item doesn't exist
    }

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
                        <Link className='addButton'>Add to Cart</Link>
                        <Link className='addButton'>Order Now</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Item;
