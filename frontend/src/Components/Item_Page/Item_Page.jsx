import React from 'react'
import all_light from '../Assest/all_light';
import "./Item_Page.css"
import { Link, useParams } from 'react-router-dom';


const Item_Page = () => {
    const {id} = useParams();
    const itemId = Number(id);
    const item =all_light.find(i=> i.id===itemId);
    if(!item){
        return <p>Item not found.</p>;
    }

    const { name, catagori, image, new_price, old_price } = item;
    let describe = name + ' || ' + catagori;

    return (
        <div className='item-page'>
            <div className="item">
                <div className="image">
                    <img src={image} alt={ describe } />
                </div>
                <div className='desc'>
                    <h4>{describe}</h4>
                    <p>Price: ₹<span>{new_price}</span></p> 
                    <p className="old-price">M.R.P: {old_price}</p>
                    <Link className='addButton'>Add to Cart</Link>
                    <Link className='addButton'>Add to Cart</Link>
                </div>
            </div>
        </div>
    )
}

export default Item_Page
