import { productModel } from "../../models/productModel.js";
export const getCategoryProduct = async (req, res) => {
  try {
    // all product get use in distinct
    const productCategory = await productModel.distinct("category");


    //  array to store one product from each product
    const productByCategory = [];

    for (const category of productCategory) {
      const Product = await productModel.findOne({ category });
      if (Product) {
        productByCategory.push(Product);
      }
    }

    res.json({
      message: "category product",
      data: productByCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
