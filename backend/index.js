import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();
const port = process.env.PORT;
//   console.log(port);
const app = express();

app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());  

app.use("/api/auth", authRoutes);
app.use("/api/user/",userRouter);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/order",orderRoutes);
app.get("/", (req, res) => {
    res.send("Hello from server");
});
 


app.listen(port, () => {
    connectDB();
    console.log("Server starting at port", port); 
});
