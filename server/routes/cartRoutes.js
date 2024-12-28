import express from "express";
import User from "../models/userModel.js";
import { TryCatch } from "../utils/helperUtils.js";

const cartRouter = express();

cartRouter.post("/add-to-cart", TryCatch(async (req, res, next) => {
    const user = req.user;
    const { bookId } = req.body;
    if (user?.cart?.includes(bookId?.toString())) return next([200, "Book is already in your cart"]);
    await User.findByIdAndUpdate(user?._id, { $set: { cart: [...user.cart, bookId] } });
    res.send({ status: 1, message: "Book added to your cart" })
}))

cartRouter.post("/remove-from-cart", TryCatch(async (req, res, next) => {
    const user = req.user;
    const { bookId } = req.body;
    if (!user?.cart?.includes(bookId?.toString())) return next([200, "Book is already not in your cart"]);
    await User.findByIdAndUpdate(user?._id, { $pull: { cart: bookId } });
    res.send({ status: 1, message: "Book removed from your cart" })
}))

cartRouter.get("/get-cart", TryCatch(async (req, res) => {
    const user = req.user;
    const { cart } = await User.findById(user?._id).populate("cart").select("cart");
    res.send({ status: 1, data: cart })
}))

export default cartRouter;