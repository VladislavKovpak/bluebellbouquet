import React from 'react'
import {assets} from '../assets/assets'
import {NavLink} from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className = 'mb-5 w-32'alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
              Bringing joy and beauty to every moment with our fresh, handcrafted flowers.
            </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>Communication</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <a href="https://www.instagram.com/bluebell.bouquet" target="_blank" rel="noopener noreferrer">
                <li>Instagram</li>
                </a>
                <a href="https://wa.me/+33676453191" target="_blank" rel="noopener noreferrer">
                <li>WhatsApp</li>
                </a>
                <li>bluebellbouquett@gmail.com</li>
            </ul>
        </div>
        
      </div>
      <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 bluebellbouquet.com - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
