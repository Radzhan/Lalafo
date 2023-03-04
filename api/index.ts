import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import usersRouter from "./Routers/User";
import ItemRouter from "./Routers/item";
import CategoryRouter from "./Routers/category";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/items", ItemRouter);
app.use("/categories", CategoryRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  app.use(express.static("public"));
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log("we are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
