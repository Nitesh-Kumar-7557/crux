import { Router } from "express";
import {
  addNewUser,
  generateNewAccess,
  getUserInfo,
  loginUser,
  logoutUser,
} from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRoutes = Router();

userRoutes.post("/register", addNewUser);
userRoutes.post("/login", loginUser);

userRoutes.post("/refresh", generateNewAccess);

// Authorized routes
userRoutes.get("/me", authMiddleware, getUserInfo);
userRoutes.post("/logout", authMiddleware, logoutUser);

export default userRoutes;
