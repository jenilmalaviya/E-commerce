import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loging, setLoging] = useState(false);

  const categoryLoding = new Array(11).fill(null);

  const fetchCategoryProduct = async () => {
    setLoging(true);
    const response = await fetch(summaryApi.categoryProduct.url);
    const dataResponse = await response.json();

    setLoging(false);
    setCategoryProduct(dataResponse.data);
  };

  // const fatchget
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 my-1.5 ">
      <div className=" flex items-center gap-4 overflow-scroll scrollerbar-none">
        {loging
          ? categoryLoding.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-Category/" + product?.category}
                  key={index}
                  className="cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20  rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.productimage[0]}
                      alt={product.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-y-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                  <p className="text-center text-sm md:text-base ">
                    ₹ {product?.price}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
