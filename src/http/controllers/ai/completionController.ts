import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCompletionUseCase } from "@/useCases/ai/factories/makeFindPromptsUseCase";

export async function CompletionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    videoId: z.string(),
    template: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
  });

  await makeCompletionUseCase()
    .execute({ ...bodySchema.parse(request.body) })
    .then((response) => reply.status(200).send(response));
}
