import { uplodeProductPermission } from "../helpers/permission.js";
import { productModel } from "../models/productModel.js";

export const uplodeProductController = async (req, res) => {
  try {
    const sessionuserId = req.userId;
    if (!uplodeProductPermission(sessionuserId)) {
      throw new Error("permission denied");
    }

    const uplodeProduct = new productModel(req.body);
    const saveProduct = await uplodeProduct.save();

    res.status(201).json({
      message: "Product uplode successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
