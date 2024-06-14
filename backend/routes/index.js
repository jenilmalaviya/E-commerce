import express from "express";
import { userSignUpController } from "../controller/userSignUp.js";
import { userSigninController } from "../controller/userSignin.js";
import { userDetailController } from "../controller/userDetail.js";
import { authToken } from "../middleware/authToken.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSigninController);
router.get("/user-Datails", authToken, userDetailController);

export default router;
