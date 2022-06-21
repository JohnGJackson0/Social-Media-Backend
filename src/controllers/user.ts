import { Error } from 'mongoose';
import { UserModel } from '../models/userSchema';
import { User } from '../types/models'

export async function createUser({
  firstName,
  lastName,
  email,
  password
}: User): Promise<User> {
  return UserModel.create({
    firstName,
    lastName,
    email,
    password
  }).then((data: User) => {
    return data;
  }).catch((error: Error) => {
    throw error;
  });
}