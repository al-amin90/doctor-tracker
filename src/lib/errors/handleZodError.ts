import { ZodError } from "zod";

const handleZodError = (err: ZodError) => {
  const errorSources = err.issues?.map((issue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue?.message,
  }));
  return { statusCode: 400, message: "Validation Error", errorSources };
};

export default handleZodError;
