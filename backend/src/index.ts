import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRouter from "./routes/user.route";
import accountRouter from "./routes/account.route";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("api/v1/users", userRouter);
app.use("api/v1/account", accountRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
