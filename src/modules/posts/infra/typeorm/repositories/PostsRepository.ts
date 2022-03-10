/* eslint-disable default-param-last */
import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import IPostRepository, {
  QueryResponse,
  ResponseReturn,
} from "@modules/posts/repositories/IPostRepository";

import Post from "../entities/Post";

@EntityRepository(Post)
class PostsRepository implements IPostRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  public async create(data: ICreatePostDTO): Promise<Post> {
    const post = this.repository.create(data);

    await this.repository.save(post);

    return post;
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = this.repository.findOne(id);

    return post;
  }

  public async findAll(
    take = 1,
    page: number,
  ): Promise<Post[] | ResponseReturn | undefined> {
    const skip = take * (page - 1);

    const rows = (await this.repository.query(
      `select posts.id, posts.content, posts.created_at, users.name as author FROM posts INNER JOIN users  on users.id = posts.user_id order by created_at desc limit ${take} offset ${skip} `,
    )) as Post[];

    const totalRegs = (await this.repository.query(
      "select count(*) as total from posts",
    )) as QueryResponse[];

    return {
      rows,
      totalRegs,
    };
  }
}

export default PostsRepository;
