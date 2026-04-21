import { PrismaClient } from "@prisma/client";
import { dbConfig } from "./config";

const NODE_ENV = process.env.APP_ENV || "development";

export const prismaWrite = new PrismaClient(
  {
  datasources: {
    db: {
      url: dbConfig.writeDBConnString,
    },
  },
}
);

export const prismaRead = new PrismaClient(
  {
  datasources: {
    db: {
      url: dbConfig.readDBConnString,
    },
  },
}
);

export const verifyDbConnections = async (write = prismaWrite, read = prismaRead) => {
  try {
    await write.$connect();
    console.log("Write DB connection established successfully on:", NODE_ENV);

    await read.$connect();
    console.log("Read DB connection established successfully on:", NODE_ENV);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

export const closeDbConnections = async () => {
  try {
    await Promise.all([prismaWrite.$disconnect(), prismaRead.$disconnect()]);
  } catch (error) {
    console.log("Unable to close database connection:", error);
  }
};
