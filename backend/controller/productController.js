import { uploadOnCloudinary } from "../config/cloudinary.js";
import Product from "../model/productModel.js";
export const addProduct = async (req,res )=>{
    try {
        let {name,description,category,subCategory,price,sizes,bestSeller} = req.body;
        const image1 = await uploadOnCloudinary(req.files.image1[0].path);
        const image2 = await uploadOnCloudinary(req.files.image2[0].path);
        const image3 = await uploadOnCloudinary(req.files.image3[0].path);
        const image4 = await uploadOnCloudinary(req.files.image4[0].path);
        const productData = {
            name,
            description,
            category,
            subCategory,
            price:Number(price),
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === 'true' ? true : false,
            image1,
            image2,
            image3,
            image4,
            date: Date.now()
        } 
        const product = await Product.create(productData);
        res.status(200).json({message: "Product added successfully", product});
    } catch (error) {
        console.log("Add Product Error: ",error);
        res.status(500).json({message: `Add Product Error : ${error}`});
    }
};

