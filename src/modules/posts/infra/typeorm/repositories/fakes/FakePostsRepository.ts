import { v4 as uuid } from "uuid";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import IPostRepository, {
  ResponseReturn,
} from "@modules/posts/repositories/IPostRepository";

import Post from "../../entities/Post";

class FakePostsRepository implements IPostRepository {
  private posts: Post[] = [];

  public async create(data: ICreatePostDTO): Promise<Post> {
    const post = new Post();

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

  public async findById(id: string): Promise<Post | undefined> {
    const findPost = this.posts.find(post => post.id === id);

    return findPost;
  }

  public async findAll(
    take: number,
    page: number,
  ): Promise<ResponseReturn | undefined> {
    return {
      rows: this.posts,
      totalRegs: [{ total: 1 }],
    };
  }
}

export default FakePostsRepository;
