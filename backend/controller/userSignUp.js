import { Error } from "mongoose";
import { UserModel } from "../models/user.models.js";
import bcrypt from "bcrypt";

export const userSignUpController = async (req, res) => {
  try {
    const { email, password, name, profilepic } = req.body;

    const user = await UserModel.findOne({ email });
    console.log("====================================");
    console.log(user);
    console.log("====================================");
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
      role: "GENERAL",
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
    console.error(err); // Log the error to console for debugging
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default { userSignUpController };
