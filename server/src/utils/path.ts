import { Video } from "../modules/videos/videos.model";

export function getPath(
  videoId: Video["videoId"],
  extension: Video["extension"]
) {
  return `${process.cwd()}/videos/${videoId}.${extension}`;
}
