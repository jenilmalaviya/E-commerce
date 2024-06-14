import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./config/db.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS

app.use("/api", router);

connectdb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
});
