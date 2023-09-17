import { FastifyInstance } from "fastify";

import { TranscriptionController } from "./transcriptionController";
import { UploadVideoController } from "./uploadVideoController";

export async function VideoRoutes(app: FastifyInstance) {
  app.post("/upload", UploadVideoController);
  app.post("/:videoId/transcription", TranscriptionController);
}
