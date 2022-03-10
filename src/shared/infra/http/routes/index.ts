/* eslint-disable import/extensions */
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import postsRouter from "@modules/posts/infra/http/routes/posts.routes";
import RefreshTokenController from "@modules/users/infra/http/controllers/RefreshTokenController";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/posts", postsRouter);
routes.post(
  "/refresh-token",
  celebrate({
    [Segments.BODY]: {
      refreshToken: Joi.string().uuid().required(),
    },
  }),
  new RefreshTokenController().create,
);

export default routes;
