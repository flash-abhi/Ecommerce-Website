import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../components/RelatedProduct";

const ProductDetails = () => {
  let { productId } = useParams();
  let { products, currency } = useContext(shopDataContext);
  let [productData, setProductData] = React.useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");
  // console.log(products);
  const fetchProductData = async () => {
    try {
      products?.map((item) => {
        if (item._id == productId) {
          console.log("item", item);
          setProductData(item);
          setImage(item.image1);
          setImage1(item.image1);
          setImage2(item.image2);
          setImage3(item.image3);
          setImage4(item.image4);
          return null;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [products, productId]);
  return productData ? (
    <div>
      <div className=" w-[99vw] pt-10 h-[130vh] md:h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-5">
        <div className="lg:w-[50vw] md:w-[90vw] lg:h-[90vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-2.5 gap-[30px] flex-col-reverse lg:flex-row">
          <div className="lg:w-[20%] md:w-[80%] h-[35%] lg:h-[80%] flex items-center md:py-4 md:px-0 px-10 justify-start gap-10 lg:gap-4 lg:flex-col flex-wrap ">
            <div className="md:w-[100px]  w-16 h-16 md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md">
              <img
                onClick={() => setImage(image1)}
                src={image1}
                className="w-full h-full cursor-pointer rounded-md"
                alt="product-image"
              />
            </div>
            <div className="md:w-[100px]  w-16 h-16 md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md">
              <img
                onClick={() => setImage(image2)}
                src={image2}
                className="w-full h-full cursor-pointer rounded-md"
                alt="product-image"
              />
            </div>
            <div className="md:w-[100px]  w-16 h-16 md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md">
              <img
                onClick={() => setImage(image3)}
                src={image3}
                className="w-full h-full cursor-pointer rounded-md"
                alt="product-image"
              />
            </div>
            <div className="md:w-[100px]  w-16 h-16 md:h-[110px] bg-slate-300 border border-[#80808049] rounded-md">
              <img
                onClick={() => setImage(image4)}
                src={image4}
                className="w-full h-full cursor-pointer rounded-md"
                alt="product-image"
              />
            </div>
          </div>
          <div className="lg:w-[60%] md:w-[40%] w-[80%] lg:h-[78%] h-[70%] border border-[#80808049] rounded-md  overflow-hidden">
            <img
              src={image}
              alt=""
              className=" w-full lg:h-full h-full text-[30px] text-white  text-center rounded-md object-cover "
            />
          </div>
        </div>
        <div className="lg:w-[50vw] w-screen lg:h-[75vh] h-[40vh] lg:mt-20 flex items-start justify-start flex-col py-5 px-[30px] md:pb-5 md:pl-5 lg:pl-0 lg:px-0 lg:py-0 gap-2.5">
          <h1 className="text-[40px] font-semibold text-[aliceblue]">
            {productData.name.toUpperCase()}
          </h1>
          <div className="flex items-center gap-1 ">
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStar className="text-[20px] fill-[#FFD700]" />
            <FaStarHalfAlt className="text-[20px] fill-[#FFD700]" />
            <p className="text-[18px] font-semibold pl-[5px] text-[white]">
              ({Math.floor(Math.random()*100)})
            </p>
          </div>
          <p className="text-[30px] font-semibold pl-[5px] text-[white]">
            {currency} {productData.price}
          </p>
          <p className=" w-[80%] md:w-[60%] text-[20px] font-semibold pl-[5px] text-[white]">
            {productData.description} and Stylish, breathable cotton shirt with
            a modern slim fit. Easy to wash, super comfortable, and designed for
            effortless style.
          </p>
          <div className="flex flex-col gap-2.5 my-2.5 ">
            <p className="text-[25px] font-semibold pl-[5px] text-[white]">
              Select Size
            </p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 bg-slate-300 rounded-md 
                  ${
                    item === size ? "bg-black text-[#2f97f1] text-[20px]" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-2.5 px-5 rounded-2xl mt-2.5 border border-[#80808049] text-white shadow-md shadow-black"
            >
              {"Add to Cart"}
            </button>
          </div>
           <div className='w-[90%] h-px bg-slate-700'></div>
            <div className='w-[80%] text-[16px] text-white '>
                <p>100% Original Product.</p>
                <p>Cash on delivery is available on this product</p>
                <p>East return and exchange policy within 7 days</p>
            </div>
        </div>
      </div>
      <div className='w-full md:py-50 lg:py-0 py-30 min-h-[70vh] bg-linear-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col  overflow-x-hidden'>

    <div className='flex px-5  mt-[90px] lg:ml-20 ml-0  lg:mt-0  '>

     <p className='border px-5 py-3 text-sm text-white'>
       Description
      </p>
      <p className='border px-5 py-3 text-sm text-white'>
       Reviews (124)
      </p>
     </div>

     <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397c] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-2.5 md:px-[30px] lg:ml-[100px] ml-5'>
        <p className='w-[95%] h-[90%] flex items-center justify-center '>
      Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on SmartCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.</p>
     </div>

     <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
        </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default ProductDetails;
