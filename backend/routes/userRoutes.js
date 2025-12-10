import express from "express";
import { getAdmin, getCurrentUser } from "../controller/userController.js";
import isAuth from './../middleware/isAuth.js';
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.get("/current",isAuth,getCurrentUser);
userRouter.get("/getadmin",adminAuth,getAdmin);
export default userRouter;