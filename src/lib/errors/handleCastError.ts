import mongoose from "mongoose";
import { TErrorSources } from "../types/error";

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSources: TErrorSources = [
    { path: err?.path, message: err?.message },
  ];
  return { statusCode: 404, message: "Invalid Id", errorSources };
};

export default handleCastError;
