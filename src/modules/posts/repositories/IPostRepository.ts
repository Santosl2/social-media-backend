import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import Post from "../infra/typeorm/entities/Post";

export interface QueryResponse {
  total: number;
}
export interface ResponseReturn {
  rows: Post[];
  totalRegs: QueryResponse[];
}

export default interface IPostRepository {
  findById(id: string): Promise<Post | undefined>;
  findAll(
    take: number,
    page: number,
    user_id?: string,
  ): Promise<ResponseReturn | undefined>;
  create(data: ICreatePostDTO): Promise<Post>;
}
