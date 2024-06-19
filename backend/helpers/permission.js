import { UserModel } from "../models/user.models.js";

export const uplodeProductPermission = async (userId) => {
  const user = UserModel.findById(userId);
  if (user.role !== "ADMIN") {
    return false;
  }
  return false;
};
