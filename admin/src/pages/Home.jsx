import React from 'react'
import NavBar from '../component/NavBar'
import SideBar from '../component/SideBar'
import { useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import { useContext } from 'react'
import axios from "axios";
import { useEffect } from 'react'

const Home = () => {
    const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  
  const { serverUrl } = useContext(authDataContext)

 const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {} ,{withCredentials:true});
      console.log(products);
      setTotalProducts(products.data.products.length);

      const orders = await axios.post(`${serverUrl}/api/order/list`, {} ,{withCredentials:true})
      setTotalOrders(orders.data.length)
    } catch (err) {
      console.error("Failed to fetch counts", err)
    }
  }

   useEffect(() => {
    fetchCounts()
  }, [])
  return (
    <div className='w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white relative '>
      <NavBar/>
      <SideBar/>
      <div className='w-[70vw] h-screen absolute left-[25%] flex items-Start justify-start flex-col  gap-10 py-[100px]'>
         <h1 className='text-[35px] text-[#afe2f2]'>OneCart Admin Panel</h1>
         <div className='flex items-center justify-start gap-[50px] flex-col md:flex-row'>
          <div  className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-5 rounded-lg shadow-sm shadow-black backdrop:blur-lg  md:text-[25px] text-[20px] border border-[#969595]'>Total No. of Products : <span className='px-5 py-2.5 bg-[#030e11] rounded-lg flex items-center justify-center border border-[#969595]'>{totalProducts}</span></div>
          <div  className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-5 rounded-lg shadow-sm shadow-black backdrop:blur-lg  md:text-[25px] text-[20px] border border-[#969595]'>Total No. of Orderss : <span className='px-5 py-2.5 bg-[#030e11] rounded-lg flex items-center justify-center border border-[#969595]'>{totalOrders}</span></div>

         </div>
       </div>
    </div>
  )
}

export default Home