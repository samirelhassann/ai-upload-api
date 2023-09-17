import { streamToResponse } from "ai";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCompletionUseCase } from "@/useCases/ai/factories/makeFindPromptsUseCase";

export async function CompletionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    videoId: z.string(),
    prompt: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
  });

  await makeCompletionUseCase()
    .execute({ ...bodySchema.parse(request.body) })
    .then((response) =>
      streamToResponse(response.stream, reply.raw, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
      })
    );
}
