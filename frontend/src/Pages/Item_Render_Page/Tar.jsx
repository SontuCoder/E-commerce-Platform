import React from 'react'
import Item from '../../Components/Item/Item.jsx';
import all_light from '../../Components/Assest/all_light.js';

const Tar = () => {
    return (
        <div className='separate-catagori'>
        {
            all_light.filter(item => item.catagori==="Tar").map((item) => (
                <Item 
                    key={item.id} 
                    id={item.id}
                />
            ))
        }
        </div>
    )
}

export default Tar;

