import mongoose, { Types } from "mongoose";
import Category from "./Category";
import User from "./User";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: "Category does not exist",
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist",
    },
  },
  title: {
    type: String,
    required: [true, "title are required"],
  },
  image: {
    type: String,
    required: [true, "image are required"],
  },
  description: {
    type: String,
    required: [true, "description are required"],
  },
  price: {
    type: Number,
    min: 0.1,
    required: [true, "is't for free ?"],
  },
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;
