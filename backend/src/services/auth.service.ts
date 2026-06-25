import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findByEmail, findByUsername } from '../repositories/user.repository';
import { AppError } from '../types/errors';

export const AuthService = {
  async register(email: string, password: string, username: string) {
    const [existingEmail, existingUsername] = await Promise.all([
      findByEmail(email),
      findByUsername(username),
    ]);

    if (existingEmail) throw new AppError('DUPLICATE_EMAIL', 409);
    if (existingUsername) throw new AppError('DUPLICATE_USERNAME', 409);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser({
      email,
      password: passwordHash,
      username,
    });

    return this.generateToken(user.id);
  },

  async login(email: string, password: string) {
    const user = await findByEmail(email);
    if (!user) {
      throw new AppError('INCORRECT_CREDENTIALS', 401);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AppError('INCORRECT_CREDENTIALS', 401);
    }

    return this.generateToken(user.id);
  },

  generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  },
};
