import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-8 border-t'> {/* было pt-10 */}
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} />
        
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Contacts</p>
          <p className='text-gray-500'>  
            <a href="https://www.instagram.com/bluebell.bouquet">Instagram</a> <br/> 
            <a href="https://wa.me/+33676453191">WhatsApp</a> <br/>
            Email: bluebellbouquett@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact

