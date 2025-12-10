import { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";
import { authDataContext } from "../context/authContext";
import  axios  from 'axios';
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { userDataContext } from "../context/UserContext";

const Registration = () => {
  const primaryColor = "#6a5acd ";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [loading2,setLoading2] = useState(false);
  const {serverUrl} = useContext(authDataContext);
  const {getCurrentUser} = useContext(userDataContext);
  // handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const result = await axios.post(serverUrl+"/api/auth/registration",{
            name:fullName,
            email,
            password
        },{withCredentials: true});
        console.log(result);
        setEmail('');
        setPassword('');
        setFullName("");
        setLoading(false);
        getCurrentUser();
        toast.success("Sign Up Successfull !!");
        navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error("Signup Failed");
        setLoading(false);
    }
  }

  // google signup 
  const googleSignup = async (e)=>{
    setLoading2(true);
    e.preventDefault();
    try {
      const response = await signInWithPopup(auth,provider);
      // console.log(response);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(serverUrl+"/api/auth/googlelogin",{email,name},{withCredentials:true});
      console.log(result.data);
      setLoading2(false);
      getCurrentUser();
      toast.success("Signup Successfull !!");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading2(false);
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
          Create your account to get started with Awesome item ordering{" "}
        </p>
        
        {/* error message */}
        <p className="text-center text-red-600 mb-4">{errorMessage}</p>

        {/* fullName */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            placeholder="Enter your Full Name"
            name="fullName"
            required
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>
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

        
        
        <button disabled={loading} onClick={(e) =>handleSignup(e)} className="w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer bg-[#6a5acd] text-white hover:bg-[#4938bc]">
         { loading ? <ClipLoader className="w-10 h-10 " size={20} color="white"/>: "Sign Up"}
        </button>
        <button onClick={(e)=>googleSignup(e)}  className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-200 cursor-pointer">
          {loading2 ? <ClipLoader size={20} color="black"/>:<div className='flex items-center justify-center gap-3'><FcGoogle size={20} />
            <span>Sign Up with Google</span></div>}
        </button>
        <p className="text-center text-gray-700 mt-4">
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#6a5acd] font-semibold cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
