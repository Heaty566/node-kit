import path from "path";
import dotenv from "dotenv";
import express from "express";

dotenv.config({
        path: path.resolve(
                __dirname,
                `./src/config/.env.${process.env.NODE_ENV}`
        ),
});

import { initProd } from "./prod";
import { routers } from "./routes";
const app = express();

initProd(app);
routers(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
        console.log(`Listening on port ${port}`);
});
