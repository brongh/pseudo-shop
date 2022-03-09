import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import bodyParser from "body-parser";

require("dotenv").config();

import router from "./controllers";

const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use(router);

  await mongoose.connect("mongodb://localhost:27017/psuedo-shop");

  app.listen(8000, () => {
    console.log("******************************");
    console.log("Server is now listening on port: 8000");
    console.log("******************************");
  });
};

startServer();
