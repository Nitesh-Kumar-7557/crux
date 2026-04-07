import { Router } from "express";
import { addNewStatement } from "../controllers/statement.controller.js";

const statementRoutes = Router();

statementRoutes.post('/', addNewStatement);


export default statementRoutes;