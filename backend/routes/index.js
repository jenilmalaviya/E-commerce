import express from "express";
import { authToken } from "../middleware/authToken.js";
import { uplodeProductController } from "../controller/product/uplodeProduct.js";
import { updateProductController } from "../controller/product/updateProduct.js";
import { userSigninController } from "../controller/user/userSignin.js";
import { userDetailController } from "../controller/user/userDetail.js";
import { userLogoutcontroller } from "../controller/user/UserLogout.js";
import { alluserController } from "../controller/user/allUsers.js";
import { updateUserController } from "../controller/user/updateUser.js";
import { userSignUpController } from "../controller/user/userSignUp.js";
import { getProductController } from "../controller/product/getProduct.js";
import { getCategoryProduct } from "../controller/product/getCategoryproduct.js";

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
router.get("/get-CategoryProduct", getCategoryProduct);
