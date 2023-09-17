import { FastifyInstance } from "fastify";

import { FindPromptsController } from "./findPromptsController";

export async function PromptRoutes(app: FastifyInstance) {
  app.get("/list", FindPromptsController);
}
