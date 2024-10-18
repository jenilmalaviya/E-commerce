import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import multer from "multer"; // Import Multer

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api", router);

connectdb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
