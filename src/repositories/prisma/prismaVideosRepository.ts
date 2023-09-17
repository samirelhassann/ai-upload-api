import { VideosRepository } from "../videosRepository";
import { prisma } from "@/lib/prisma";

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

  updateTranscription(videoId: string, transcription: string) {
    return prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
      },
    });
  }
}
