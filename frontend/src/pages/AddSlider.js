import React, { useEffect, useState } from "react";
import AddsliderImage from "../components/AddsliderImage";
import summaryApi from "../common";
import AdminGetSlider from "../components/AdminGetSlider";
import axios from "axios";
import { toast } from "react-toastify";

const AddSlider = () => {
  const [openUploadSlider, setOpenUploadSlider] = useState(false);
  const [allSlider, setAllSlider] = useState([]);

  const fetchAllSlider = async () => {
    try {
      const response = await axios.get(summaryApi.getAllSlider.url, {
        withCredentials: true,
      });

      if (response.data.success) {
        setAllSlider(response.data.data || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch sliders");
      setAllSlider([]);
    }
  };

  useEffect(() => {
    fetchAllSlider();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-semibold text-lg">All Slider</h2>

        <button
          className="border-2 border-black px-5 bg-gray-900 py-1 flex items-center justify-center rounded-full cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[rgb(220,38,38)] before:to-[rgb(184,105,105)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          onClick={() => setOpenUploadSlider(true)}
        >
          Add Slider
        </button>
      </div>
      
      {openUploadSlider && (
        <AddsliderImage onClose={() => setOpenUploadSlider(false)} fatchData={fetchAllSlider} />
      )}

      {/* Table for all sliders */}
      <div className="mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-red-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Sr.</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3 ">Description</th>
              <th scope="col" className="px-6 py-3">Created Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allSlider.map((slider, index) => (
              <AdminGetSlider
                key={index}
                data={slider}
                index={index} // Passing the index to AdminGetSlider
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddSlider;
