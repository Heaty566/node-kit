import express, { Express, json } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import doc from "./doc.json";

export const routers = (app: Express) => {
        app.use(json());
        app.use(cors({ origin: "*", credentials: true }));
        app.use(morgan("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(process.cwd() + "/"));
        //main routers
        app.use("/doc", swaggerUi.serve, swaggerUi.setup(doc));
        app.get("/test", (req, res) => {
                res.sendFile(process.cwd() + "/test/lcov-report/index.html");
        });
};
