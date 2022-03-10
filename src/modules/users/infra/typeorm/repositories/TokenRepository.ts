import { EntityRepository, getRepository, Repository } from "typeorm";

import { ICreateTokenDTO } from "@modules/users/dtos/ICreateTokenDTO";
import ITokenRepository from "@modules/users/repositories/ITokenRepository";

import RefreshToken from "../entities/RefreshToken";

@EntityRepository(RefreshToken)
class TokenRepository implements ITokenRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = getRepository(RefreshToken);
  }

  public async create(data: ICreateTokenDTO): Promise<RefreshToken> {
    const token = this.repository.create(data);

    await this.repository.save(token);

    return token;
  }

  public async findById(id: string): Promise<RefreshToken | undefined> {
    const token = await this.repository.findOne(id);

    return token;
  }

  public async deleteAll(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}

export default TokenRepository;
