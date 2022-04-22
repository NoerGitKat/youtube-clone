import { Request, Router, Response } from "express";
import { processRequestBody } from "zod-express-middleware";
import requireUser from "../../middleware/requireUser";
import { getMe, registerUser } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = Router();

router.get("/me", requireUser, getMe);

router.post(
  "/create",
  processRequestBody(registerUserSchema.body),
  registerUser
);

export default router;
