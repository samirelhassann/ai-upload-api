import { FastifyInstance } from "fastify";

import { CompletionController } from "./completionController";

export async function AIRoutes(app: FastifyInstance) {
  app.post("/completion", CompletionController);
}
