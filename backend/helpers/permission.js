import { UserModel } from "../models/user.models.js";

export const uplodeProductPermission = async (userId) => {
  const user = UserModel.findById(userId);
  if (user.role !== "ADMIN") {
    return false;
  }
  return false;
};

export const supperAdminside = async (userId) => {
  const superAdmin = UserModel.findById(userId);
  if (user.role !== "SUPERADMIN") {
    return false;
  }
  return false;
};
