import FakeUsersRepository from "@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";

import FakePostsRepository from "../infra/typeorm/repositories/fakes/FakePostsRepository";
import { CreatePostService } from "./CreatePostService";

let fakePostsRepository: FakePostsRepository;
let createPostService: CreatePostService;
let fakeUsersRepository: FakeUsersRepository;

describe("CreatePostService", () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createPostService = new CreatePostService(
      fakePostsRepository,
      fakeUsersRepository,
    );
  });

  it("should be able to create a new post", async () => {
    const user = await fakeUsersRepository.create({
      email: "mfilype@gmail.com",
      name: "mfilype",
      password: "123",
    });

    const post = await createPostService.execute({
      user_id: user.id,
      content: "Test",
    });

    expect(post).toHaveProperty("id");
    expect(post.content).toBe("Test");
  });

  it("should not be able to create a new post if user not exists", async () => {
    await expect(
      createPostService.execute({
        user_id: "1",
        content: "Test",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
