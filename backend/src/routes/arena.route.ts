import { Router } from "express";
import { getActiveCardData, getNewestCardData, getTrendingCardData } from "../controllers/arena.controller.js";

const arenaRoutes = Router();

arenaRoutes.get('/active/main',getActiveCardData);
arenaRoutes.get('/active/trending',getTrendingCardData);
arenaRoutes.get('/active/newest', getNewestCardData);

export default arenaRoutes;