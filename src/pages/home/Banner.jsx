import React from 'react'
import bannerImg from '../../assets/books/banner.png'
const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
      <div className='md:w-1/2 w-full flex items-center md:justify-end '>
        <img src={bannerImg} alt="" />
      </div>
      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-meduim mb-7'>New releases this week</h1>
        <p className='mb-10'>Books are the quietest and most constant of friends <br /> they are the most accessible and wisest of counselors,<br />and the most patient of teachers. They are no doubt a great additional luxury, <br /> but to many they are a necessity.” - Garrison Keillor</p>
        <button className='btn-primary'>Subscribe</button>
      </div>

      
    </div>
  )
}

export default Banner
