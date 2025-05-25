import express from "express";

const userRouter = express.Router();

userRouter.post("/register");
userRouter.post("/login");

export default userRouter;
