import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenService } from "@modules/users/services/RefreshTokenService";

class RefreshTokenController {
  public async create(request: Request, response: Response) {
    const { refreshToken } = request.body;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const { refreshToken: token } = await refreshTokenService.execute({
      id: refreshToken,
    });

    return response.json({ refreshToken: token });
  }
}

export default RefreshTokenController;
