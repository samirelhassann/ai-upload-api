import { ChatCompletion } from "openai/resources/chat/completions";

import { TranscriptionNotFound } from "../errors/transcriptionNotFound";
import { VideoNotFound } from "../errors/videoNotFound";
import { openai } from "@/lib/openai";
import { VideosRepository } from "@/repositories/videosRepository";

interface CompletionUseCaseRequest {
  videoId: string;
  template: string;
  temperature: number;
}

interface CompletionUseCaseResponse {
  completion: ChatCompletion;
}

export class CompletionUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute({
    videoId,
    template,
    temperature,
  }: CompletionUseCaseRequest): Promise<CompletionUseCaseResponse> {
    const video = await this.videosRepository.findById(videoId);

    if (!video) {
      throw new VideoNotFound();
    }

    if (!video.transcription) {
      throw new TranscriptionNotFound();
    }

    const promptMessage = template.replace(
      "{transcription}",
      video.transcription
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature,
      messages: [{ role: "user", content: promptMessage }],
    });

    return { completion };
  }
}
