/* eslint-disable no-useless-constructor */
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import RefreshToken from "../infra/typeorm/entities/RefreshToken";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import ITokenProvider from "../providers/Token/models/ITokenProvider";
import ITokenRepository from "../repositories/ITokenRepository";
import IUsersRepository from "../repositories/IUserRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refreshToken: RefreshToken;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("TokenRepository")
    private refreshTokenRepository: ITokenRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("JWTProvider")
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const matchPassword = await this.hashProvider.compareHash(
      password,
      user.password || "",
    );

    delete user.password;

    if (!matchPassword) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const token = this.tokenProvider.generateToken(user.id);
    const expiresIn = dayjs().add(1, "day").unix();

    await this.refreshTokenRepository.deleteAll(user.id);

    const refreshToken = await this.refreshTokenRepository.create({
      userId: user.id,
      expiresIn,
    });

    return {
      user,
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserService };
