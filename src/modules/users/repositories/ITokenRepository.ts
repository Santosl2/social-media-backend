import { ICreateTokenDTO } from "../dtos/ICreateTokenDTO";
import RefreshToken from "../infra/typeorm/entities/RefreshToken";

export default interface ITokenRepository {
  create(data: ICreateTokenDTO): Promise<RefreshToken>;
  findById(id: string): Promise<RefreshToken | undefined>;
  deleteAll(userId: string): Promise<void>;
}
