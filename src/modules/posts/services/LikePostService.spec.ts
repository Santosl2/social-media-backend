import FakeUsersRepository from "@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";

import FakePostsLikesRepository from "../infra/typeorm/repositories/fakes/FakePostsLikesRepository";
import FakePostsRepository from "../infra/typeorm/repositories/fakes/FakePostsRepository";
import { LikePostService } from "./LikePostService";

let fakePostsRepository: FakePostsRepository;
let likePostService: LikePostService;
let fakeUsersRepository: FakeUsersRepository;
let fakePostsLikesRepository: FakePostsLikesRepository;

describe("LikePostService", () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsLikesRepository = new FakePostsLikesRepository();

    likePostService = new LikePostService(
      fakePostsRepository,
      fakeUsersRepository,
      fakePostsLikesRepository,
    );
  });

  it("should not be able to like a post if posts not exits", async () => {
    await expect(
      likePostService.execute({
        post_id: "123",
        user_id: "123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to like a post if user not exits", async () => {
    const createPost = await fakePostsRepository.create({
      content: "ahahha",
      user_id: "122",
    });

    await expect(
      likePostService.execute({
        post_id: createPost.id,
        user_id: "123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to like a post ", async () => {
    const user = await fakeUsersRepository.create({
      email: "opa@gmail.com",
      name: "matheus",
      password: "123",
    });

    const createPost = await fakePostsRepository.create({
      content: "ahahha",
      user_id: user.id,
    });

    const likePost = await likePostService.execute({
      post_id: createPost.id,
      user_id: user.id,
    });

    expect(likePost).toHaveProperty("voted");
  });
});
