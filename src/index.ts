import fastify from "fastify";
import { app } from "./app";
import { verifyDbConnections } from "./config/prisma";
import { HOST, PORT } from "./config/constants";

export const server = fastify({ logger: false });

const start = async () => {
  if (!process.env.privateKey) {
    console.error("FATAL ERROR: privateKey is not defined.");
    process.exit(1);
  }
  await verifyDbConnections();
  await server.register(app);
  await server.ready();
  await server.listen({ port: PORT, host: HOST });
  console.log(`Members Micro-Service Is Running on ${PORT}`);
};

start();
