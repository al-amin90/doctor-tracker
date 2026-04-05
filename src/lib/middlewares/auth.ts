import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "@/lib/errors/AppError";
import { handleError } from "@/lib/utils/catchAsync";
import { Handler, IAuthRequest } from "@/modules/auth/auth.interface";
import status from "http-status";
import { verifyToken } from "@/modules/auth/auth.utils";

export type TUserRole = "admin" | "user";

const auth = (...requiredRoles: TUserRole[]) => {
  return (handler: Handler): Handler => {
    return async (req: NextRequest, context?: any) => {
      try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
          throw new AppError(status.FORBIDDEN, "You are not authorized!");
        }

        const cookieToken = req.cookies.get("accessToken")?.value;
        const token = authHeader?.split(" ")[1] || cookieToken;

        if (!token) {
          throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
        }

        const decoded = verifyToken(
          token,
          process.env.JWT_ACCESS_TOKEN as string,
        );

        if (
          requiredRoles.length &&
          !requiredRoles.includes(decoded.role as TUserRole)
        ) {
          throw new AppError(status.FORBIDDEN, "You are not authorized!");
        }

        const authenticatedReq = req as IAuthRequest;
        authenticatedReq.user = decoded;

        return await handler(authenticatedReq, context);
      } catch (error) {
        return handleError(error);
      }
    };
  };
};

export default auth;
