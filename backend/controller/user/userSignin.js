import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user.models.js";

export const userSigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("please provide email");
    }

    if (!password) {
      throw new Error("please provide password");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("user Not Found");
    }

    const cheackPassword = await bcrypt.compare(password, user.password);
    console.log("password cheack", cheackPassword);

    if (cheackPassword) {
      const TokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(TokenData, process.env.TOKEN_SECREATE_KEY, {
        expiresIn: process.env.TOKEN_EXPIRY,
      });

      const tokenOpen = {
        httpOnly: true,
        success: true,
      };
      res.cookie("token", token, tokenOpen).status(200).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("pleack cheack your password");
    }
  } catch (err) {
    console.error(err); // Log the error to console for debugging
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
// export default {
//   userSigninController,
// };
