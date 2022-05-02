import busboy from "busboy";
import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import { CHUNK_SIZE_IN_BYTES, MIME_TYPES } from "../../constants";
import { getPath } from "../../utils";
import { UpdateVideoBodyType, updateVideoParamsType } from "./videos.schema";
import { createVideo, findVideo, findVideos } from "./videos.service";

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

export async function fetchVideos(_: Request, res: Response) {
  try {
    const videos = await findVideos();
    if (!videos)
      return res.status(StatusCodes.NOT_FOUND).send("No videos found.");

    return res.status(StatusCodes.OK).send(videos);
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`Error fetching videos: ${JSON.stringify(error)}`);
  }
}

export async function streamVideo(req: Request, res: Response) {
  const { videoId } = req.params;

  const range = req.headers.range;

  if (!range)
    return res.status(StatusCodes.BAD_REQUEST).send("Range must be provided");

  try {
    const video = await findVideo(videoId);
    if (!video)
      return res.status(StatusCodes.NOT_FOUND).send("Video not found.");

    const filePath = getPath(videoId, video.extension);

    const fileSizeInBytes = fs.statSync(filePath).size;

    // Stay within file range
    const chunkStart = Number(range.replace(/\D/g, ""));
    const chunkEnd = Math.min(
      chunkStart + CHUNK_SIZE_IN_BYTES,
      fileSizeInBytes - 1
    );

    const contentLength = chunkEnd - chunkStart + 1;

    const headers = {
      "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${fileSizeInBytes}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": `video/${video.extension}`,
      "Cross-Origin-Resource-Policy": "cross-origin",
    };

    res.writeHead(StatusCodes.PARTIAL_CONTENT, headers);

    // Create read stream
    const videoStream = fs.createReadStream(filePath, {
      start: chunkStart,
      end: chunkEnd,
    });

    videoStream.pipe(res);
  } catch (error) {}
}
