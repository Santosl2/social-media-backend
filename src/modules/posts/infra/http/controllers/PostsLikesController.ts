/* eslint-disable camelcase */
import { Request, Response } from "express";
import { container } from "tsyringe";

import { LikePostService } from "@modules/posts/services/LikePostService";

class PostsLikesController {
  public async create(request: Request, response: Response) {
    const user_id = request.user.id;
    const { post_id } = request.body;

    const postService = container.resolve(LikePostService);

    const post = await postService.execute({
      user_id,
      post_id,
    });

    return response.status(201).json(post);
  }
}

export default PostsLikesController;
