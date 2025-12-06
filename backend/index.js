import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT;
  
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());  

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.send("Hello from server");
});
 


app.listen(port, () => {
    connectDB();
    console.log("Server starting at port", port);
});
