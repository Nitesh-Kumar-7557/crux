import { Router } from "express";
import { registerLike } from "../controllers/like.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const likeRoutes = Router();

likeRoutes.post("/", authMiddleware, registerLike);

export default likeRoutes;
