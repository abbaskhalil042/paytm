import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { success } = userSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    return;
  }
};

//? login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { success } = userSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    return;
  }
};
