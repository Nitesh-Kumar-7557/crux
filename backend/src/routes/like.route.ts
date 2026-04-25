import { Router } from "express";
import { registerLike } from "../controllers/like.controller.js";


const likeRoutes = Router();

likeRoutes.post('/',registerLike)

export default likeRoutes;