import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import Login from './pages/Login';
import { adminDataContext } from './context/AdminContext';
import { ToastContainer } from 'react-toastify';

const App = () => {
  let {adminData} = useContext(adminDataContext);
  // console.log("hello",adminData)
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/add' element={<AddProduct/>}/>
      <Route path='/lists' element={<Lists/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/login' element={!adminData? <Login/>: <Home/>}/>
    </Routes>
    </>
  )
}

export default App;