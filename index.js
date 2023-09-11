import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import authRouter from "./features/auth/router";
//import merchantsController from './features/merchants/router'
import ratingsRouter from "./features/ratings/router";

import middlewares from "./middlewares";

dotenv.config();

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("MongoDb Error: ", err.message));
}

let app = express();
app.disable("etag");
app.enable("trust proxy");
app.use(logger("dev"));
app.use(express.static("public", { etag: false }));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/admin/auth", middlewares.adminPreAuth, authRouter);
app.use("/auth", middlewares.preAuth, authRouter);
// app.use('/merchants', middlewares.isAuth, merchantsController)
app.use("/ratings", middlewares.isAuth, ratingsRouter);

const PORT = process.env.serverPort;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
