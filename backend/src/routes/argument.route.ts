import { Router } from "express";
import { getArgumentById } from "../controllers/argument.controller.js";
// import { getAllActiveArguments } from "../controllers/argument.controller.js";


const argumentRoutes = Router();

argumentRoutes.get('/:id',getArgumentById)
// argumentRoutes.get('/active',getAllActiveArguments)

export default argumentRoutes;