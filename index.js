import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import posts from "./router/posts.js";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const URL = process.env.DATABASE_URL;
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/api/posts", posts);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
