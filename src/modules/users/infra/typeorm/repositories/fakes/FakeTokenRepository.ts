import { v4 as uuid } from "uuid";

import { ICreateTokenDTO } from "@modules/users/dtos/ICreateTokenDTO";
import ITokenRepository from "@modules/users/repositories/ITokenRepository";

import RefreshToken from "../../entities/RefreshToken";

class FakeTokenRepository implements ITokenRepository {
  private tokens: RefreshToken[] = [];

  public async create(data: ICreateTokenDTO): Promise<RefreshToken> {
    const token = new RefreshToken();

    Object.assign(
      token,
      {
        id: uuid(),
      },
      data,
    );

    this.tokens.push(token);

    return token;
  }

  public async findById(id: string): Promise<RefreshToken | undefined> {
    const findToken = this.tokens.find(token => token.id === id);

    return findToken;
  }

  public async deleteAll(userId: string): Promise<void> {
    const deleteToken = this.tokens.filter(token => token.userId !== userId);

    this.tokens = deleteToken;
  }
}

export default FakeTokenRepository;
