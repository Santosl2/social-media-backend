import { ILikePostDTO } from "../dtos/ILikePostDTO";
import PostLike from "../infra/typeorm/entities/PostLike";

export default interface IPostLikeRepository {
  create(data: ILikePostDTO): Promise<PostLike>;
  verifyUserVotedOnPost(data: ILikePostDTO): Promise<boolean>;
  deletePostLike(data: ILikePostDTO): Promise<void>;
}
