import app from './app';
import dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './config/database';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, (): void => {
      console.log(`Server is running on ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
