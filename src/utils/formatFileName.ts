import { format } from "date-fns";

export function formatFileName(fileName: string, extension: string): string {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd-HHmmssSSS");
  return `${fileName}-${formattedDate}${extension}`;
}
