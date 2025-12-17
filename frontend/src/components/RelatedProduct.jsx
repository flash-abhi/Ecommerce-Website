import React, { useContext, useEffect } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title';
import ProductCard from './ProductCard';

const RelatedProduct = ({category,subCategory,currentProductId}) => {
    let {products} = useContext(shopDataContext);
    let [related,setRelated] = React.useState([]);
    useEffect(() => {
        if(products.length>0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => item.category === category);
            productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);
            productsCopy = productsCopy.filter((item) => item._id !== currentProductId);
            setRelated(productsCopy.slice(0,4));
        }
    },[products,category,subCategory,currentProductId])
  return (
    <div className='my-[100px] md:my-10  md:px-[60px] '>
        <div className='ml-5 lg:ml-10'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='w-full lg:ml-5 ml-10  mt-[30px] flex items-center justify-start flex-wrap  gap-[50px]'>
            {
                related.map((item,index)=>(
                    <ProductCard key={index} id={item._id} name={item.name } price={item.price} image={item.image1} />
                ))
            }
        </div>
      
    </div>
  )
}

export default RelatedProduct