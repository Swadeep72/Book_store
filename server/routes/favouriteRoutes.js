import express from "express";
import User from "../models/userModel.js";
import { TryCatch } from "../utils/helperUtils.js";

const favouriteRouter = express();

favouriteRouter.post("/add-to-favourites", TryCatch(async (req, res) => {
    const user = req.user;
    const { bookId } = req.body;
    if (user?.favourites?.includes(bookId?.toString())) {
        throw new Error("Book is already in your favourites");
    }
    await User.findByIdAndUpdate(user?._id, { $set: { favourites: [...user.favourites, bookId] } });
    res.send({ status: 1, message: "Book added to your favourites" })
}))

favouriteRouter.post("/remove-from-favourites", TryCatch(async (req, res) => {
    const user = req.user;
    const { bookId } = req.body;
    if (!user?.favourites?.includes(bookId?.toString())) {
        throw new Error("Book is already not in your favourites");
    }
    await User.findByIdAndUpdate(user?._id, { $pull: { favourites: bookId } });
    res.send({ status: 1, message: "Book removed from your favourites" })
}))

favouriteRouter.get("/get-favourites", TryCatch(async (req, res) => {
    const { _id } = req.user;
    const { favourites } = await User.findById(_id).populate("favourites").select("favourites");
    res.send({ status: 1, data: favourites })
}))

export default favouriteRouter;