import { Prompt } from "@prisma/client";

export interface PromptsRepository {
  findMany(): Promise<Prompt[]>;
}
