import express from "express";
import Category from "../Model/Category";

const CategoryRouter = express.Router();

CategoryRouter.get("/", async (req, res, next) => {
  try {
    const result = await Category.find();

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

export default CategoryRouter;
