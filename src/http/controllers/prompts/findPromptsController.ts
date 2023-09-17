import { FastifyReply, FastifyRequest } from "fastify";

import { makeFindPromptsUseCase } from "@/useCases/prompts/factories/makeFindPromptsUseCase";

export async function FindPromptsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await makeFindPromptsUseCase()
    .execute()
    .then((response) => reply.status(200).send(response));
}
