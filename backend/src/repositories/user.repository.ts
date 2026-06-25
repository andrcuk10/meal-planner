import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const userRepo = AppDataSource.getRepository(User);

export const findByEmail = (email: string) => {
  return userRepo.findOne({ where: { email } });
};

export const findByUsername = (username: string) => {
  return userRepo.findOne({ where: { username } });
};

export const createUser = (data: Partial<User>) => {
  const user = userRepo.create(data);
  return userRepo.save(user);
};
