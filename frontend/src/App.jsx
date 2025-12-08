import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from "react-toastify";
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import Navbar from './components/Navbar'
const App = () => {
  const {userData} = useContext(userDataContext);
  
  return (
    <>
    <ToastContainer/>
    {userData && <Navbar/>}
    <Routes>
        <Route path='/' element={userData?<Home/>:<Login/>}/>
        <Route  path="/signup" element={userData?<Home/>:<Registration />}/>
        <Route path='/login' element={userData?<Home/>:<Login/>}/>
    </Routes>
    </>
  )
}

export default App