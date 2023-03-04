import { randomUUID } from "crypto";
import mongoose from "mongoose";
import config from "./config";
import Category from "./Model/Category";
import Item from "./Model/Item";
import User from "./Model/User";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("categories");
    await db.dropCollection("items");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [first, second] = await User.create(
    {
      username: "Doe",
      password: "1234",
      displayname: "pupkin",
      phone: +996555555555,
      token: randomUUID(),
    },
    {
      username: "Vasy",
      password: "4321",
      displayname: "nagibator",
      phone: +996550123123,
      token: randomUUID(),
    }
  );

  const [phones, computer, balls] = await Category.create(
    {
      title: "Phones",
    },
    {
      title: "Computer",
    },
    {
      title: "Balls",
    }
  );

  await Item.create(
    {
      title: "iphone 12",
      description: "super powerful phone",
      price: 850,
      image: 'fixtures/iphone12.jpeg',
      category: phones._id,
      user: first._id,
    },
		{
      title: "Football ball",
      description: "ball from World cup 2016",
      price: 2000,
      image: 'fixtures/CupBall.jpeg',
      category: balls._id,
      user: first._id,
    },
    {
      title: "iphone 13",
      description: "super powerful phone",
      price: 950,
      image: 'fixtures/iphone13.jpeg',
      category: phones._id,
      user: first._id,
    },
    {
      title: "Macbook 14pro",
      description: "super powerful Laptop",
      price: 2000,
      image: 'fixtures/macbook14.jpeg',
      category: computer._id,
      user: second._id,
    },
    {
      title: "Macbook 16",
      description: "super powerful laptop",
      price: 2200,
      image: 'fixtures/macbook16.jpeg',
      category: computer._id,
			user: second._id,
    }
  );

  await db.close();
};

run().catch(console.error);
