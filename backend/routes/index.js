import express from "express";
import { userSignUpController } from "../controller/userSignUp.js";
import { userSigninController } from "../controller/userSignin.js";
import { userDetailController } from "../controller/userDetail.js";
import { authToken } from "../middleware/authToken.js";
import { userLogoutcontroller } from "../controller/UserLogout.js";
import { alluserController } from "../controller/allUsers.js";
import { updateUserController } from "../controller/updateUser.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSigninController);
router.get("/user-Datails", authToken, userDetailController);
router.get("/user-Logout", userLogoutcontroller);

// amin penal
router.get("/all-user", authToken, alluserController);
router.put("/update-user", authToken, updateUserController);
export default router;
