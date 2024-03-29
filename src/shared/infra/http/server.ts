/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import "dotenv/config";
import "reflect-metadata";
import { isCelebrateError } from "celebrate";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "../typeorm";

import AppError from "@shared/errors/AppError";

import "@shared/container";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
// app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (isCelebrateError(err)) {
    const errorBody = err.details.get("body");

    return response.status(400).json({
      status: "error",
      message: errorBody?.message,
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.errorType,
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
