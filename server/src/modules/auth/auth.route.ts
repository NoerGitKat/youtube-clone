import { Router } from "express";
import { processRequestBody } from "zod-express-middleware";
import { loginUserSchema } from "./auth.schema";
import { login } from "./auth.controller";

const router = Router();

router.post("/login", processRequestBody(loginUserSchema.body), login);

export default router;
