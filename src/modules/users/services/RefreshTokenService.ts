/* eslint-disable no-useless-constructor */
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import AppError from "@shared/errors/AppError";

import ITokenProvider from "../providers/Token/models/ITokenProvider";
import ITokenRepository from "../repositories/ITokenRepository";

interface IResponse {
  refreshToken: string;
}

interface IRequest {
  id: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject("TokenRepository")
    private refreshTokenRepository: ITokenRepository,

    @inject("JWTProvider")
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const token = await this.refreshTokenRepository.findById(id);

    if (!token) {
      throw new AppError("Refresh Token inválido.");
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(token.expiresIn));

    if (refreshTokenExpired) {
      throw new AppError("Refresh Token Expired", 401);
    }

    const refreshToken = this.tokenProvider.generateToken(
      token.userId,
      auth.jwt.refreshTokenExpires,
    );

    return {
      refreshToken,
    };
  }
}

export { RefreshTokenService };
