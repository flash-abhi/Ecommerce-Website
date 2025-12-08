import express from "express";
import { googleLogin, login, logout, Register } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration",Register);
authRoutes.post("/login",login);
authRoutes.get("/logout",logout);
authRoutes.post("/googlelogin",googleLogin);
export default authRoutes;