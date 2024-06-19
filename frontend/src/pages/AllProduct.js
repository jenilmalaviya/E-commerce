import React, { useState, useEffect } from "react";
import UplodeProduct from "../components/UplodeProduct";
import summaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProduct = () => {
  const [openUplodeProduct, setOpenUplodeProduct] = useState(false);
  const [allProduct, setallProduct] = useState([]);

  const fatchAllproduct = async () => {
    const response = await fetch(summaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data ", dataResponse);

    setallProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fatchAllproduct();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">All Products</h2>

        <button
          className="border-2 border-black px-5 bg-gray-900 py-1 flex items-center justify-center rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[rgb(220,38,38)] before:to-[rgb(184,105,105)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          onClick={() => setOpenUplodeProduct(true)} // Add onClick handler here
        >
          Uplode Product
        </button>
      </div>
      {openUplodeProduct && (
        <UplodeProduct onClose={() => setOpenUplodeProduct(false)} />
      )}
      {/* get all product */}
      <div className="flex items-center gap-5 py-4">
        {allProduct.map((product, index) => {
          return <AdminProductCard data={product} key={index + "allproduct"} />;
        })}
      </div>
    </div>
  );
};

export default AllProduct;
