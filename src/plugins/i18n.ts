import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import i18next, { TFunction } from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";

const i18nPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await i18next.use(Backend).init({
    fallbackLng: "en",
    preload: ["en", "fr", "kin"],
    backend: {
      loadPath: path.join(__dirname, "../../locales/{{lng}}.json"),
    },
    interpolation: {
      escapeValue: false,
    },
  });

  fastify.decorate("t", undefined as unknown as TFunction);
  fastify.decorateRequest("t", undefined as unknown as TFunction);

  fastify.addHook("onRequest", async (request) => {
    const lang = request.headers["accept-language"]?.split(",")[0] || "en";
    const fixedT = i18next.getFixedT(lang);
    const customT: TFunction = ((key: string, options?: any) => {
      const result = fixedT(key, options);
      if (!result || result === key) {
        return key;
      }
      return result;
    }) as TFunction;
    // @ts-expect-error
    customT.$TFunctionBrand = true;
    request.t = customT;
    fastify.t = customT;
  });
});

export default i18nPlugin;
