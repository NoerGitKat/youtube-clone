import { Router } from "express";
import {
  processRequestBody,
  processRequestParams,
} from "zod-express-middleware";
import requireUser from "../../middleware/requireUser";
import { updateVideo, uploadVideo, fetchVideos } from "./videos.controller";
import { updateVideoSchema } from "./videos.schema";

const router = Router();

router.get("/", fetchVideos);

router.post("/upload", requireUser, uploadVideo);

router.patch(
  "/:videoId",
  requireUser,
  processRequestBody(updateVideoSchema.body),
  processRequestParams(updateVideoSchema.params),
  updateVideo
);

export default router;
