import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "@modules/users/services/AuthenticateUserService";

class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthenticateUserService);

    const {
      user,
      token,
      refreshToken: { id },
    } = await authUser.execute({
      email,
      password,
    });

    return response.json({ user, token, refreshToken: id });
  }
}

export default SessionsController;
