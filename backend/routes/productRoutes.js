import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const productAll = await Product.find();
  if (productAll) {
    res.send(productAll);
  } else {
    res.status(404).send({ message: "Urun Bulunamadı" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const productID = await Product.findById(req.params.id);
  if (productID) {
    res.send(productID);
  } else {
    res.status(404).send({ message: "Urun Bulunamadı" });
  }
});

productRouter.get("/slug/:slug", async (req, res) => {
  const productSlug = await Product.findOne({ slug: req.params.slug });
  if (productSlug) {
    res.send(productSlug);
  } else {
    res.status(404).send({ message: "Urun Bulunamadı" });
  }
});

export default productRouter;
