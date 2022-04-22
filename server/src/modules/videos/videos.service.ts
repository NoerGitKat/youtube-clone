import { VideoModel } from "./videos.model";

export function createVideo(owner: string) {
  return VideoModel.create({ owner });
}
