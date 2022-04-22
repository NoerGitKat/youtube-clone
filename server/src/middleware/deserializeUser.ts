import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../modules/auth/auth.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer\s/, "");

  if (!accessToken) return next();

  const decodedToken = verifyJWT(accessToken);

  if (decodedToken) {
    res.locals.user = decodedToken;
  }

  return next();
}

export default deserializeUser;
