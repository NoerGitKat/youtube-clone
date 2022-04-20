import { Router } from "express";
import { processRequestBody } from "zod-express-middleware";
import { registerUser } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = Router();

router.post(
  "/create",
  processRequestBody(registerUserSchema.body),
  registerUser
);

export default router;
