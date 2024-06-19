import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productimage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

export const productModel = mongoose.model("Product", productSchema);
