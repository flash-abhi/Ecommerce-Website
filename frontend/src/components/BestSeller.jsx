import React, { useContext } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import ProductCard from './ProductCard';

const BestSeller = () => {
  let {products} = useContext(shopDataContext);
  let [bestSeller,setBestSeller] = React.useState([]);
  React.useEffect(()=> {
    let filteredProduct = products.filter((item) => item.bestSeller);
    setBestSeller(filteredProduct.slice(0,4));
  },[products]);
  return (
    <div className=''>
      <div className='h-[8%] w-full text-center mt-[50px] '>
        <Title text1={"BEST"} text2={"SELLER"}/>
        <p className='w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100'>
          Tried, Tested,Loved - Discover Our Best-Selling Favorites!
        </p>
        <div className='w-full h-[50%] mt-7 flex items-center justify-center flex-wrap gap-[50px]'>
          {
            bestSeller.map((item,index) => <ProductCard key={index} name={item.name} image={item.image1} price={item.price} id={item._id}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default BestSeller