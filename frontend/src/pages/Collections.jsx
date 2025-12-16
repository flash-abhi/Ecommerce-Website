import React, { useContext, useEffect } from 'react'
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import Title from '../components/Title';
import { shopDataContext } from './../context/ShopContext';
import ProductCard from './../components/ProductCard';

const Collections = () => {
  const {products,search,showSearch,} = useContext(shopDataContext);

  const [filterProduct,setFilterProduct] = React.useState(products);
  const [category,setCategory] = React.useState([]);
  const [subCategory,setSubCategory] = React.useState([]);
  const [showFilter,setShowFilter] = React.useState(false);
  const [sortType,setSortType] = React.useState("relavent");
  const toggleCategory = async(e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setCategory(prev => [...prev,e.target.value]);
    }
  }
  const toggleSubCategory = async(e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setSubCategory(prev => [...prev,e.target.value]);
    }
  }
  const applyFilters = () => {
    let productCopy = [...products];
    if(showSearch && search){
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(category.length>0){
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    
    if(subCategory.length>0){
      productCopy = productCopy.filter(item => category.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  }
  const sortProducts = () => {
    let fpCopy = [ ...filterProduct];
    switch(sortType){
      case "Low-High":
        setFilterProduct(fpCopy.sort((a,b) => a.price - b.price));
        break;
      case "High-Low":
        setFilterProduct(fpCopy.sort((a,b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  }
  useEffect(() =>{
    sortProducts();
  },[sortType])
  useEffect(() => {
    setFilterProduct(products);
  },[products]);
  useEffect(() => {
    applyFilters();
  },[category,subCategory,search,showSearch])
  return (
    <div className='w-full min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden z-2 pb-[100px]'>
      <div className={`md:w-[30vw] ${showFilter ? "h-[60vh]":"h-[8vh]"} lg:w-[20vw] w-screen md:min-h-screen p-5 border-r border-gray-400 text-[#aaf5fa] lg:fixed`}>
        <p onClick={()=> setShowFilter(prev => !prev)} className='text-[25px] cursor-pointer font-semibold flex gap-[5px] items-center justify-start'>
          FILTERS {!showFilter?<FaCaretRight className='text-[18px] md:hidden'/>:<FaCaretDown className='text-[18px] md:hidden'/>}
        </p>
        <div className={`border-2 w-[80%] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "":"hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa] '>CATEGORIES</p>
          <div className='w-[230px] h-[100px] flex items-start justify-center gap-2 flex-col'>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'><input onChange={(e) => toggleCategory(e)} id='' value={"Men"} className='w-3' type='checkbox'/>Men</p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'><input onChange={(e) => toggleCategory(e)} id='' value={"Women"} className='w-3' type='checkbox'/>Women</p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'><input onChange={(e) => toggleCategory(e)} id='' value={"Kids"} className='w-3' type='checkbox'/>Kids</p>
          </div>
        </div>
       <div className={`border-2 w-[80%] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilter ? "":"hidden"} md:block`}>
          <p className='text-[18px] text-[#f8fafa] '>SUB-CATEGORIES</p>
          <div className='w-[230px] h-[100px] flex items-start justify-center gap-2 flex-col'>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'><input onChange={(e) => toggleSubCategory(e)} id='' value={"Topwear"} className='w-3' type='checkbox'/>Topwear</p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'><input onChange={(e) => toggleSubCategory(e)} id='' value={"Bottomwear"} className='w-3' type='checkbox'/>Bottomwear</p>
            <p className='flex items-center justify-center gap-2.5 text-[16px] font-light'><input onChange={(e)=> toggleSubCategory(e)} id='' value={"Winterwear"} className='w-3' type='checkbox'/>Winterwear</p>
          </div>
        </div>
      </div>
      <div className='lg:pl-[20%] md:py-2.5'>
        <div className='md:w-[80vw] w-screen p-5 flex justify-between flex-col lg:flex-row lg:px-[50px] '>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
          <select onChange={(e) => setSortType(e.target.value)} name="" id="" className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-2.5 text-white rounded-lg hover:border-[#46d1f7] border-2'>
            <option value="relavent" className='w-full h-full'>Sort By : Relavant</option>
            <option value="Low-High" className='w-full h-full'>Sort By : Low to High</option>
            <option value="High-Low" className='w-full h-full'>Sort By : High to Low</option>
          </select>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-screen min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'> 
          {
            filterProduct?.map((item,index) => (
              <ProductCard key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collections