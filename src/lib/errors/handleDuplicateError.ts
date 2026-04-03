import { TErrorSources } from "../types/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any) => {
  const match = err.message.match(/:\s*["']([^"']+)["']/);
  const extractedMessage = match ? match[1] : null;
  const errorSources: TErrorSources = [
    { path: "", message: `${extractedMessage} already exists` },
  ];
  return { statusCode: 409, message: "Duplicate Entry", errorSources };
};

export default handleDuplicateError;
