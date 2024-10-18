import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema(
  {
    SliderName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Slider = mongoose.model("slider", sliderSchema);
export default Slider;
