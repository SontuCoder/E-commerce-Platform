import React from 'react';
import Item from '../../Components/Item/Item.jsx';
import all_light from '../../Components/Assest/all_light.js';
import { useParams } from 'react-router-dom';

const Bulb = () => {
    const { catagori } = useParams(); // Get the category parameter from the URL

    // Filter the items based on category
    const filteredItems = all_light.filter(item => item.catagori === catagori);

    return (
        <div className='separate-catagori' style={{ paddingTop: '20px', height: '100%', backgroundImage: 'linear-gradient(#1A574D, #D9D9D9)', paddingBottom: '20px' }}>
            {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                    <Item key={item.id} id={item.id} />
                ))
            ) : (
                <p>No items found for this category.</p>
            )}
        </div>
    );
};

export default Bulb;
