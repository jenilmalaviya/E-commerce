import { UserModel } from "../../models/user.models.js";

export const updateUserController = async (req, res) => {
  try {
    const sessionUser = req.userId;

    const { userId, email, name, role } = req.body;
    const paylode = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await UserModel.findById(sessionUser);
   

    const updateUser = await UserModel.findByIdAndUpdate(userId, paylode);

    res.json({
      message: "User Updated",
      data: updateUser,
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
