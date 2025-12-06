import express from "express";
import { login, logout, Register } from "../controller/authController.js";

const authRoutes = express.Router();

authRoutes.post("/registration",Register);
authRoutes.post("/login",login);
authRoutes.get("/logout",logout);

export default authRoutes;