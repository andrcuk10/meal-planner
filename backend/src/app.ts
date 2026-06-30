import express, { Application, NextFunction, Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import ingredientRoutes from './routes/ingredient.routes';
import recipeRoutes from './routes/recipe.routes';
import { AppError } from './types/errors';

const app: Application = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/ingredients', ingredientRoutes);
app.use('/recipes', recipeRoutes);

// nepostojece rute
app.use((req: Request, res: Response) => {
  res.status(404).json({ code: 'ROUTE_NOT_FOUND' });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
});

export default app;
