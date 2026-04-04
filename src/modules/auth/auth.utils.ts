import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '@/config'

export const createToken = (
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: string,
) => jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions)

export const verifyToken = (token: string, secret: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload