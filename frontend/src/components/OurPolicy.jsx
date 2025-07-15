import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 tex-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <a href="https://wa.me/+33676453191" target="_blank" rel="noopener noreferrer">
          <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
          <p className='font-semibold'>Best customer support</p>
          <p className='text-gray-400'>Our manager is available 24/7</p>
        </a>
      </div>
      <div>
        <a href="https://www.instagram.com/bluebell.bouquet" target="_blank" rel="noopener noreferrer">
          <img src={assets.inst_logo} className='w-12 m-auto mb-5' alt="" />
          <p className='font-semibold'>Our Instagram</p>
          <p className='text-gray-400'>Stay up to date with all the news!</p>
        </a>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='font-semibold'>Best quality</p>
        <p className='text-gray-400'>Our quality trusted for years!</p>
      </div>
    </div>
  )
}

export default OurPolicy
