import React from 'react'
import NavBar from '../component/NavBar'
import SideBar from '../component/SideBar'

const Home = () => {
  return (
    <div className='w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white relative '>
      <NavBar/>
      <SideBar/>
    </div>
  )
}

export default Home