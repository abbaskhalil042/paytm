import express from "express";
import {
  getAlluser,
  login,
  register,
  update,
} from "../controller/user.controller";
import { auth } from "../middleware/auth";

const userRouter = express.Router();
// /api/v1/user/all-user
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/update", auth, update);
userRouter.get("/all-user", auth, getAlluser);

export default userRouter;
