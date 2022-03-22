/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";

import { ILikePostDTO } from "../dtos/ILikePostDTO";
import IPostLikeRepository from "../repositories/IPostLikeRepository";
import IPostRepository from "../repositories/IPostRepository";

interface IResponse {
  voted: boolean;
}

@injectable()
class LikePostService {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("PostsLikesRepository")
    private postLikesRepository: IPostLikeRepository,
  ) {}

  public async execute({ post_id, user_id }: ILikePostDTO): Promise<IResponse> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError("Postagem não existe");
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário inválido");
    }

    const verifyVoted = await this.postLikesRepository.verifyUserVotedOnPost({
      post_id,
      user_id,
    });

    if (verifyVoted) {
      await this.postLikesRepository.deletePostLike({
        post_id,
        user_id,
      });

      return {
        voted: false,
      };
    }

    await this.postLikesRepository.create({
      post_id,
      user_id,
    });

    return {
      voted: true,
    };
  }
}

export { LikePostService };
