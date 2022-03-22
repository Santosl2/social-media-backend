import "@modules/users/providers";
import { container } from "tsyringe";

import PostsLikesRepository from "@modules/posts/infra/typeorm/repositories/PostsLikesRepository";
import PostsRepository from "@modules/posts/infra/typeorm/repositories/PostsRepository";
import IPostLikeRepository from "@modules/posts/repositories/IPostLikeRepository";
import IPostRepository from "@modules/posts/repositories/IPostRepository";
import TokenRepository from "@modules/users/infra/typeorm/repositories/TokenRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import ITokenRepository from "@modules/users/repositories/ITokenRepository";
import IUsersRepository from "@modules/users/repositories/IUserRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<ITokenRepository>(
  "TokenRepository",
  TokenRepository,
);

container.registerSingleton<IPostRepository>(
  "PostsRepository",
  PostsRepository,
);

container.registerSingleton<IPostLikeRepository>(
  "PostsLikesRepository",
  PostsLikesRepository,
);
