import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import Account from "../model/account.model";
import mongoose from "mongoose";

export const getBalance = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const balance = await Account.findOne({
      userId: req.id as string,
    });
    res.status(200).json({
      message: "Balance fetched successfully",
      balance: balance,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message }); // ✅ This works if nothing is overriding `Number`
  }
};

export const transfer = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const session = await mongoose.startSession(); //^ new for me
    session.startTransaction(); //^ transaction starts here
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.id }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      res.status(404).json({ message: "insufficient balance" });
      return;
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      res.status(400).json({
        message: "Invalid account",
      });
      return;
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.id as string },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    return;
  }
};
