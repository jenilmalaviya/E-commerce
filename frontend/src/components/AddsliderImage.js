import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";
import summaryApi from "../common";
import ClipLoader from "react-spinners/ClipLoader";
const AddsliderImage = ({ onClose }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !sliderName || !description) {
      toast.error("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("SliderName", sliderName);
    formData.append("description", description);
    formData.append("image", file);

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
      <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-slate-200 bg-opacity-35 flex justify-center items-center p-4 sm:p-8">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] sm:max-h-[90%] overflow-hidden">
          <div className="flex justify-between items-center pb-0">
            <h2 className="font-semibold text-lg">Slider Product</h2>
            <div
              className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
              onClick={onClose}
            >
              <CgClose />
            </div>
          </div>
          <form
            className="grid p-4 gap-2 overflow-y-auto h-full pb-5"
            onSubmit={handleSubmit}
          >
            <label htmlFor="sliderName" className="mt-0">
              Slider Name:
            </label>
            <input
              type="text"
              id="sliderName"
              name="sliderName"
              placeholder="Enter Slider Name"
              value={sliderName}
              onChange={(e) => setSliderName(e.target.value)}
              className="p-2 bg-slate-100 border rounded w-full text-sm sm:text-base"
              required
            />
            <label htmlFor="description" className="mt-1">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Slider Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="p-2 bg-slate-100 resize-none border rounded w-full text-sm sm:text-base h-20"
              required
            ></textarea>
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Choose a file
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {file.name}
                </p>
              )}
            </div>
            {previewUrl && (
              <div className="mt-4 w-full flex justify-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full h-auto max-h-48 rounded object-cover sm:max-h-64"
                />
              </div>
            )}
            <button
              type="submit"
              className="px-3 py-2 bg-black mb-5 w-full sm:w-auto sm:px-4 rounded-xl cursor-pointer transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg text-white text-sm sm:text-base"
              disabled={loading || !file || !sliderName || !description} // Disable button when loading
            >
              {loading ? (
                <ClipLoader color="#fff" size={20} />
              ) : (
                "Upload Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddsliderImage;
