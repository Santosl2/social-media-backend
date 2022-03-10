import { sign } from "jsonwebtoken";

import auth from "@config/auth";

import ITokenProvider from "../models/ITokenProvider";

export default class JWTokenProvider implements ITokenProvider {
  public generateToken(payload: string, expireDate?: string): string {
    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: payload,
      expiresIn: expireDate || expiresIn,
    });

    return token;
  }
}
