import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const Orders = () => {
  const { orders, products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orders.map((order, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700'>
              <p className='mb-2'>Order Date: <span className='text-gray-400'>{new Date(order.date).toLocaleDateString()}</span></p>
              {
                Object.keys(order.items).map((itemId, idx) => {
                  const product = products.find((product) => product._id === itemId);
                  return (
                    <div key={idx} className='flex items-start gap-6 text-sm mb-4'>
                      <img className='w-16 sm:w-20' src={product.image[0]} alt="image" />
                      <div>
                        <p className='sm:text-base font-medium'>{product.name}</p>
                        <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                          <p className='text-lg'>{currency} {product.price}</p>
                          <p>Quantity: {order.items[itemId]}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders