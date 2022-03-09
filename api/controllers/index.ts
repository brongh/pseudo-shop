import express from "express";
import verifyToken from "../middlewares/auth";

import { default as auth } from "./auth";
import { default as admin } from "./admin";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.status(200).send("authenticated!");
});
router.use("/auth", auth);
router.use("/admin", verifyToken, admin);

export default router;
