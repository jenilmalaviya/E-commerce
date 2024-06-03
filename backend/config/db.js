import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database is connected");
  } catch (error) {
    console.log("dsta based is connect error ", error);
  }
};
export { connectdb };
