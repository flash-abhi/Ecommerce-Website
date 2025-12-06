import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs"
import { genToken } from "../config/token.js";
export const  Register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message: "User already exist !"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Enter valid Email !"})
        }
        if(password.length < 8){
            return res.status(400).json({message: "Enter Strong password (8 characters)"})
        }
        let hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashPassword});
        let token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 7*24*60*60*1000
        });
        res.status(200).json(user);
    } catch (error) {
        console.log("signup error !!");
        return res.status(500).json({message:`Register error : ${error}`})
    }
}
export const login = async(req,res) =>{
    try {
        let {email,password}  = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        let isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Incorrect Password"});
        }
        let token = genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure: false,
            sameSite: "Strict",
            maxAge: 7*24*60*60*1000
        });
        res.status(200).json({message: "Login Successfull",user});
    } catch (error) {
        console.log("Login Error !!");
        res.status(500).json({message:`Login Error : ${error}`});
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "Logout Successfull !!"});
    } catch (error) {
         console.log("Logout Error !!");
        res.status(500).json({message:`Logout Error : ${error}`});
    }
}