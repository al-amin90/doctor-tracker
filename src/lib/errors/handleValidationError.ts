import mongoose from "mongoose";
import { TErrorSources } from "../types/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TErrorSources = Object.values(err?.errors)?.map(
    (v: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: v?.path,
      message: v?.message,
    }),
  );
  return { statusCode: 400, message: "Validation Error", errorSources };
};

export default handleValidationError;
