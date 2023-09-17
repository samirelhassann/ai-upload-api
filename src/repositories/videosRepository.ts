import { Video } from "@prisma/client";

export interface VideosRepository {
  create(name: string, path: string): Promise<Video>;

  findById(id: string): Promise<Video | null>;

  update(video: Video): Promise<Video>;
}
