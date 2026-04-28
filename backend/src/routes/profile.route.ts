import { Router } from "express";
import { getProfileDataById } from "../controllers/profile.controller.js";

const profileRoutes = Router()

profileRoutes.get('/:id', getProfileDataById)

export default profileRoutes;