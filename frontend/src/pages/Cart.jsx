import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "./../context/ShopContext";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);
  return (
    <div className="w-[99vw] min-h-screen p-5 overflow-hidden bg-linear-to-l from-[#141414] to-[#0c2025] ">
      <div className="h-[8%] w-full text-center mt-20">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className='w-full h-[92%] flex flex-wrap gap-5'>
        {
         cartData.map((item,index)=>{
             const productData = products.find((product) => product._id === item._id);
            
             return (
              <div key={index} className='w-full h-[10%] border-t border-b  '>
                <div className='w-full h-[80%] flex items-start gap-6 bg-[#51808048]  py-2.5 px-5 rounded-2xl relative '>
                    <img className='w-[100px] h-[100px] rounded-md ' src={productData.image1} alt="product-image" />
                    <div className='flex items-start justify-center flex-col gap-2.5'>
                    <p className='md:text-[25px] text-[20px] text-[#f3f9fc]'>{productData.name}</p>
                    <div className='flex items-center   gap-5'>
                      <p className='text-[20px] text-[#aaf4e7]'>{currency} {productData.price}</p>
                      <p className='w-9 h-9 py-1 text-[16px] text-[white] 
                      bg-[#518080b4] rounded-md mt-[5px] flex items-center justify-center border border-[#9ff9f9]'>{item.size}</p>
                </div>
                </div>
                <input type="number" min={1} defaultValue={item.quantity} className=' md:mt-3 md:max-w-20 max-w-9 md:px-2 md:py-2 ml-2 py-1 px-2.5 text-[white] text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border border-[#9ff9f9] rounded-md '  onChange={(e)=> (e.target.value === ' ' || e.target.value === '0') ? null  :  updateQuantity(item._id,item.size,Number(e.target.value))} />

                <RiDeleteBin6Line  className='text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1' onClick={()=>updateQuantity(item._id,item.size,0)}/>
                </div>
 
              </div>
             )
         })
        }
      </div>
      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
            <CartTotal/>
            <button className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-2.5 px-[50px] rounded-2xl text-white flex items-center justify-center gap-5  border border-[#80808049] ml-[30px] mt-5' onClick={()=>{
                if (cartData.length > 0) {
      navigate("/placeorder");
    } else {
      console.log("Your cart is empty!");
    }
            }}>
                PROCEED TO CHECKOUT
            </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
