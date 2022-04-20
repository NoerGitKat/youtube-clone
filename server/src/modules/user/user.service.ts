import { User, UserModel } from "./user.model";

export async function createUser(user: Omit<User, "comparePassword">) {
  return UserModel.create(user);
}

export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}

export async function verifyPassword(password: User["password"]) {
  return 
}