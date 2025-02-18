import React from 'react'
import { assets } from '../assets/assets';  

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-3xl md:text-3xl'>FLOWER DELIVERY</p>
            </div>
            <h1 className = 'prata-regular text-xl sm:py-3 lg:text-2xl leading-relaxed'>We are happy to be a part of your unforgettable moments</h1>
            <div className='flex items-center gap-2'>
                <p className='font-medium text-3xl md:text-3xl'>NICE CANNES MONACO</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>
        </div>
      </div>
       <img className='w-full sm:w-1/2' src={assets.home_img}/>
    </div>
  )
}

export default Hero
