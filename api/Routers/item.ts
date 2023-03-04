import express from "express";
import Category from "../Model/Category";
import Item from "../Model/Item";

const ItemRouter = express.Router();

ItemRouter.get("/", async (req, res, next) => {
  try {
    const result = await Item.find();

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

ItemRouter.get("/:name", async (req, res) => {
  try {

    const category_id = await Category.findOne({title: req.params.name});

    if (!category_id) {
      return res.sendStatus(404);
    }

    const result = await Item.find({category: category_id._id})

    return res.send(result);
  } catch {
    res.sendStatus(500);
  }
});

export default ItemRouter;
