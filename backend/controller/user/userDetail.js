import { UserModel } from "../../models/user.models.js";

export const userDetailController = async (req, res) => {
  try {
    console.log("user id", req.userId);

    const user = await UserModel.findById(req.userId);

    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "Login user detail",
    });
    console.log("user", user);
  } catch (err) {
    console.error(err); // Log the error to console for debugging
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
