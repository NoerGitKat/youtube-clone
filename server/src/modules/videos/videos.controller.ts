import busboy from "busboy";
import fs from "fs";
import { ErrorRequestHandler, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MIME_TYPES } from "../../constants";
import { getPath } from "../../utils";
import { createVideo } from "./videos.service";

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
