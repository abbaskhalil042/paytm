import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model";
import { AuthenticatedRequest } from "../middleware/auth";
import Account from "../model/account.model";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { success } = userSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    const { name, email, password } = req.body;
    console.log(name, email, password);

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

    await Account.create({
      id: user.id as string,
      balance: 1 + Math.random() * 10000,
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
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { success } = loginSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    const { email, password } = req.body;

    console.log(email, password);
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
        id: user.id,
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

//?updating name and password
const updateSchema = z.object({
  name: z.string(),
  password: z.string().min(5),
});
export const update = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { success } = updateSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const { name, password } = req.body;

    const updateUser = await User.findOneAndUpdate(
      {
        id: req.id as string,
      },
      {
        $set: {
          name,
          password,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    return;
  }
};

//?getting all user from db

export const getAlluser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filter = (req.query.filter as string) || "";

    const users = await User.find({
      name: { $regex: filter },
      // name: { $regex: filter, $options: "i" },
    });

    res.status(200).json({
      message: "Users fetched successfully",
      users: users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }),
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    return;
  }
};
