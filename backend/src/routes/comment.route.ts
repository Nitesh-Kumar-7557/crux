import { Router } from "express";
import { getComments, postAffirmativeComment, postNegativeComment } from "../controllers/comment.controller.js";

const commentRoutes = Router();

commentRoutes.get('/:id',getComments)

commentRoutes.post('/affirmative/:id',postAffirmativeComment)
commentRoutes.post('/negative/:id',postNegativeComment)


export default commentRoutes;