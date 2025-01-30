import moment from 'moment';
import React from 'react';
import { MdModeEdit } from 'react-icons/md';

const AdminGetSlider = ({ data, index }) => {
  return (
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-2.5">{index + 1}</td>
      <td className="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data?.SliderName}</td>
      <td className="px-6 py-2.5">
        <img
          src={data?.image}
          alt="Slider"
          className="w-16 h-16 object-cover rounded-md"
        />
      </td>

      {/* Description with wrapping */}
      <td className="px-6 py-2.5 break-words max-w-[300px]" >{data?.description}</td> {/* Added max-width and break-words */}
      <td className="px-6 py-2.5">{moment(data?.createdAt).format("ll")}</td>
      <td className="px-8 py-2.5 text-left">
        <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:underline hover:bg-black hover:text-white">
          <MdModeEdit />
        </button>
      </td>
    </tr>
  );
};

export default AdminGetSlider;
