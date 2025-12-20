import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { ClipLoader } from "react-spinners";
import CartTotal from "../components/CartTotal";
import razorpay from "../assets/Razorpay.jpg";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/authContext";
import { shopDataContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  let [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const initPay = (order) => {
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency : order.currency,
        name: "Order Payment",
        description: "Online payment mode using Razorpay",
        order_id : order.id,
        receipt: order.receipt,
        handler: async (response) =>{
            console.log(response)
            const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
            if(data){
                navigate("/order");
                setCartItem({});
            }
        }
    }
    const rzp = new window.Razorpay(options)
    rzp.open();
  }
  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
    //   console.log("order placing")
      switch (method) {
        case "cod":
            console.log("fetching");
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            toast.success("Order Placed");
            setLoading(false);
            navigate("/order");
          } else {
            console.log(result.data.message);
            toast.error("Order Placed Error");
            setLoading(false);
          }
          break;
        case "razorpay":
          const resultRazorpay = await axios.post(
            serverUrl + "/api/order/razorpay",
            orderData,
            { withCredentials: true }
          );
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data);
            toast.success("Order Placed");
            setLoading(false);
          }
          break;
        default:
          break;
      }
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen py-20 bg-linear-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px]  relative">
      <div className="lg:w-[50%] w-full h-full flex items-center justify-center  lg:mt-0 mt-[90px]">
        <form onSubmit={onSubmitHandler}  className="lg:w-[70%] w-[95%] lg:h-[70%] h-full">
          <div className="py-2.5">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="First name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-5 shadow-sm shadow-[#343434]"
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />

            <input
              type="text"
              placeholder="Last name"
              className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-2.5">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[50px] rounded-md  bg-slate-700 placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Street"
              className="w-full h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />
            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="pinCode"
              value={formData.pinCode}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
            />
          </div>
          <div className="w-full h-[70px] flex items-center justify-between px-2.5">
            <input
              type="text"
              placeholder="Phone"
              className="w-full h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-5"
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
            />
          </div>
          <div>
            <button
              type="submit"
              className="mx-20 md:mx-0 text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-2.5 px-[50px] rounded-2xl text-white flex items-center justify-center gap-5 absolute md:right-[10%] lg:right-[20%] md:bottom-[15%] bottom-[10%] lg:bottom-[5%]   border border-[#80808049] mt-5"
            >
              {loading ? <ClipLoader size={22} color="white" /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-[50%] w-full min-h-full flex items-center justify-center gap-[30px] ">
        <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-full  flex items-center justify-center gap-2.5 flex-col">
          <CartTotal />
          <div className="py-2.5">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="w-full h-[30vh] lg:h-[100px] flex items-start mt-5 lg:mt-0 justify-center gap-[50px]">
            <button
              onClick={() => setMethod("razorpay")}
              className={`w-[150px] h-[50px] rounded-sm  ${
                method === "razorpay"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
              }`}
            >
              {" "}
              <img
                src={razorpay}
                className="w-full h-full object-fill rounded-sm "
                alt=""
              />
            </button>
            <button
              onClick={() => setMethod("cod")}
              className={`w-[200px] h-[50px] bg-linear-to-t from-[#95b3f8] to-[white] text-[14px] px-5 rounded-sm text-[#332f6f] font-bold ${
                method === "cod"
                  ? "border-[5px] border-blue-900 rounded-sm"
                  : ""
              }`}
            >
              CASH ON DELIVERY{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
