import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import noteRouter from "./apps/note.js";
import authRouter from "./apps/auth.js";
import catRouter from "./apps/category.js";
async function init() {
  dotenv.config();
  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/note", noteRouter);
  app.use("/auth", authRouter);
  app.use("/category", catRouter);
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });
  app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  });
}
init();
