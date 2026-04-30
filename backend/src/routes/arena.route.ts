import { Router } from "express";
import {
  getActiveCardData,
  getNewestCardData,
  getSidebarData,
  getTrendingCardData,
} from "../controllers/arena.controller.js";

const arenaRoutes = Router();

arenaRoutes.get("/active/main", getActiveCardData);
arenaRoutes.get("/active/trending", getTrendingCardData);
arenaRoutes.get("/active/newest", getNewestCardData);
arenaRoutes.get("/sidebar", getSidebarData);

export default arenaRoutes;
