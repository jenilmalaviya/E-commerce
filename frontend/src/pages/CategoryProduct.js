import React from "react";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  console.log("categoryName", params);

  const category = params.category;
  return <div>{params?.categoryName}</div>;
};

export default CategoryProduct;
