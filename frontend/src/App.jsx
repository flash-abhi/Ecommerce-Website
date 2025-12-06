import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from "react-toastify";
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route  path="/signup" element={<Registration />}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App