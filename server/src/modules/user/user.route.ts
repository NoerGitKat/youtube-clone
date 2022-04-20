import { Router } from "express";
import { registerUser } from "./user.controller";

const router = Router();

router.post("/create", registerUser);

export default router;
