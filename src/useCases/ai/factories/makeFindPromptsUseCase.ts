import { CompletionUseCase } from "../completionUseCase";
import { PrismaVideosRepository } from "@/repositories/prisma/prismaVideosRepository";

export function makeCompletionUseCase() {
  const repository = new PrismaVideosRepository();
  const useCase = new CompletionUseCase(repository);

  return useCase;
}
