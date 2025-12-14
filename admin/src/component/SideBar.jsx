import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[18%] min-h-screen border-r py-[60px] fixed left-0 top-0 '>
      <div className='flex flex-col gap-4 pt-10 pl-[2%] text-[15px]'>
        <div onClick={() => navigate("/add")} className='flex flex-items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
            <IoAddCircleOutline className='w-7 h-7 md:w-6 md:h-6'/>
            <p className='hidden md:block'>Add items </p>
        </div>
        <div onClick={() => navigate("/lists")} className='flex flex-items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
            <FaListUl  className='w-6 h-6 md:w-5 md:h-5'/>
            <p className='hidden md:block'>List items </p>
        </div>
        <div onClick={() => navigate("/orders")} className=' flex flex-items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]'>
            <SiTicktick className='w-6 h-6 md:w-5 md:h-5'/>
            <p className='hidden  md:block'>View orders </p>
        </div>
      </div>
    </div>
  )
}

export default SideBar