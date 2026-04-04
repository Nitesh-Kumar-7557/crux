import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/index.js';



const app = express();

// middlewares
app.use(helmet())
app.use(cors({
  origin: config.client_url,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())




export default app;