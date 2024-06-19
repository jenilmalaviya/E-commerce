import React, { useState } from "react";
import UplodeProduct from "../components/UplodeProduct";

const AllProduct = () => {
  // Move useState inside the functional component
  const [openUplodeProduct, setOpenUplodeProduct] = useState(false);

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
    </div>
  );
};

export default AllProduct;
