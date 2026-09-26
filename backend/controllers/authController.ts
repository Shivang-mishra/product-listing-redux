import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  const userEmail = process.env.USER_EMAIL;
  const userPassword = process.env.USER_PASSWORD;

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ success: false, message: "Server misconfiguration: missing JWT secret" });
    return;
  }

  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email, role: "admin" }, jwtSecret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
      role: "admin",
      email,
    });
    return;
  }

  if (email === userEmail && password === userPassword) {
    const token = jwt.sign({ email, role: "user" }, jwtSecret, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
      role: "user",
      email,
    });
    return;
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
};
