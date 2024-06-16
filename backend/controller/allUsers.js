import { UserModel } from "../models/user.models.js";

export const alluserController = async (req, res) => {
  try {
    console.log("get all user", req.userId);

    const allUser = await UserModel.find();

    res.json({
      message: "get all user",
      data: allUser,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error(err); // Log the error to console for debugging
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
