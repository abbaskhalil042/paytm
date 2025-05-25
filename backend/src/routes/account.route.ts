import express from "express";
import { auth } from "../middleware/auth";
import { getBalance, transfer } from "../controller/account.controller";

const accountRouter = express.Router();

accountRouter.get("/balance", auth, getBalance);
accountRouter.get("/transfer", auth, transfer);

export default accountRouter;
