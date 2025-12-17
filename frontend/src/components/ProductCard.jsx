import React, { useContext } from 'react'
import { shopDataContext } from './../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({name,image,id,price}) => {
    let {currency}= useContext(shopDataContext);
    let navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/productdetail/${id}`)} className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-2.5 cursor-pointer border border-[#80808049]'>
        <img src={image} className='w-full h-[80%] rounded-sm object-cover' alt="" />
        <div className='text-[#c3f6fa] text-[18px] py-2.5'>{name}</div>
        <div className='text-[#f3fafa] text-[14px]'>{currency}{price}</div>
    </div>
  )
}

export default ProductCard