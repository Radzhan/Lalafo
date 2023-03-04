import { promises as fs } from 'fs';import express from "express";
import Category from "../Model/Category";
import Item from "../Model/Item";
import { imagesUpload } from "../multer";
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../midelware/auth';
import User from '../Model/User';

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

ItemRouter.get("/:id", async (req, res) => {
    try {
  
      const result = await Item.findById(req.params.id);
  
      if (!result) {
        return res.sendStatus(404);
      }
  
      return res.send(result);
    } catch {
      res.sendStatus(500);
    }
  });


ItemRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
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
  });

export default ItemRouter;
