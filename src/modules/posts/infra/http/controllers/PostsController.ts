/* eslint-disable camelcase */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePostService } from "@modules/posts/services/CreatePostService";
import { GetPostsServices } from "@modules/posts/services/GetPostsService";

class PostsController {
  public async create(request: Request, response: Response) {
    const user_id = request.user.id;
    const { content } = request.body;

    const postService = container.resolve(CreatePostService);

    const post = await postService.execute({
      user_id,
      content,
    });

    return response.status(201).json({ post });
  }

  public async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const { page } = request.params;
    const postService = container.resolve(GetPostsServices);

    const posts = await postService.execute({
      page,
      user_id,
    });

    return response.json(posts);
  }
}

export default PostsController;
