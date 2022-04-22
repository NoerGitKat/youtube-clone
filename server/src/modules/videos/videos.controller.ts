import busboy from "busboy";
import fs from "fs";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MIME_TYPES } from "../../constants";
import { getPath } from "../../utils";
import { createVideo, findVideo } from "./videos.service";
import { updateVideoParamsType, UpdateVideoBodyType } from "./videos.schema";

export async function uploadVideo(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });

  const user = res.locals.user;

  try {
    const bb = busboy({ headers: req.headers });

    const user = res.locals.user;

    const video = await createVideo(user._id);

    bb.on("file", async (_, file, info) => {
      if (!MIME_TYPES.includes(info.mimeType)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid file type");
      }

      const extension = info.mimeType.split("/")[1];

      const filePath = getPath(video.videoId, extension);

      video.extension = extension;

      await video.save();

      const stream = fs.createWriteStream(filePath);

      file.pipe(stream);
    });

    bb.on("close", () => {
      res.writeHead(StatusCodes.CREATED, {
        Connection: "close",
        "Content-Type": "application/json",
      });

      res.write(JSON.stringify(video));
      res.end();
    });

    return req.pipe(bb);
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Could not create video: ${error.message}`);
  }
}

export async function updateVideo(
  req: Request<updateVideoParamsType, {}, UpdateVideoBodyType>,
  res: Response
) {
  const { videoId } = req.params;
  const { title, description, published } = req.body;

  const { _id: userId } = res.locals.user;

  const video = await findVideo(videoId);

  if (!video) return res.status(StatusCodes.NOT_FOUND).send("Video not found.");

  if (String(video.owner) !== String(userId))
    return res.status(StatusCodes.UNAUTHORIZED).send("Not authorized.");

  video.title = title;
  video.description = description;
  video.published = published;

  await video.save();

  return res.status(StatusCodes.OK).send(video);
}
