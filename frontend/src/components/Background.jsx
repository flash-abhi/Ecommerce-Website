import React from 'react'
import banner1 from "../assets/back1.jpg";
import banner2 from "../assets/back2.jpg";
import banner3 from "../assets/back3.jpg";
import banner4 from "../assets/back4.jpg";
const Background = ({heroCount}) => {
  
    if(heroCount === 0){
        return <img src={banner2} alt="" className='w-full h-full float-left overflow-auto object-cover' />
    }else if(heroCount === 1){
        return <img src={banner3} alt="" className='w-full h-full float-left overflow-auto object-cover' />

    }
}

export default Background