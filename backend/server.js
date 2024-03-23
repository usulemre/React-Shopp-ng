import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import data from "./data.js";
import seedRouter from "./routes/seedRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connect to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use("/api/seed", seedRouter);

app.get("/api/product", (req, res) => {
  res.send(data.product);
});
app.get("/api/product/slug/:slug", (req, res) => {
  const product = data.product.find((item) => item.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Urun Bulunamadı" });
  }
});
app.get("/api/product/:id", (req, res) => {
  const product = data.product.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Urun Bulunamadı" });
  }
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
