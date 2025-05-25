import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export interface AuthenticatedRequest extends Request {
  id?: string;
}

interface Payload {
  id?: string;
}
export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("token from middleware", token);
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Payload;
    console.log("decodedToken", decodedToken);

    req.id = decodedToken.id;
    console.log("req.id", req.id);
    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
