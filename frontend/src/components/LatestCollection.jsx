import React, { useContext, useEffect } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext';
import ProductCard from './ProductCard';

const LatestCollection = () => {
  let {products} = useContext(shopDataContext);
  let [latestProduct,setLatestProduct] = React.useState([]);
  useEffect(( )=> {
    setLatestProduct(products.slice(0,8));
  },[products]);
  return (
    <div>
      <div className='h-[8%] w-full text-center md:mt-[50px]'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100'>Step Into Syle - New Collections Dropping This Season!</p>
      </div>
      <div className='w-full h-[50%] mt-7 flex items-center justify-center flex-wrap gap-[50px]'>
        {latestProduct.map((product,index)=> <ProductCard name={product.name} image={product.image1} id={product._id} price={product.price} key={index}/>)}
      </div>
    </div>
  )
}

export default LatestCollection