import React from 'react'
import { FaCircle } from 'react-icons/fa6'

const Hero = ({heroData,heroCount,setHeroCount}) => {
  return (
    <div className='w-[40%] h-full relative'>
        <div className='absolute text-[#88d9ee]  text-[22px] md:text-[35px] lg:text-[55px] md:left-[10%] md:top-[90px] lg:top-[130px] left-[10%] top-20'>
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>
        </div>
        <div className='absolute md:top-[350px] lg:top-[600px] top-70 left-[10%] flex items-center justify-center gap-2.5'>
            <FaCircle className={`w-3.5 ${heroCount === 0 ? "fill-orange-400":"fill-white"} cursor-pointer`} onClick={() => setHeroCount(0)}/>
            <FaCircle className={`w-3.5 ${heroCount === 1 ? "fill-orange-400":"fill-white"} cursor-pointer`} onClick={() => setHeroCount(1)}/>
        </div>
    </div>
  )
}

export default Hero