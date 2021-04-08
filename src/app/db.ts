import { MongoClient, Db } from "mongodb";
import mongodbURI from "mongodb-uri";

import { logger } from "./logging";

let db: Db;

export const initDb = () => {
        MongoClient.connect(
                process.env.DB_URL,
                { useUnifiedTopology: true },
                (error, result) => {
                        if (error)
                                return logger.error(
                                        `Connect to mongodb failed: ${error.message}`
                                );

                        const dbInfo = mongodbURI.parse(process.env.DB_URL);
                        db = result.db("appName");

                        logger.info(
                                `Connect to ${dbInfo.database} database successfully on host: ${dbInfo.hosts[0].host}`
                        );
                }
        );
};

export const getDb = () => {
        if (!db) {
                logger.error("You have to initialized DB");
        }

        return db;
};
