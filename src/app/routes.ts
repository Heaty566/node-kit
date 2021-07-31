import express, { Express, json } from "express";
import cors from "cors";

import mongodbSession from "connect-mongodb-session";
import session from "express-session";

import morgan from "morgan";
import { config } from "../../config";
const MongoDbStore = mongodbSession(session);
const sessionStore = new MongoDbStore({
        uri: config.DB_URL,
        collection: "session",
        expires: 86400 * 30,
});

export const routers = (app: Express) => {
        app.use(json());
        app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
        app.use(morgan("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(process.cwd() + "/public"));
        //main routers
        app.use(
                session({
                        secret: config.SESSION_SECRET,
                        name: "sessionId",
                        resave: true,
                        saveUninitialized: true,
                        store: sessionStore,
                        cookie: {
                                maxAge: 86400 * 30,
                        },
                })
        );

        app.get("/*", (req, res) => {
                res.sendFile(process.cwd() + "/public/index.html");
        });
};
