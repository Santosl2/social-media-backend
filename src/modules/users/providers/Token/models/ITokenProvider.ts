export default interface ITokenProvider {
  generateToken(payload: string, expireDate?: string): string;
}
