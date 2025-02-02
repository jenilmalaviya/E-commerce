import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";
import summaryApi from "../common";
import ClipLoader from "react-spinners/ClipLoader";
const AddsliderImage = ({ onClose , fatchData}) => {
  const [file, setFile] = useState(null);
  const [sliderName, setSliderName] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDeletePreview = () => {
    setFile(null);
    setPreviewUrl("");

    // Clear the file input value
    const fileInput = document.getElementById("file"); // Get the file input element
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !sliderName || !description) {
      toast.error("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("SliderName", sliderName);
    formData.append("description", description);
    formData.append("image", file)
    
    setLoading(true);

    try {
      const response = await fetch(summaryApi.addSlider.url, {
        method: summaryApi.addSlider.method,
        credentials: "include",
        body: formData,
      });

      const responseData = await response.json();
      setLoading(false);

      if (responseData.success) {
        toast.success(responseData.message || "Slider uploaded successfully!");
        onClose();
        fatchData();
      } else if (responseData.error) {
        toast.error(responseData.message || "Failed to upload slider.");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Failed to upload slider.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">Slider Product</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <CgClose className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="space-y-4">
              <div>
                <label htmlFor="sliderName" className="block text-sm font-medium text-gray-700 mb-1">
                  Slider Name
                </label>
                <input
                  type="text"
                  id="sliderName"
                  name="sliderName"
                  placeholder="Enter Slider Name"
                  value={sliderName}
                  onChange={(e) => setSliderName(e.target.value)}
                  className="w-full px-3 py-2 border bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter Slider Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                  Choose a file
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {previewUrl && (
                <div className="relative mt-4">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleDeletePreview}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <CgClose className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 bg-black py-2 mb-5 flex justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[rgb(220,38,38)] before:to-[rgb(184,105,105)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
                disabled={loading || !file || !sliderName || !description}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Upload Slider"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddsliderImage;