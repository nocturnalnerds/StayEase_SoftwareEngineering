import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getAllStaff,
  getUserById,
  getStaffById,
  updateUser,
  updateStaff,
  getUsersByRole,
  getStaffByRole,
  searchUserByName,
  createStaff,
  deleteStaff,
} from "../controllers/UserManagementController";

const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createUser);
userRouter.get("/users/search", searchUserByName);
userRouter.get("/users/role/:role", getUsersByRole);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users/:id", updateUser);

userRouter.get("/staff", getAllStaff);
userRouter.post("/staff", createStaff);
userRouter.get("/staff/role/:role", getStaffByRole);
userRouter.get("/staff/:id", getStaffById);
userRouter.put("/staff/:id", updateStaff);
userRouter.delete("/staff/:id", deleteStaff);

export { userRouter };
