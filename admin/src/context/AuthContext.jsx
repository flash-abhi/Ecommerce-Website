import { createContext } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = "https://ecommerce-backend-tqf1.onrender.com";

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
