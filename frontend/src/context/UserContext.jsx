import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext';
export const userDataContext = createContext();
function UserContext({children}) {
    let [userData,setUserData] = useState("");
    let {serverUrl} = useContext(authDataContext);
    const getCurrentUser = async ()=>{
        try {
            const result = await axios.get(serverUrl+"/api/user/current",{withCredentials:true});
            setUserData(result.data);
            console.log(result.data);
        } catch (error) {
            setUserData(null);
            console.log(error);
        }
    }
    useEffect(() => {
        getCurrentUser(); 
    },[])
     let value = {
        userData,setUserData,getCurrentUser
    }
  return (
    <userDataContext.Provider value={value}>
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext