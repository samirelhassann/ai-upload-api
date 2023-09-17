import { PromptsRepository } from "@/repositories/promptsRepository";
import { Prompt } from "@prisma/client";

interface FindPromptsUseCaseResponse {
  prompts: Prompt[];
}

export class FindPromptsUseCase {
  constructor(private promptsRepository: PromptsRepository) {}

  async execute(): Promise<FindPromptsUseCaseResponse> {
    const prompts = await this.promptsRepository.findMany();

    return { prompts };
  }
}
