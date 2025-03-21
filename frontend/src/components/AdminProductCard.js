import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displaycurrency";
const AdminProductCard = ({ data, fatchData }) => {
  const [editProduct, seteditProduct] = useState(false);

  return (
    <div className="bg-white p-4  rounded">
      <div className="w-30">
        <div className="w-45 h-40 flex justify-center items-center">
          <img
            src={data?.productimage[0]}
            width={80}
            height={90}
            className="mx-auto object-fill h-full object-scale-down "
          />
        </div>
        <h1 className="break-words max-w-36 text-left mx-auto text-ellipsis line-clamp-2">
          {data.productName}
        </h1>
        <div>
          <div className="font-bold text-left ">
            {displayINRCurrency(data.sellingPrice)}
          </div>
        </div>
        <div
          className="w-fit ml-auto p-2 bg-green-50 hover:bg-green-500 hover:text-white rounded-full cursor-pointer"
          onClick={() => seteditProduct(true)}
        >
          <MdModeEditOutline />
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => seteditProduct(false)}
          fatchData={fatchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
