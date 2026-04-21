import fastify from "fastify";
import { app } from "../app";

export function build() {
  const instance = fastify();
  instance.register(app);
  return instance;
}
