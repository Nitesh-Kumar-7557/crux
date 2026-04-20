import { Router } from "express";
import { addNewArgument, getArgumentById } from "../controllers/argument.controller.js";


const argumentRoutes = Router();

argumentRoutes.post('/', addNewArgument);
argumentRoutes.get('/:id',getArgumentById);

export default argumentRoutes;