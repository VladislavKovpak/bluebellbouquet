import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 break-words'>
          <p>
            Bluebell bouquet is a place where the best flowers are lovingly selected for you, important events are decorated and the client’s wishes are always taken into account✨ We are proud of our ability to deliver the best flowers to you in one of the most beautiful cities in the world. Every day we work hard to ensure that our floral arrangements meet the highest standards
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY SHOULD YOU CHOOSE OUR SERVICE'} />
      </div>
      <div className="flex flex-col md:flex-row justify-center text-sm mb-20 gap-6">

        <div className="border px-6 sm:px-10 md:px-12 py-8 flex-1 max-w-[395px] flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600 break-words">
            We carefully select each flower from different suppliers several times a week to ensure that your bouquet contains the freshest and most presentable flowers
          </p>
        </div>

        <div className="border px-6 sm:px-10 md:px-12 py-8 flex-1 max-w-[395px] flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600 break-words">
            Our assortment includes both seasonal and non-seasonal varieties. Whether you are looking for a bouquet for a special date or just an everyday compliment for a loved one, we have something to offer you for any scenario.
          </p>
        </div>

        <div className="border px-6 sm:px-10 md:px-12 py-8 flex-1 max-w-[395px] flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600 break-words">
            Every day we work hard to ensure that our floral arrangements meet the highest standards
            We create the bouquets we dream of ourselves!
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
