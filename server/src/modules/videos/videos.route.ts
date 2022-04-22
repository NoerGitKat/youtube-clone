import { Router } from "express";
import requireUser from "../../middleware/requireUser";
import { uploadVideo } from "./videos.controller";

const router = Router();

router.post("/upload", requireUser, uploadVideo);

export default router;
