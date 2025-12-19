import React, { useContext, useState } from 'react'
import { LiaOpencart } from "react-icons/lia";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { MdCollectionsBookmark } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { IoSearchCircle, IoSearchCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import logo from "../assets/logo.png"
import { authDataContext } from '../context/authContext';
import { toast } from 'react-toastify';
import { shopDataContext } from '../context/ShopContext';
const Navbar = () => {
    const navigate= useNavigate();
    let {userData,getCurrentUser} = useContext(userDataContext);
    // let [showSearch,setShowSearch] = useState(false);
    let [showProfile,setShowProfile] = useState(false);
    let {serverUrl} = useContext(authDataContext);
    let {showSearch,setShowSearch,search,setSearch,getCartCount}= useContext(shopDataContext)
    // handle Logout 
    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl+"/api/auth/logout",{withCredentials:true});
            toast.success("Logout Successfull !!");
            getCurrentUser();
            navigate("/login");
            setShowProfile(false)
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-screen h-[70px] bg-[#b3cdcdec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>
        <div onClick={() => navigate("/")} className='w-[250px] flex items-center justify-start gap-2.5 cursor-pointer'>
            <img src={logo} className='w-10 h-10 text-[#000000c9]'/>
            <span className='text-3xl font-semibold text-[#000000c9]'>SmartCart</span>
        </div>
        <div className='w-[40%] hidden lg:flex'>
            <ul className='flex items-center justify-center gap-[19px] text-[#faf1f1]'>
                <li className='tex-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl'onClick={() => navigate("/")}>HOME</li>
                <li className='tex-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl' onClick={() => navigate("/collection")}>COLLECTIONS</li>
                <li className='tex-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl'onClick={()=> navigate("/about")}>ABOUT</li>
                <li className='tex-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl' onClick={() => navigate("/contact")}>CONTACT</li>
            </ul>
        </div>
        <div className='w-[30%] flex items-center justify-end gap-5'>
            {showSearch ?<IoSearchCircle onClick={() => {setShowSearch(prev => !prev); navigate("collection")}} className='w-[38px] h-[38px] text-[#000000] cursor-pointer'/>:<IoSearchCircleOutline onClick={() => {setShowSearch(prev => !prev);navigate("/collection")}} className='w-[38px] h-[38px] text-[#000000] cursor-pointer'/>}
            {!userData ?<FaCircleUser onClick={() => setShowProfile(prev => !prev)  } className='w-[38px] h-[38px] text-[#000000] cursor-pointer' />: <div onClick={() => setShowProfile(prev => !prev)  } className='w-10 h-10 rounded-full bg-[#080808] text-white text-xl cursor-pointer flex items-center justify-center'>{userData?.user?.name?.slice(0,1)}</div> }

            <MdShoppingCart onClick={() => navigate("/cart")} className='w-[38px] h-[38px] text-[#000000] hidden md:block cursor-pointer' />
            <p className='absolute hidden md:block w-[18px] h-[18px] items-center  justify-center bg-black px-[5px] py-0.5 text-[#f7e8e8] rounded-full text-[9px] top-2.5 right-[23px]'>{getCartCount()}</p>
        </div>
        {showSearch && <div className='w-full h-20 bg-[#d8f6f9dd] absolute top-full left-0 right-0 flex items-center justify-center'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search Here' type="text" className='lg:w-[50%] w-[90%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px]'/>
        </div>}
        {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
            <ul className='w-full h-full flex items-start justify-around flex-col text-[17px] py-2.5 text-white'>
                {!userData && <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer' onClick={()=>{ navigate("/login");setShowProfile(false)}}>Login</li>}
                {userData && <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer' onClick={handleLogout}>Logout</li>}
                <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer'>Orders</li>
                <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer'onClick={() => {navigate("/about");setShowProfile(false);}}>About</li>
            </ul>
        </div>}
        <div className='w-full h-[90px] flex items-center justify-between px-5 fixed bottom-0 left-0 bg-[#b3cdcdec] lg:hidden'>
            <button className='text-[#000000c9] flex items-center justify-center flex-col gap-0.5 cursor-pointer text-md' onClick={() => navigate("/")}><IoMdHome className="w-7  h-7 text-[#000000c9] lg:hidden" onClick={() => navigate("/")}/>Home</button>
            <button className='text-[#000000c9] flex items-center justify-center flex-col gap-0.5 cursor-pointer text-md'><MdCollectionsBookmark className="w-7  h-7 text-[#000000c9] lg:hidden"onClick={() => navigate("/collection")}/>Collections</button>
            <button className='text-[#000000c9] flex items-center justify-center flex-col gap-0.5 cursor-pointer text-md'><RiContactsFill className="w-7  h-7 text-[#000000c9] lg:hidden" onClick={()=> navigate("/contact")}/>Contact</button>
            <button onClick={() => navigate("/cart")} className='text-[#000000c9] flex items-center justify-center flex-col gap-0.5 cursor-pointer text-md'><MdShoppingCart className="w-7  h-7 text-[#000000c9] lg:hidden"/>Cart</button>
            <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-0.2 text-black font-semibold rounded-full text-[9px] top-2 right-[18px]'>{getCartCount()}</p>
        </div>
    </div>
  )
}

export default Navbar
