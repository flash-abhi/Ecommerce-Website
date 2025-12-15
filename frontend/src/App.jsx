import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
const App = () => {
  const {userData} = useContext(userDataContext);

  return (
    <>
    <ToastContainer/>
    {userData && <Navbar/>}
    <Routes>
       <Route  path="/signup" element={userData?<Navigate to={location.state?.from || "/"}/>:<Registration />}/>
        <Route path='/login' element={userData?<Navigate to={location.state?.from || "/"}/>:<Login/>}/>
        <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>}/>
        <Route path='/about' element={userData?<About/>:<Navigate to={"/login"}/>}/>
        <Route path='/collection' element={userData?<Collections/>:<Navigate to={"/login"}/>}/>
        <Route path='/product' element={userData?<Product/>:<Navigate to={"/login"}/>}/>
        <Route path='/contact' element={userData?<Contact/>:<Navigate to={"/login"}/>}/>
        
    </Routes>
    </>
  )
}

export default App