import { promises as fs } from "fs";
import express from "express";
import Category from "../Model/Category";
import Item from "../Model/Item";
import { imagesUpload } from "../multer";
import mongoose from "mongoose";
import auth, { RequestWithUser } from "../midelware/auth";
import User from "../Model/User";

const ItemRouter = express.Router();

ItemRouter.get("/", async (req, res, next) => {
  try {
    const result = await Item.find();

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

ItemRouter.get("/:id", async (req, res) => {
  try {
    const result = await Item.findById(req.params.id);

    if (!result) {
      return res.sendStatus(404);
    }

    const user = await User.findById(result.user);

    if (!user) {
      return res.sendStatus(404);
    }

    const category = await Category.findOne({ _id: result.category });

    console.log(result);

    const object = {
      _id: result._id,
      number: user.phone,
      displayname: user.displayname,
      title: result.title,
      description: result.description,
      price: result.price,
      user: result.user,
      image: result.image,
      category: category!.title,
    };

    return res.send(object);
  } catch {
    res.sendStatus(500);
  }
});

ItemRouter.post(
  "/",
  imagesUpload.single("image"),
  auth,
  async (req, res, next) => {
    const object = (req as RequestWithUser).user;
    const user = await User.findOne({ token: object.token });

    if (!user) {
      return res.status(403).send({ error: "user not found" });
    }

    const productData = {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      user: object._id,
      image: req.file ? req.file.filename : null,
    };

    const product = new Item(productData);

    try {
      await product.save();
      return res.send(product);
    } catch (e) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

ItemRouter.delete("/:id", imagesUpload.single("image"), auth, async (req, res) => {
  try {
    const request = await Item.findById({ _id: req.params.id });
    const object = (req as RequestWithUser).user;

    if (!request) {
      return res.status(403);
    }

    if (object._id === request.user){
      return res.status(403);
    }

    await Item.deleteOne({ _id: req.params.id });
    res.send({ message: "item was deleted" });
  } catch (e) {
    res.status(400).send(e);
  }
});

export default ItemRouter;
