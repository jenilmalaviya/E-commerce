import { Error } from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/user.models.js";

export const userSignUpController = async (req, res) => {
  try {
    const { email, password, name, profilepic } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error("Alreaduy email exist");
    }

    if (!name) {
      throw new Error("please provide name");
    }

    if (!email) {
      throw new Error("please provide email");
    }

    if (!password) {
      throw new Error("please provide password");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("something is wrong");
    }

    const payload = {
      ...req.body,
      role: "USER",
      password: hashPassword,
    };
    const userData = new UserModel(payload);

    const saveUser = await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "user created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default { userSignUpController };
