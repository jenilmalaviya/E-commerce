import express from "express";
import { userSignUpController } from "../controller/userSignUp.js";
import { userSigninController } from "../controller/userSignin.js";
import { userDetailController } from "../controller/userDetail.js";
import { authToken } from "../middleware/authToken.js";
import { userLogoutcontroller } from "../controller/UserLogout.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSigninController);
router.get("/user-Datails", authToken, userDetailController);
router.get("/user-Logout", userLogoutcontroller);
export default router;
