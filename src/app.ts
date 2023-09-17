/* eslint-disable no-console */
import fastify from "fastify";
import { ZodError } from "zod";

import { env } from "./env";
import { AIRoutes } from "./http/controllers/ai/routes";
import { PromptRoutes } from "./http/controllers/prompts/routes";
import { VideoRoutes } from "./http/controllers/videos/routes";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 25, // 25mb
  },
});

app.register(PromptRoutes, { prefix: "/prompts" });
app.register(VideoRoutes, { prefix: "/videos" });
app.register(AIRoutes, { prefix: "/ai" });

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    // eslint-disable-next-line consistent-return, array-callback-return
    const errors = error.issues.map((issue) => {
      if (issue.code === "invalid_type") {
        return `field(s) '${issue.path.join(
          ","
        )}' ${issue.message.toLowerCase()}`;
      }

      if (issue.code === "unrecognized_keys") {
        return `field(s) '${issue.keys.join(",")}' not recognized`;
      }
    });

    return reply.code(400).send({ message: "Validation error.", errors });
  }

  if (env.NODE_ENV !== "prod") {
    // eslint-disable-next-line no-console
    console.error(error);
  } else {
    // TODO: Add more details to the error
  }

  return reply.code(500).send({ message: error.message });
});
