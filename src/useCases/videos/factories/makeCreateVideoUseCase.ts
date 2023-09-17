import { CreateVideoUseCase } from "../createVideoUseCase";
import { PrismaVideosRepository } from "@/repositories/prisma/prismaVideosRepository";

export function makeCreateVideoUseCase() {
  const promptsRepository = new PrismaVideosRepository();
  const useCase = new CreateVideoUseCase(promptsRepository);

  return useCase;
}
