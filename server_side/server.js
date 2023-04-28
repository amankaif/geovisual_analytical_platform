// import express from "express";
// import mongoose from "mongoose";
// import * as dotenv from 'dotenv';
// const dotenv = require("dotenv").config();
// const express = require("express");
// const register = require("./controllers/auth.js");
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

app.use(express.json());
// app.use("/auth", authRoutes);

app.post("/upload_shp", (req, res) => {
  console.log(req.body);
});

// app.use(cookieParser(process.env.JWT_SECRET));
// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: true,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
//   })
// );

// app.get("/api", (req, res) => {
//   console.log("ap/i ok");
// });
// MONGOOSE SET UP
// const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: false,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`server port: ${PORT}`));
// })
// .catch((error) => console.log(`${error}, did not connect`));

app.listen(PORT, () => console.log(`server port: ${PORT}`));
