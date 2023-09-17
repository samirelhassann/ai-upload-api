export class NoFileUploaded extends Error {
  constructor() {
    super("No file uploaded");
  }
}
