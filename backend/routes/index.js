import express from "express";
import { userSignUpController } from "../controller/userSignUp.js";
import { userSigninController } from "../controller/userSignin.js";
import { userDetailController } from "../controller/userDetail.js";
import { authToken } from "../middleware/authToken.js";
import { userLogoutcontroller } from "../controller/UserLogout.js";
import { alluserController } from "../controller/allUsers.js";
import { updateUserController } from "../controller/updateUser.js";
import { uplodeProductController } from "../controller/uplodeProduct.js";
import { getProductController } from "../controller/getProduct.js";
import { updateProductController } from "../controller/updateProduct.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSigninController);
router.get("/user-Datails", authToken, userDetailController);
router.get("/user-Logout", userLogoutcontroller);

// amin penal
router.get("/all-user", authToken, alluserController);
router.put("/update-user", authToken, updateUserController);
export default router;

// product uplode
router.post("/uplode-product", authToken, uplodeProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
