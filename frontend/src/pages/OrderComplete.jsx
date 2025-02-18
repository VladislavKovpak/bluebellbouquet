import React, { useContext, useEffect } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const OrderComplete = () => {
  const { cartItems, updateQuantity } = useContext(ShopContext);

  useEffect(() => {
    // Reset all cart items to 0 when the order is complete
    Object.keys(cartItems).forEach((itemId) => {
      updateQuantity(itemId, 0);
    });
  }, [cartItems, updateQuantity]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'ORDER'} text2={'PLACED'} />
      </div>
      <p className="font-semibold text-xl text-gray-600 mt-5">
             Thank you for your order! 
      </p>
      <p className="font-semibold text-xl text-gray-600 mt-5">
             Our manager will contact you soon!
      </p>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} />
      </div>
    </div>
  );
};

export default OrderComplete;
