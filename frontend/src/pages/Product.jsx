import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from './../components/BestSeller';

const Product = () => {
  return (
    <div className='w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-5 '>
      <div className='w-full min-h-[70px] flex items-center justify-center gap-2.5 flex-col'>
          <LatestCollection/>
      </div>
      <div className='w-full min-h-[70px] flex items-center justify-center gap-2.5 flex-col'>
          <BestSeller/>
      </div>
    </div>
  )
}

export default Product