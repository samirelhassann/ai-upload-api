import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

import { InvalidFileExtension } from "../errors/invalidFileExtension";
import { NoFileUploaded } from "../errors/noFileUploadedError";
import { VideosRepository } from "@/repositories/videosRepository";
import { formatFileName } from "@/utils/formatFileName";
import { MultipartFile } from "@fastify/multipart";
import { Video } from "@prisma/client";

const pump = promisify(pipeline);

interface CreateVideoUseCaseRequest {
  video: MultipartFile | undefined;
}

interface CreateVideoUseCaseResponse {
  info: Video;
}

export class CreateVideoUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute({
    video,
  }: CreateVideoUseCaseRequest): Promise<CreateVideoUseCaseResponse> {
    if (!video) {
      throw new NoFileUploaded();
    }

    const extension = path.extname(video.filename);

    if (extension !== ".mp3") {
      throw new InvalidFileExtension();
    }

    const fileBaseName = path.basename(video.filename, extension);
    const fileUploadName = formatFileName(fileBaseName, extension);
    const uploadDestination = path.resolve(
      __dirname,
      "../../tmp",
      fileUploadName
    );

    await pump(video.file, fs.createWriteStream(uploadDestination));

    const info = await this.videosRepository.create(
      video.filename,
      uploadDestination
    );

    return { info };
  }
}
