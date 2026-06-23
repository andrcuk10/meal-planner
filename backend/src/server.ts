import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, (): void => {
  console.log(`Server is running on ${PORT}...`);
});
