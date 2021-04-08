import express, { Express, json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongodbSession from "connect-mongodb-session";
import session from "express-session";

import morgan from "morgan";
const MongoDbStore = mongodbSession(session);
const sessionStore = new MongoDbStore({
        uri: process.env.DB_URL,
        collection: "session",
        expires: 86400 * 30,
});

export const routers = (app: Express) => {
        app.use(json());
        app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
        app.use(morgan("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(process.cwd() + "/public"));
        //main routers
        app.use(
                session({
                        secret: process.env.SESSION_SECRET,
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
