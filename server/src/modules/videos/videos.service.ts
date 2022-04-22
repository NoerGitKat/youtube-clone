import { Video, VideoModel } from "./videos.model";

export function createVideo(owner: string) {
  return VideoModel.create({ owner });
}

export function findVideo(videoId: Video["videoId"]) {
  return VideoModel.findOne({ videoId });
}
