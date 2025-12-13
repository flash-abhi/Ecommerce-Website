import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png";
import { authDataContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { adminDataContext } from '../context/AdminContext';
import axios from 'axios';
const NavBar = () => {
  const navigate = useNavigate();
  const {serverUrl} = useContext(authDataContext);
  const {getAdmin} = useContext(adminDataContext);
  const logout = async (e) =>{
    e.preventDefault();
    try {
      const result = await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true});
      console.log(result.data);
      toast.success("logout successfull !!");
      getAdmin();
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error("logout failed !!");
    }
  }
  return (
    <div className='w-screen h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black'>
        <div className='w-[30%] flex items-center justify-start gap-2.5 cursor-pointer ' onClick={() => navigate("/")}>
            <img src={logo} className='w-[30px]' alt="logo" />
            <h1 className='text-[25px] text-black font-sans'>SmartCart</h1>
        </div>
        <button onClick={(e)=>logout(e)} className='text-[15px] hover:border border-[#89daea] cursor-pointer bg-[#000000ca] py-2.5 px-5 rounded-2xl text-white'>
              Logout
        </button>
    </div>
  )
}

export default NavBar