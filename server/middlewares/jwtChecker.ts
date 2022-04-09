import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    res.status(401).json({ message: "Login to continue" });
  } else {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY!, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid or expired token" });
      } else {
        res.locals.user = decoded;
        res.locals.token = token;
        next();
      }
    });
  }
};
