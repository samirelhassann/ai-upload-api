import { OpenAIStream } from "ai";

import { TranscriptionNotFound } from "../errors/transcriptionNotFound";
import { VideoNotFound } from "../errors/videoNotFound";
import { openai } from "@/lib/openai";
import { VideosRepository } from "@/repositories/videosRepository";

interface CompletionUseCaseRequest {
  videoId: string;
  prompt: string;
  temperature: number;
}

interface CompletionUseCaseResponse {
  stream: ReadableStream<string>;
}

export class CompletionUseCase {
  constructor(private videosRepository: VideosRepository) {}

  async execute({
    videoId,
    prompt,
    temperature,
  }: CompletionUseCaseRequest): Promise<CompletionUseCaseResponse> {
    const video = await this.videosRepository.findById(videoId);

    if (!video) {
      throw new VideoNotFound();
    }

    if (!video.transcription) {
      throw new TranscriptionNotFound();
    }

    const promptMessage = prompt.replace(
      "{transcription}",
      video.transcription
    );

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature,
      messages: [{ role: "user", content: promptMessage }],
      stream: true,
    });

    const stream = OpenAIStream(response);

    return { stream };
  }
}
