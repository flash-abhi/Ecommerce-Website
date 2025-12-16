import { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext';
import axios from 'axios';
export const shopDataContext = createContext();
const ShopContext = ({children}) => {

    let [products,setProducts]=useState([]);
    let [search,setSearch]=useState("");
    let [showSearch,setShowSearch] = useState(false);
    let {serverUrl} = useContext(authDataContext);
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
      getProducts
    }
  return (
    <shopDataContext.Provider value={value}>
        {children}
    </shopDataContext.Provider>
  )
}

export default ShopContext