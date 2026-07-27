import dotenv from "dotenv";
import connectDB from "./config/database";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/products", productRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Backend Server Running ");
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});