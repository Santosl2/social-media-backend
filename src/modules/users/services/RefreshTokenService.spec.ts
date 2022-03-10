import auth from "@config/auth";
import AppError from "@shared/errors/AppError";

import FakeTokenRepository from "../infra/typeorm/repositories/fakes/FakeTokenRepository";
import FakeTokenProvider from "../providers/Token/fakes/FakeTokenProvider";
import { RefreshTokenService } from "./RefreshTokenService";

let fakeTokenRepository: FakeTokenRepository;
let fakeTokenProvider: FakeTokenProvider;
let refreshTokenService: RefreshTokenService;

describe("RefreshTokenService.spec", () => {
  beforeEach(() => {
    fakeTokenRepository = new FakeTokenRepository();
    fakeTokenProvider = new FakeTokenProvider();

    refreshTokenService = new RefreshTokenService(
      fakeTokenRepository,
      fakeTokenProvider,
    );
  });

  it("should not be able to generate token if token not exists", async () => {
    await expect(
      refreshTokenService.execute({ id: "1" }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to generate token if token exists", async () => {
    const token = await fakeTokenRepository.create({
      expiresIn: new Date().getTime() + 86400,
      userId: "1",
    });

    const generateToken = jest.spyOn(fakeTokenProvider, "generateToken");

    const tokenCreate = await refreshTokenService.execute({ id: token.id });

    expect(generateToken).toBeCalledWith(
      token.userId,
      auth.jwt.refreshTokenExpires,
    );
    expect(tokenCreate).toHaveProperty("refreshToken");
  });
});
