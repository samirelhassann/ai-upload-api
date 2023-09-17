import { FindPromptsUseCase } from "../findPromptsUseCase";
import { PrismaPromptsRepository } from "@/repositories/prisma/prismaPromptsRepository";

export function makeFindPromptsUseCase() {
  const promptsRepository = new PrismaPromptsRepository();
  const useCase = new FindPromptsUseCase(promptsRepository);

  return useCase;
}
