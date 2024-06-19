import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { productCategory } from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadProduct";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
const UplodeProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productimage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openFullScreenImage, setoFenfullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const hendleOnChange = (e) => {};
  const hendelUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uplodeImageCloudinary = await uploadImage(file);
    setData((preve) => {
      return {
        ...preve,
        productimage: [...preve.productimage, uplodeImageCloudinary.url],
      };
    });
  };
  const hendleDeletProductImage = async (index) => {
    console.log("index index", index);
    const newProductImage = [...data.productimage];
    newProductImage.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
        productimage: [...newProductImage],
      };
    });
  };
  return (
    <div className="fixed  w-full h-full top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-35 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-semibold text-lg">UploadProduct</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer "
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5">
          <label htmlFor="productName">product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={hendleOnChange}
            className="p-2  bg-slate-100 border rounded"
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            name="brandName"
            onChange={hendleOnChange}
            className="p-2  bg-slate-100 border rounded"
          />
          <label htmlFor="category" className="mt-3">
            category :
          </label>
          <select
            value={data.category}
            className="p-2  bg-slate-100 border rounded"
          >
            {productCategory.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productimage" className="mt-3">
            Productimage :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 rounded h-48 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">upload product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={hendelUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productimage[0] ? (
              <div className="flex items-center gap-2">
                {data.productimage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt="el"
                        width={100}
                        hidden={100}
                        className="bg-slate-600 border cursor-pointer"
                        onClick={() => {
                          setoFenfullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-black hover:bg-red-500 rounded-full  group-hover:block cursor-pointer"
                        onClick={hendleDeletProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *pleace Uplode product image
              </p>
            )}
          </div>
          <label htmlFor="productimage" className="mt-3">
            Productimage :
          </label>
          <button className="px-3 bg-black py-4  mb-5 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[rgb(220,38,38)] before:to-[rgb(184,105,105)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
            Uplode product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setoFenfullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UplodeProduct;
