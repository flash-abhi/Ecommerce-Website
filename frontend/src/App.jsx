import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from "react-toastify";
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import Navbar from './components/Navbar'
import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails'
const App = () => {
  const {userData} = useContext(userDataContext);
  const location = useLocation();
  return (
    <>
    <ToastContainer/>
    {userData && <Navbar/>}
    <Routes>
       <Route  path="/signup" element={userData?<Navigate to={location.state?.from || "/"}/>:<Registration />}/>
        <Route path='/login' element={userData?<Navigate to={location.state?.from || "/"}/>:<Login/>}/>
        <Route path='/' element={userData?<Home/>:<Navigate to={"/login"} state={{ from: location.pathname }}/>}/>
        <Route path='/about' element={userData?<About/>:<Navigate to={"/login"} state={{ from: location.pathname }}/>}/>
        <Route path='/collection' element={userData?<Collections/>:<Navigate to={"/login"} state={{ from: location.pathname }}/>}/>
        <Route path='/product' element={userData?<Product/>:<Navigate to={"/login"}/>} state={{ from: location.pathname }}/>
        <Route path='/contact' element={userData?<Contact/>:<Navigate to={"/login"} state={{ from: location.pathname }}/>}/>
        <Route path='/productdetail/:productId' element={userData?<ProductDetails/>:<Navigate to={"/login"} state={{ from: location.pathname }}/>}/>
        
    </Routes>
    </>
  )
}

export default App