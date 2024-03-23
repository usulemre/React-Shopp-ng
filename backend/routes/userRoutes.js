import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { genereToken } from "../ultis.js";

const userRouter = express.Router();

userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genereToken(user),
      });
      return;
    }
  } else {
    res.status(404).send({ message: "Kullanıcı Bulunamadı" });
  }
});
export default userRouter;
