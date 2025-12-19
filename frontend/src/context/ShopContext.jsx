import { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext';
import axios from 'axios';
export const shopDataContext = createContext();
const ShopContext = ({children}) => {

    let [products,setProducts]=useState([]);
    let [search,setSearch]=useState("");
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
      } catch (error) {
        console.log(error)
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
      getCartCount
    }
  return (
    <shopDataContext.Provider value={value}>
        {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext