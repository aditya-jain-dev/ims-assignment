import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {

    const {currency, addToCart} = useContext(ShopContext);

    return (
        <div className='text-gray-700 cursor-pointer'>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt={name} />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-medium'>{currency} {price}</p>
                <button onClick={() => addToCart(id)} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-lg px-2 py-1 text-xs me-2 mb-2">ADD TO CART</button>

            </div>
        </div>
    )
}

export default ProductItem