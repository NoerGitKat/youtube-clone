import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mysupersecretjwt";

export function signJWT(payload: string | object | Buffer) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
