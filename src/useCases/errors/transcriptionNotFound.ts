export class TranscriptionNotFound extends Error {
  constructor() {
    super("The transcription could not be found.");
  }
}
