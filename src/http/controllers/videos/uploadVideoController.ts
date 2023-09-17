import { FastifyReply, FastifyRequest } from "fastify";

import { makeCreateVideoUseCase } from "@/useCases/videos/factories/makeCreateVideoUseCase";

export async function UploadVideoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const video = await request.file();

  await makeCreateVideoUseCase()
    .execute({
      video,
    })
    .then((response) => reply.status(200).send(response));
}
