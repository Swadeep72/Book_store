import express from "express";
import User from "../models/userModel.js";
import { BAD_REQUEST, OK, TryCatch } from "../utils/helperUtils.js";

const favouriteRouter = express();

favouriteRouter.post("/add-to-favourites", TryCatch(async (req, res, next) => {
    const user = req.user;
    const { bookId } = req.body;
    if (!bookId) return next([BAD_REQUEST, "Book details not found"]);
    if (user?.favourites?.includes(bookId?.toString())) return next([BAD_REQUEST, "Book is already in your favourites"]);
    await User.findByIdAndUpdate(user?._id, { $set: { favourites: [...user.favourites, bookId] } });
    res.status(OK).json({ status: 1, message: "Book added to your favourites" })
}))

favouriteRouter.post("/remove-from-favourites", TryCatch(async (req, res, next) => {
    const user = req.user;
    const { bookId } = req.body;
    if (!bookId) return next([BAD_REQUEST, "Book details not found"]);
    if (!user?.favourites?.includes(bookId?.toString())) return next([BAD_REQUEST, "Book is already not in your favourites"]);
    await User.findByIdAndUpdate(user?._id, { $pull: { favourites: bookId } });
    res.status(OK).json({ status: 1, message: "Book removed from your favourites" })
}))

favouriteRouter.get("/get-favourites", TryCatch(async (req, res) => {
    const { _id } = req.user;
    const { favourites } = await User.findById(_id).populate("favourites").select("favourites");
    res.status(OK).json({ status: 1, data: favourites })
}))

export default favouriteRouter;