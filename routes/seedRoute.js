import express from "express";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { users, products } from "../data.js";

const seedRouter = express.Router();
seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  await User.deleteMany({});
  const createdProductsPizza = await Product.insertMany(products.pizza);
  const createdProductsDrinks = await Product.insertMany(products.drinks);
  const createdProductsDesserts = await Product.insertMany(products.desserts);
  const createdProductsSalads = await Product.insertMany(products.salads);
  const createdProductsVegan = await Product.insertMany(products.vegan);
  const createdUsers = await User.insertMany(users);
  res.send({
    createdProductsPizza,
    createdProductsDrinks,
    createdProductsDesserts,
    createdProductsSalads,
    createdProductsVegan,
  });
});

export default seedRouter;
