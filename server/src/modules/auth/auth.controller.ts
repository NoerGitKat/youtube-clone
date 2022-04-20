import { Request, Response } from "express";
import { LoginUserBodyType } from "./auth.schema";

export async function login(
  req: Request<{}, {}, LoginUserBodyType>,
  res: Response
) {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    // 2. Verify password
    // 3. Sign JWT
    // 4. Add cookie to response
    // 5. Send cookie
  } catch (error) {}
}
