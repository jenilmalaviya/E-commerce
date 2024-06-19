import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
const AdminProductCard = ({ data, fatchData }) => {
  const [editProduct, seteditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded">
      <img src={data?.productimage[0]} width={80} height={80} />
      <h1>{data.productName}</h1>
      <div
        className="w-fit ml-auto p-2 bg-green-50 hover:bg-green-500 hover:text-white rounded-full cursor-pointer"
        onClick={() => seteditProduct(true)}
      >
        <MdModeEditOutline />
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
