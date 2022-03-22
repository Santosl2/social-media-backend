/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from "tsyringe";

import { PAGINATION_TOTAL_ITEMS } from "@config/pagination";
import AppError from "@shared/errors/AppError";

import Post from "../infra/typeorm/entities/Post";
import IPostRepository from "../repositories/IPostRepository";

interface IRequest {
  page: any;
  user_id: string;
}

interface IResponse {
  posts: Post[];
  totalPages: number;
  page: number;
}

@injectable()
class GetPostsServices {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostRepository,
  ) {}

  public async execute({ page, user_id }: IRequest): Promise<IResponse> {
    const posts = await this.postsRepository.findAll(
      PAGINATION_TOTAL_ITEMS,
      page,
      user_id,
    );

    if (!posts) {
      throw new AppError("Post inválido");
    }

    const totalRegs = posts.totalRegs[0].total;
    const totalPages = Math.ceil(totalRegs / PAGINATION_TOTAL_ITEMS);

    return {
      posts: posts.rows,
      totalPages,
      page,
    };
  }
}

export { GetPostsServices };
