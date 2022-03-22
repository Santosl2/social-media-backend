/* eslint-disable default-param-last */
import { EntityRepository, getRepository, Repository } from "typeorm";

import { ILikePostDTO } from "@modules/posts/dtos/ILikePostDTO";
import IPostLikeRepository from "@modules/posts/repositories/IPostLikeRepository";

import PostLike from "../entities/PostLike";

@EntityRepository(PostLike)
class PostsLikesRepository implements IPostLikeRepository {
  private repository: Repository<PostLike>;

  constructor() {
    this.repository = getRepository(PostLike);
  }

  public async create(data: ILikePostDTO): Promise<PostLike> {
    const post = this.repository.create(data);

    await this.repository.save(post);

    return post;
  }

  public async verifyUserVotedOnPost(data: ILikePostDTO): Promise<boolean> {
    const hasVote = await this.repository.find({
      where: {
        post_id: data.post_id,
        user_id: data.user_id,
      },
    });

    return hasVote.length > 0;
  }

  public async deletePostLike(data: ILikePostDTO): Promise<void> {
    const findToDelete = await this.repository.findOne({
      where: {
        post_id: data.post_id,
        user_id: data.user_id,
      },
    });

    if (findToDelete) {
      await this.repository.delete(findToDelete);
    }
  }
}

export default PostsLikesRepository;
