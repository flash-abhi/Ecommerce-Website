import { useContext, useState } from 'react'
import NavBar from "../component/NavBar"
import SideBar from '../component/SideBar'
import upload from '../assets/upload.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners';
const AddProduct = () => {
  const [loading,setLoading] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("Men");
  const [subCategory,setSubCategory] = useState("Topwear");
  const [price,setPrice] = useState("");
  const [sizes,setSizes] = useState([]);
  const [bestSeller,setBestSeller] = useState(false);
  const {serverUrl} = useContext(authDataContext);
  const handleAddProduct = async(e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      if(!image1 || !image2 || !image3 || !image4){
        toast.error("Please upload all 4 images");
        setLoading(false);
        return;
      }
      if(sizes.length === 0){
        toast.error("Please select at least one size");
        setLoading(false);
        return;
      }
      if(!name || !description || !category || !subCategory || !price){
        toast.error("Please fill all the details");
        setLoading(false);
        return;
      }
      let formData = new FormData();
      formData.append("image1",image1);
      formData.append("image2",image2);
      formData.append("image3",image3);
      formData.append("image4",image4);
      formData.append("name",name);
      formData.append("description",description);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("price",price);
      formData.append("sizes",JSON.stringify(sizes));
      formData.append("bestSeller",bestSeller);
      const result = await axios.post(serverUrl+"/api/product/addproduct",formData,{withCredentials:true});
      console.log(result.data);
      if(result.data){
        setName("");
        setBestSeller(false);
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
      }
      toast.success("Product Added Successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Product Not Added");
      setLoading(false);
    }
  }
  return (
    <div className='w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative' >
        <NavBar/>
        <SideBar/>

        <div className='w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute right-0'>
            <form onSubmit={(e) => handleAddProduct(e)} className=' w-full md:w-[90%] h-full mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]'>
              <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white'>Add Product Page</div>
              <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-5 gap-2.5'>
                <p className='text-5 md:text-[25px] font-semibold'>Upload Images</p>
                <div className='w-full h-full flex items-center justify-start'>
                    <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                      <img src={!image1?upload: URL.createObjectURL(image1)} alt="upload-Image-1" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-0.5'/>
                      <input type="file" id="image1" className='hidden' onChange={(e)=>setImage1(e.target.files[0])}/>
                    </label>
                    <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                      <img src={!image2?upload: URL.createObjectURL(image2)} alt="upload-Image-2" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-0.5'/>
                      <input type="file" id="image2" className='hidden' onChange={(e)=>setImage2(e.target.files[0])}/>
                    </label>
                    <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                      <img src={!image3?upload: URL.createObjectURL(image3)} alt="upload-Image-3" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-0.5'/>
                      <input type="file" id="image3" className='hidden' onChange={(e)=>setImage3(e.target.files[0])}/>
                    </label>
                    <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'>
                      <img src={!image4?upload: URL.createObjectURL(image4)} alt="upload-Image-1" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-0.5'/>
                      <input type="file" id="image4" className='hidden' onChange={(e)=>setImage4(e.target.files[0])}/>
                    </label>
                </div>
              </div>
              <div className='w-[80%] h-full flex items-start justify-center flex-col gap-2.5'>
                <p className='text-[20px] md:text-[25px] font-semibold'>
                  Product Name
                </p>
                <input onChange={(e)=> setName(e.target.value)} value={name} required type="text" placeholder='Type here' className='w-[600px] max-w-[98%] h-10 rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]'/>
              </div>
              <div className='w-[80%]  flex items-start justify-center flex-col gap-2.5'>
                <p className='text-[20px] md:text-[25px] font-semibold'>
                  Product Description
                </p>
                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Type here' className='w-[600px] max-w-[98%] py-2.5 h-[100px] rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]'/>
              </div>
              <div className='w-[80%] flex items-center gap-2.5 flex-wrap'>
                <div className='md:w-[30%] w-full flex items-start sm:justify-center flex-col gap-2.5'>
                  <p className='text-[20px] md:text-[25px] font-semibold w-full'>
                    Product Category
                  </p>
                  <select name='' onChange={(e) => setCategory(e.target.value)} id='' className='bg-slate-600 w-[60%] px-2.5 py-2 rounded-lg hover:border-[#46d1f7] border-2'>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div className='md:w-[30%] w-full flex items-start sm:justify-center flex-col gap-2.5 '>
                  <p className='text-[20px] md:text-[25px] font-semibold w-full'>
                    Sub-Category
                  </p>
                  <select name='' onChange={(e) => setSubCategory(e.target.value)} id='' className='bg-slate-600 w-[60%] px-2.5 py-2 rounded-lg hover:border-[#46d1f7] border-2'>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>
              </div>
              <div className='w-[80%] h-full flex items-start justify-center flex-col gap-2.5'>
                <p className='text-[20px] md:text-[25px] font-semibold'>
                  Product Price
                </p>
                <input required type="number" onChange={(e)=> setPrice(e.target.value)} placeholder='₹ 2000' className='w-[600px] max-w-[98%] h-10 rounded-lg hover:border-[#46d1f7] border-2 cursor-pointer bg-slate-600 px-5 text-[18px] placeholder:text-[#ffffffc2]'/>
              </div>
              <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-2.5 py-2.5 my-4 md:py-0'>
                <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
                <div className='flex items-center justify-start gap-4 flex-wrap'>
                  <div onClick={() => setSizes(prev => prev.includes("S") ?prev.filter(item => item != "S"):[...prev,"S"])} className={`px-5 py-2 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("S")? "bg-green-400 text-black border-[#46d1f7]":""}`}>S</div>
                  <div onClick={() => setSizes(prev => prev.includes("M") ?prev.filter(item => item != "M"):[...prev,"M"])} className={`px-5 py-2 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("M")? "bg-green-400 text-black border-[#46d1f7]":""}`}>M</div>
                  <div onClick={() => setSizes(prev => prev.includes("L") ?prev.filter(item => item != "L"):[...prev,"L"])} className={`px-5 py-2 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("L")? "bg-green-400 text-black border-[#46d1f7]":""}`}>L</div>
                  <div onClick={() => setSizes(prev => prev.includes("XL") ?prev.filter(item => item != "XL"):[...prev,"XL"])} className={`px-5 py-2 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("XL")? "bg-green-400 text-black border-[#46d1f7]":""}`}>XL</div>
                  <div onClick={() => setSizes(prev => prev.includes("XXL") ?prev.filter(item => item != "XXL"):[...prev,"XXL"])} className={`px-5 py-2 rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-2 cursor-pointer ${sizes.includes("XXL")? "bg-green-400 text-black border-[#46d1f7]":""}`}>XXL</div>
                </div>
              </div>
              <div className='w-[80%] flex items-center justify-start gap-2.5 mt-2.5'>
                <input onChange={()=> setBestSeller(prev=> !prev)} type="checkbox" className='w-[25px] h-[25px] cursor-pointer'/>
                <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold'>Add to BestSeller</label>
              </div>
              <div>
                <button className='mb-5  text-[16px] font-semibold w-[140px] px-5 py-5 rounded-xl bg-[#65d8f7] flex items-center justify-center gap-2.5 text-black active:bg-slate-700 active:text-white active:border-2 border-white '>
                {loading ? <ClipLoader size={22} color='blue'/>:"Add Product"}
              </button>
              </div>

            </form>
        </div>
    </div>
  )
}

export default AddProduct