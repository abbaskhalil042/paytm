import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
