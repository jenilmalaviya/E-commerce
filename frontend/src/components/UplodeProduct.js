import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { productCategory } from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadProduct";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common";
import { toast } from "react-toastify";

const UplodeProduct = ({ onClose, fatchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productimage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedImage = await uploadImage(file);
      setData((prevData) => ({
        ...prevData,
        productimage: [...prevData.productimage, uploadedImage.url],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteProductImage = (index) => {
    const newProductImages = [...data.productimage];
    newProductImages.splice(index, 1);
    setData((prevData) => ({
      ...prevData,
      productimage: newProductImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed the typo here
    const response = await fetch(summaryApi.uplodeProduct.url, {
      method: summaryApi.uplodeProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fatchData();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-35 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-semibold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          >
            <option value="" name="category" onChange={handleOnChange}>
              Select Category
            </option>

            {productCategory.map((el, index) => (
              <option key={el.value + index} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>
          <label htmlFor="productimage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 rounded h-48 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data.productimage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.productimage.map((el, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={el}
                      alt={`product-${index}`}
                      width={100}
                      height={100}
                      className="bg-slate-600 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-black hover:bg-red-500 hidden rounded-full group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload a product image
              </p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">
            price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter Price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Product Description"
            value={data.description}
            onChange={handleOnChange}
            rows={3}
            className="h-28 p-1 bg-slate-100 resize-none border rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="px-3 bg-black py-4 mb-5 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[rgb(220,38,38)] before:to-[rgb(184,105,105)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            Upload Product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UplodeProduct;
