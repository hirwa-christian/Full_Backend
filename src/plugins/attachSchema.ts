import fp from "fastify-plugin";
import { routeSchemas } from "../schemas/index";

async function attachSchemas(fastify: {
  addHook: (arg0: string, arg1: (routeOptions: any) => void) => void;
}) {
  // after all routes registered, iterate over routeSchemas and add schemas
  fastify.addHook("onRoute", (routeOptions: { method: any; url: any; schema: any }) => {
    const key = `${routeOptions.method} ${routeOptions.url}`;
    // @ts-ignore
    const schemas = routeSchemas[key];
    if (schemas) {
      routeOptions.schema = schemas;
    }
  });
}

export default fp(attachSchemas);
