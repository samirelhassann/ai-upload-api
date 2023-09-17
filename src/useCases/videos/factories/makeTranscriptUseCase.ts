import { TranscriptUseCase } from "../transcriptUseCase";
import { PrismaVideosRepository } from "@/repositories/prisma/prismaVideosRepository";

export function makeTranscriptUseCase() {
  const repository = new PrismaVideosRepository();
  const useCase = new TranscriptUseCase(repository);

  return useCase;
}
