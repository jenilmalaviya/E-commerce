import { productModel } from "../../models/productModel.js";

export const getProductController = async (req, res) => {
  try {
    const allProduct = await productModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All product ",
      error: false,
      success: true,
      data: allProduct,
    });
  } catch (error) {
 
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
