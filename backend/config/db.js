import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DATABASE CONNECTED");
    }catch(err){
        console.log("DB ERROR");
    }
}

export default connectDB;