import Slider from "../../models/slider.js";
import { uploadcloudinary } from "../../utils/cloudinary.js";

export const addSlider = async (req, res) => {
  try {
    const image = req.files?.image?.[0]?.path;
    if (!image) {
      throw new Error("Image is required");
    }

    const uploadedImage = await uploadcloudinary(image);
    if (!uploadedImage) {
      throw new Error(" uploading image to Cloudinary");
    }

    if (req.body.id) {
      const updateData = {
        ...req.body,
        image: uploadedImage.url,
      };
      delete updateData._id;
      const updatedSlider = await Slider.findByIdAndUpdate(
        req.body.id,
        { $set: updateData },
        { new: true }
      );

      if (!updatedSlider) {
        throw new Error("Slider not found");
      }

      return res.status(200).json({
        message: "Slider updated successfully",
        slider: {
          SliderName: updatedSlider.SliderName,
          description: updatedSlider.description,
          isActive: updatedSlider.isActive,
          image: updatedSlider.image,
        },
        error: false,
        success: true,
        data: slider,
      });
    }

    // Create a new slider if no ID is provided
    const newSlider = new Slider({
      ...req.body,
      image: uploadedImage.url,
      isActive: req.body.isActive ?? true, 
    });

    const slider = await newSlider.save();

    return res.status(201).json({
      message: "Slider added successfully",
      error: false,
      success: true,
      data: slider,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSlider = async (req, res) => {
  try {
    const sliders = await Slider.find({ isActive: true }); 
    return res.status(200).json({
      message: "Slider fetched successfully",
      error: false,
      success: true,
      data: sliders,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getAllSlider = async (req, res) => {
  try {
    const sliders = await Slider.find();
    return res.status(200).json({
      message: "Slider fetched successfully",
      error: false,
      success: true,
      data: sliders,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });    
  }
}