import { Router } from "express";
import { getActiveCardData, getTrendingCardData } from "../controllers/arena.controller.js";

const arenaRoutes = Router();

arenaRoutes.get('/active/main',getActiveCardData);
arenaRoutes.get('/active/trending',getTrendingCardData);

export default arenaRoutes;