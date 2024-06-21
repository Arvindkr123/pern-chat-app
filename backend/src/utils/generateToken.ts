import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndsetCookie = async (
  userId: String,
  res: Response
) => {
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "55d",
  });

  res.cookie("jwt", token, {
    maxAge: 55 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
