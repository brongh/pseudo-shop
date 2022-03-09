import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["access-token"];

  if (!token) {
    return res.status(403).send("Token is required");
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded as string;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
