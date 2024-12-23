import express from "express";
import User from "../models/userModel.js";

const favouriteRouter = express();

favouriteRouter.post("/add-to-favourites", async (req, res) => {
    try {
        const user = req.user;
        const { bookId } = req.body;
        if (user?.favourites?.includes(bookId?.toString())) {
            throw new Error("Book is already in your favourites");
        }
        await User.findByIdAndUpdate(user?._id, { $set: { favourites: [...user.favourites, bookId] } });
        res.send({ status: 1, message: "Book added to your favourites" })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

favouriteRouter.post("/remove-from-favourites", async (req, res) => {
    try {
        const user = req.user;
        const { bookId } = req.body;
        if (!user?.favourites?.includes(bookId?.toString())) {
            throw new Error("Book is already not in your favourites");
        }
        await User.findByIdAndUpdate(user?._id, { $pull: { favourites: bookId } });
        res.send({ status: 1, message: "Book removed from your favourites" })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

favouriteRouter.get("/get-favourites", async (req, res) => {
    try {
        const { _id } = req.user;
        const { favourites } = await User.findById(_id).populate("favourites").select("favourites");
        res.send({ status: 1, data: favourites })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

export default favouriteRouter;