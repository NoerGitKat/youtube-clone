import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ENVIRONMENT } from "../../constants";
import { omit } from "../../helpers";
import { findUserByEmail } from "../user/user.service";
import { LoginUserBodyType } from "./auth.schema";
import { signJWT } from "./auth.utils";

const DOMAIN = process.env.DOMAIN || "localhost";

export async function login(
  req: Request<{}, {}, LoginUserBodyType>,
  res: Response
) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user || !user.comparePassword(password))
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send("Invalid email or password.");

    const payload = omit(user.toJSON(), ["__v", "password"]);

    const jwt = signJWT(payload);

    res.cookie("accessToken", jwt, {
      maxAge: 90000, // 15 minutes
      httpOnly: true,
      domain: DOMAIN,
      path: "/",
      sameSite: "strict",
      secure: ENVIRONMENT !== "development",
    });

    return res.status(StatusCodes.OK).send(jwt);
  } catch (error) {}
}
