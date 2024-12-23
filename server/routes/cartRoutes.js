import express from "express";
import User from "../models/userModel.js";

const cartRouter = express();

cartRouter.post("/add-to-cart", async (req, res) => {
    try {
        const user = req.user;
        const { bookId } = req.body;
        if (user?.cart?.includes(bookId?.toString())) {
            throw new Error("Book is already in your cart");
        }
        await User.findByIdAndUpdate(user?._id, { $set: { cart: [...user.cart, bookId] } });
        res.send({ status: 1, message: "Book added to your cart" })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

cartRouter.post("/remove-from-cart", async (req, res) => {
    try {
        const user = req.user;
        const { bookId } = req.body;
        if (!user?.cart?.includes(bookId?.toString())) {
            throw new Error("Book is already not in your cart");
        }
        await User.findByIdAndUpdate(user?._id, { $pull: { cart: bookId } });
        res.send({ status: 1, message: "Book removed from your cart" })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

cartRouter.get("/get-cart", async (req, res) => {
    try {
        const user = req.user;
        const { cart } = await User.findById(user?._id).populate("cart").select("cart");
        res.send({ status: 1, data: cart })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})
export default cartRouter;