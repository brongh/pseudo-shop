import express, { Request, Response } from "express";
import Users from "../models/user";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    return res.status(200).send("token good");
  } catch (error) {
    return res.status(400).send("token not good");
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!(email && password)) {
      return res.status(400).send("Email and password required");
    }
    const oldUser = await Users.findOne({ email: email });

    if (oldUser) {
      return res.status(400).send("User Already Exist. Please Login");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      name: name,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!(email && password)) {
      res.status(400).send("All input required");
    }

    const user = await Users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
  }
});

export default router;
