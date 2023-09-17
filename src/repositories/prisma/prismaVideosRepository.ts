import { VideosRepository } from "../videosRepository";
import { prisma } from "@/lib/prisma";
import { Video } from "@prisma/client";

export class PrismaVideosRepository implements VideosRepository {
  findById(id: string) {
    return prisma.video.findUnique({
      where: {
        id,
      },
    });
  }

  create(name: string, path: string) {
    return prisma.video.create({
      data: {
        name,
        path,
      },
    });
  }

  update(video: Video) {
    return prisma.video.update({
      where: {
        id: video.id,
      },
      data: {
        transcription: video.transcription,
      },
    });
  }
}
