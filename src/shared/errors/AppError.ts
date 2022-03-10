class Error {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly errorType: string;

  constructor(message: string, statusCode = 400, errorType = "error") {
    this.message = message;
    this.statusCode = statusCode;
    this.errorType = errorType;
  }
}

export default Error;
