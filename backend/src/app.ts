import express, { Application, NextFunction, Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import { AppError } from './types/errors';

const app: Application = express();

app.use(express.json());

app.use('/auth', authRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
});

export default app;
