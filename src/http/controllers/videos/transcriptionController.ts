import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeTranscriptUseCase } from "@/useCases/videos/factories/makeTranscriptUseCase";

export async function TranscriptionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    videoId: z.string().uuid(),
  });

  const bodySchema = z.object({
    prompt: z.string(),
  });

  await makeTranscriptUseCase()
    .execute({
      ...paramsSchema.parse(request.params),
      ...bodySchema.parse(request.body),
    })
    .then((response) => reply.status(200).send(response));
}
