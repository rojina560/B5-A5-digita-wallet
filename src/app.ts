import express, { Request, Response } from 'express';
export const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './app/routes';

import passport from 'passport';
import './app/config/passport'
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(passport.initialize())

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send(' Digital Wallet Server is running...');
})

app.use(globalErrorHandler)