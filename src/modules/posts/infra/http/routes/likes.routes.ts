import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAutenticated";

import PostsLikesController from "../controllers/PostsLikesController";

const likesRouter = Router();

const postsController = new PostsLikesController();

likesRouter.post(
  "/",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      post_id: Joi.string().required(),
    },
  }),
  postsController.create,
);

export default likesRouter;
