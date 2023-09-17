import { createReadStream } from "node:fs";

import { VideoNotFound } from "../errors/videoNotFound";
import { openai } from "@/lib/openai";
import { VideosRepository } from "@/repositories/videosRepository";

interface TranscriptUseCaseRequest {
  videoId: string;
  prompt: string;
}

interface TranscriptUseCaseResponse {
  transcription: string;
}

export class TranscriptUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute({
    videoId,
    prompt,
  }: TranscriptUseCaseRequest): Promise<TranscriptUseCaseResponse> {
    const video = await this.videosRepository.findById(videoId);

    if (!video) {
      throw new VideoNotFound();
    }

    const audioReadStream = createReadStream(video.path);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    const transcription = response.text;

    this.videosRepository.update({ ...video, transcription });

    return { transcription };
  }
}
