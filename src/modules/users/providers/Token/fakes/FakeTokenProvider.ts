import ITokenProvider from "../models/ITokenProvider";

export default class FakeTokenProvider implements ITokenProvider {
  public generateToken(payload: string, expireDate?: string): string {
    return payload;
  }
}
