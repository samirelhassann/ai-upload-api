import { PromptsRepository } from "../promptsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaPromptsRepository implements PromptsRepository {
  async findMany() {
    return prisma.prompt.findMany({});
  }
}
