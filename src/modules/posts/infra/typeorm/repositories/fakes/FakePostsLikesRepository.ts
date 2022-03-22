import { v4 as uuid } from "uuid";

import { ILikePostDTO } from "@modules/posts/dtos/ILikePostDTO";
import IPostLikeRepository from "@modules/posts/repositories/IPostLikeRepository";

import PostLike from "../../entities/PostLike";

class FakePostsLikesRepository implements IPostLikeRepository {
  private posts: PostLike[] = [];

  public async create(data: ILikePostDTO): Promise<PostLike> {
    const post = new PostLike();

    Object.assign(
      post,
      {
        id: uuid(),
      },
      data,
    );

    this.posts.push(post);

    return post;
  }

  public async verifyUserVotedOnPost(data: ILikePostDTO): Promise<boolean> {
    const verifyVoted = this.posts.some(
      likes => likes.post_id === data.post_id && likes.user_id === data.user_id,
    );
    return verifyVoted;
  }

  public async deletePostLike(data: ILikePostDTO): Promise<void> {
    const postWithDeletedLike = await this.posts.filter(
      likes => likes.post_id !== data.post_id && likes.user_id !== data.user_id,
    );

    this.posts = postWithDeletedLike;
  }
}

export default FakePostsLikesRepository;
