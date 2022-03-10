/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";

import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import Post from "../infra/typeorm/entities/Post";
import IPostRepository from "../repositories/IPostRepository";

@injectable()
class CreatePostService {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ content, user_id }: ICreatePostDTO): Promise<Post> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuário inválido");
    }

    const post = await this.postsRepository.create({ user_id, content });

    return post;
  }
}

export { CreatePostService };
