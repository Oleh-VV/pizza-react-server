import express from "express";
import Product from "../models/productModel.js";
import upload from "../middleware/file.js";

const productsRouter = express.Router();
productsRouter.get("/category/:categoryName", async (req, res) => {
  try {
    console.log(req.params.categoryName);
    const products = await Product.find({ category: req.params.categoryName });
    console.log(products);
    res.json(products);
  } catch (err) {
    console.log(err);
    res.json(null);
  }
});
productsRouter.get("/product/:productId", async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.productId });
    res.json(product);
  } catch (err) {
    res.json(null);
  }
});
productsRouter.post(
  "/product",
  /*upload.single("file"), */ async (req, res) => {
    try {
      console.log(req.body.data);
      const product = await Product.create(req.body.data);
      //if (req.file) {
      res.json(product);
      // }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
);
//////////////////////////////////////////
productsRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
productsRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productsRouter;
