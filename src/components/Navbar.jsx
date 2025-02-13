import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const { getCartCount } = useContext(ShopContext);

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to={'/'}>
                <h1 className='text-3xl text-gray-700'>IMS</h1>
            </Link>

            <Link to={'/'} className='flex flex-col items-center text-sm text-gray-700'>
                <p>PRODUCTS</p>
            </Link>

            <div className='flex items-center gap-6'>
                <Link to={'/admin'} className='text-sm border-2 py-2 px-4 text-gray-700 hover:bg-gray-50'>
                    <p>ADMIN</p>
                </Link>

                <Link to={'/cart'} className='relative'>
                    <img src={assets.cart_icon} alt="cart_icon" className='w-5 min-w-5 cursor-pointer' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px] aspect-square'>{getCartCount()}</p>
                </Link>
            </div>

        </div>
    )
}

export default Navbar