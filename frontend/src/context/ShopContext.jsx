import { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { userDataContext } from './UserContext';
import { toast } from 'react-toastify';
export const shopDataContext = createContext();
const ShopContext = ({children}) => {

    let [products,setProducts]=useState([]);
    let [search,setSearch]=useState("");
    let {userData} = useContext(userDataContext);
    let [showSearch,setShowSearch] = useState(false);
    let {serverUrl} = useContext(authDataContext);
    let [cartItem,setCartItem] = useState({})
    let currency = "₹"
    let delivery_fee = 40;
    const getProducts = async () => {
      try {
        let result = await axios.get(serverUrl+"/api/product/list",{withCredentials:true});
        console.log(result.data);
        setProducts(result.data.products);
      } catch (error) {
        console.log(error);
      }
    }
    const addToCart = async (itemId, size) => {
      try {
        if(!size){
          alert("Please select a size");
          return;
        }
        // console.log(cartItem);
        let cartData = structuredClone(cartItem);
        if(cartData[itemId]){
          if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
          }else{
            cartData[itemId][size] = 1;
          }
        }else{
          cartData[itemId] = {};
          cartData[itemId][size] = 1;
        }
        setCartItem(cartData);
        // console.log(cartData);

        if(userData) {
          try {
           const result = await axios.post(serverUrl+"/api/cart/add",{itemId,size},{withCredentials:true});
            console.log(result);
            toast.success("Item added to cart");
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getUserCart = async () => {
      try {
        const result = await axios.post(serverUrl+"/api/cart/get",{},{withCredentials:true});
        setCartItem(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    }

    const getCartCount = () => {
      let count = 0;
      for(let itemId in cartItem){
        for(let size in cartItem[itemId]){
          count += cartItem[itemId][size];
        }
      }
      return count;
  }
  const updateQuantity = async (itemId,size,quantity)=>{
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    
    try {
      if(userData){
      await axios.post(serverUrl+"/api/cart/update",{itemId,size,quantity},{withCredentials:true});

    }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const getCartAmount = () => {
  let totalAmount = 0;

  for (const items in cartItem) {
    const itemInfo = products.find(
      (product) => product._id === items
    );

    if (!itemInfo) continue;

    for (const size in cartItem[items]) {
      if (cartItem[items][size] > 0) {
        totalAmount += itemInfo.price * cartItem[items][size];
      }
    }
  }

  return totalAmount;
};

    useEffect(() => {
      getUserCart();
    },[])
    useEffect(() =>{
      getProducts();
    },[])


    let value={
      products,
      currency,
      delivery_fee,
      search,
      setSearch,
      showSearch,
      setShowSearch,
      getProducts,
      cartItem,
      setCartItem,
      addToCart,
      getCartCount,
      updateQuantity,
      getCartAmount
    }
  return (
    <shopDataContext.Provider value={value}>
        {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext
