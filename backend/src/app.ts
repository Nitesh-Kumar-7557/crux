import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import userRoutes from './routes/user.route.js';
import statementRoutes from './routes/statement.route.js';
import argumentRoutes from './routes/argument.route.js';
import commentRoutes from './routes/comment.route.js';
import arenaRoutes from './routes/arena.route.js';



const app = express();

// middlewares
app.use(helmet())
app.use(cors({
  origin: config.client_url,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


// routes
app.get("/health", (req, res) => res.sendStatus(200))
app.use("/user",userRoutes)
app.use("/statement",statementRoutes)
app.use("/argument",argumentRoutes)
app.use("/comment",commentRoutes)
app.use("/arena",arenaRoutes)


export default app;