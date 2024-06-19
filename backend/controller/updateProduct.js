import { uplodeProductPermission } from "../helpers/permission.js";
import { productModel } from "../models/productModel.js";

export const updateProductController = async (req, res) => {
  try {
    if (!uplodeProductPermission(req.userId)) {
      throw new Error("permission denied");
    }
    const productId = req?._id;

    const { _id, ...resBody } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);
    res.json({
      message: "product update successfuly",
      data: updateProduct,
      success: true,
      error: false,
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
