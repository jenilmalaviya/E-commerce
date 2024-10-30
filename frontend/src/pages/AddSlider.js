import React, { useEffect, useState } from "react";
import AddsliderImage from "../components/AddsliderImage";
import summaryApi from "../common";
import AdminGetSlider from "../components/AdminGetSlider";

const AddSlider = () => {
  const [openUplodeProduct, setOpenUplodeProduct] = useState(false);
  const [getSlider, setgetSlider] = useState([]);

  const fatchallslider = async () => {
    const response = await fetch(summaryApi.getSlider.url);
    const dataResponse = await response.json();
    setgetSlider(dataResponse?.data || []);
  };

  useEffect(() => {
    fatchallslider();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">All Slider</h2>

        <button
          className="border-2 border-black px-5 bg-gray-900 py-1 flex items-center justify-center rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[rgb(220,38,38)] before:to-[rgb(184,105,105)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          onClick={() => setOpenUplodeProduct(true)}
        >
          Add Slider
        </button>
      </div>
      {openUplodeProduct && (
        <AddsliderImage onClose={() => setOpenUplodeProduct(false)} />
      )}
      {/* get all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {getSlider.map((product, index) => {
          return (
            <AdminGetSlider
              data={product}
              key={index + "getSlider"}
              fatchData={fatchallslider}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddSlider;
