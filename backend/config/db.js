import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database is connected");
  } catch (error) {
    console.log("database connection error", error);
  }
};

export { connectdb };
