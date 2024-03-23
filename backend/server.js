import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import data from "./data.js";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

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
app.use("/api/product", productRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
