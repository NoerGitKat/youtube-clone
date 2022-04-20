import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBodyType } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUser(
  req: Request<{}, {}, RegisterUserBodyType>,
  res: Response
) {
  const { username, email, password } = req.body;

  try {
    await createUser({
      username,
      email,
      password,
    });

    return res.status(StatusCodes.CREATED).send("Succesfully created user!");
  } catch (error) {
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exists.");
    }
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
}
