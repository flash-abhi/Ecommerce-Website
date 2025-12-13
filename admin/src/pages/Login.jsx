import axios from "axios";
import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

const Login = () => {
  const primaryColor = "#6a5acd ";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  let {serverUrl} = useContext(authDataContext);
  let {adminData,setAdminData,getAdmin} = useContext(adminDataContext);
  // console.log(serverUrl);
  const handleSignIn = async (e)=> {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("started")
      const result = await axios.post(serverUrl+"/api/auth/adminlogin",{email,password},{withCredentials:true});
      getAdmin();
      toast.success("Login Successfull");
      console.log(result);
      setEmail("");
      setPassword("");
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Admin Login Failed");
      setLoading(false);
    }
  }
  
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 w-full bg-linear-to-l from-[#141414] to-[#0c2025] `}
      
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-[${borderColor}] `}
        style={{
          border: `1px solid ${borderColor}`,
        }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: `${primaryColor}` }}
        >
          Smart Cart
        </h1>
        <p className="text-gray-500 mb-6">
          Signin your account to add the New products{" "}
        </p>
        
        {/* error message */}
        <p className="text-center text-red-600 mb-4">{errorMessage}</p>

        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
            placeholder="Enter your Email "
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
            required
              type={`${!showPassword ? "password" : "text"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              style={{ border: `1px solid ${borderColor}` }}
              placeholder="Enter your Password"
              name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-3 right-3 cursor-pointer"
            >
              {showPassword ? (
                <FaRegEye className="text-[#6a5acd] text-[20px] " />
              ) : (
                <FaRegEyeSlash className="text-gray-600 text-[20px]" />
              )}
            </button>
          </div>
        </div>

        
        
        <button disabled={loading} onClick={(e)=> handleSignIn(e)} className="w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#6a5acd] text-white hover:bg-[#4938bc]">
         { loading ? <ClipLoader size={20} color="white"/>: "Sign In"}
        </button>
      </div>
    </div>
  )
}

export default Login;