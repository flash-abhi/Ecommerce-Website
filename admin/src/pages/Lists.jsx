import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../component/SideBar';
import NavBar from '../component/NavBar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Lists = () => {
  const [list,setList]= useState([]);
  const{serverUrl} = useContext(authDataContext); 
  const fetchLists = async() => {
    try {
      let result = await axios.get(serverUrl+"/api/product/list",{withCredentials:true});
      setList(result.data.products);
      console.log(result.data.products);
    } catch (error) {
      console.log(error);
    }
  }
  const removeList = async(productId) => {
    try {
      let result = await axios.post(serverUrl+`/api/product/remove/${productId}`,{}, {withCredentials:true});
      if(result.data){
        fetchLists();
        toast.success("Product Removed Successfully");
      }else{console.log(toast.success("Failed to Remove the product"))}
    } catch (error) {
      console.log(error);
      toast.error("Failed to Remove the product");
    }
  }
  useEffect(()=>{
    fetchLists();
  },[])
  return (
    <div className='w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white'>
      <div className='w-full h-full flex items-center justify-start'>
        <NavBar/>
        <SideBar/>
        <div className='w-[82%] h-full lg:ml-80 md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>
          <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-5 text-white'>All Listed Products</div>
          {
            list?.length>0  ?(
              list.map((item,index) => (
                <div key={index} className='w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[5px] md:gap-7 p-2.5 md:px-7'>
                    <img src={item.image1} className='w-[30%] md:w-[120px] h-[90%] rounded-lg' alt="image" />
                    <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-0.2'>
                      <div className='w-full md:text-[20px] text-[15px] text-[#bef0f3] '>
                        {item.name}
                      </div>
                      <div className='md:text-[17px] text-[15px] text-[#bef3da]'>{item.category}</div>
                      <div className='md:text-[17px] text-[15px] text-[#bef3da]'>₹{item.price}</div>
                    </div>
                    <div className='w-[10%] h-full bg-transparent flex items-center justify-center'>
                      <span onClick={() => removeList(item._id)} className='w-[35px] h-[30%] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300'>X</span>
                    </div>
                </div>
              ))
            ) :(
              <div className='text-white text-lg'>No Products available.</div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Lists