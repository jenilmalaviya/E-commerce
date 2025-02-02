import Slider from "../../models/slider.js";
import { deleteCloudinaryImage, uploadcloudinary } from "../../utils/cloudinary.js";

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

export const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
        error: true,
        success: false,
      });
    }

    let imageUrl = slider.image;

    if (req.files?.image?.[0]?.path) {
      const newImagePath = req.files.image[0].path;


      if (slider.image) {
        const publicId = slider.image.split("/").slice(-2).join("/").split(".")[0];
        await deleteCloudinaryImage(publicId);
      }

      // Upload new image to Cloudinary
      const uploadedImage = await uploadcloudinary(newImagePath);
      if (!uploadedImage) {
        throw new Error("Error uploading image to Cloudinary");
      }
      imageUrl = uploadedImage.url; 
    }

    const updateData = {
      ...req.body,
      image: imageUrl,
    };
    delete updateData._id;

    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.id,
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
      data: updatedSlider,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
        error: true,
        success: false,
      });
    }

    if (slider.image) {
      const publicId = slider.image.split("/").slice(-2).join("/").split(".")[0];
      await deleteCloudinaryImage(publicId);
    }

    await Slider.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Slider deleted successfully",
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