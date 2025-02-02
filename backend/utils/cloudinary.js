import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadcloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "slider",
    });
    // console.log("fille is uploded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("error in uploading file to cloudinary", error);
    return null;
  }
};

const deleteCloudinaryImage = async (publicId) => {
  try {
    if (!publicId) return null;

    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result !== "ok") {
      console.log("Error deleting image from Cloudinary", response);
      return null;
    }
    return response;
  } catch (error) {
    console.log("Error deleting image from Cloudinary", error);
    return null;
  }
};

export { uploadcloudinary, deleteCloudinaryImage };
