import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loging, setLoging] = useState(false);

  const categoryLoding = new Array(4).fill(null);

  const fetchCategoryProduct = async () => {
    setLoging(true);
    const response = await fetch(summaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    console.log(dataResponse);

    setLoging(false);
    setCategoryProduct(dataResponse.data);
  };

  // const fatchget
  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 my-1.5 ">
      <div className=" h-16 w-16 md:w-20 md:h-20 flex items-center gap-4   overflow-scroll scrollerbar-none">
        {loging
          ? categoryLoding.map((el, index) => {
              return (
                /* From Uiverse.io by devAaus */
                <div class="flex-col gap-4 w-full flex items-center justify-center">
                  <div class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                    <div class="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                  </div>
                </div>
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
