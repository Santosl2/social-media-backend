import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAutenticated";

import PostsController from "../controllers/PostsController";

const postsRouter = Router();

const postsController = new PostsController();

postsRouter.get("/:page", ensureAuthenticated, postsController.index);
postsRouter.post(
  "/",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().required(),
    },
  }),
  postsController.create,
);

export default postsRouter;
