import React from "react";
import { MdModeEditOutline } from "react-icons/md";
const AdminProductCard = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded">
      <img src={data?.productimage[0]} width={80} height={80} />
      <h1>{data.productName}</h1>
      <div className="w-fit ml-auto p-2 bg-green-50 hover:bg-green-500 hover:text-white rounded-full cursor-pointer">
        <MdModeEditOutline />
      </div>
    </div>
  );
};

export default AdminProductCard;
