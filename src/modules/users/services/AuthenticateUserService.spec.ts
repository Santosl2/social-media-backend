import AppError from "@shared/errors/AppError";

import FakeTokenRepository from "../infra/typeorm/repositories/fakes/FakeTokenRepository";
import FakeUsersRepository from "../infra/typeorm/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeTokenProvider from "../providers/Token/fakes/FakeTokenProvider";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { CreateUserService } from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let createUser: CreateUserService;
let authenticateUserService: AuthenticateUserService;
let fakeTokenRepository: FakeTokenRepository;
describe("AuthenticateUserService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();
    fakeTokenRepository = new FakeTokenRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeTokenRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it("should not be able to auth user if user not exists", async () => {
    await expect(
      authenticateUserService.execute({
        email: "john@doe.com",
        password: "opa",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to auth user", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "opa",
    });

    const response = await authenticateUserService.execute({
      email: "john@doe.com",
      password: "opa",
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate user if password is incorrect", async () => {
    await createUser.execute({
      name: "John Doe",
      password: "123456jesus",
      email: "jhon@doe.com",
    });

    expect(
      authenticateUserService.execute({
        email: "jhon@doe.com",
        password: "1100",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
