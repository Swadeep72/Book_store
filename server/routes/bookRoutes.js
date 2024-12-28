import express from "express";
import userAuth from "../middlewares/auth.js";
import Book from "../models/bookModel.js";
import { TryCatch } from "../utils/helperUtils.js";
import { validateBook } from "../utils/validationUtils.js";

const bookRoutes = express()

bookRoutes.get("/get-recent-books", TryCatch(async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).send({ status: 1, data: books })
}))

bookRoutes.get("/get-books", TryCatch(async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send({ status: 1, data: books })
}))

bookRoutes.post("/add-book", userAuth, TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).send({ status: 0, message: "You are not authorized to add a book" })
    }
    const { url, title, author, description, price, language } = req.body;
    const validate = validateBook({ url, title, author, description, price, language })
    if (!validate) {
        throw new Error("Incorrect details.")
    }
    const book = new Book({ url, title, author, description, price, language })
    await book.save()
    if (book) {
        res.status(201).send({ status: 1, message: "Book added successfully" })
    } else {
        res.status(400).send({ status: 0, message: "Failed to add book" })
    }
}))

bookRoutes.route("/book/:bookId")
    .get(TryCatch(async (req, res) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found")
        }
        res.status(200).send({ status: 1, data: book })
    }))
    .put(userAuth, TryCatch(async (req, res) => {
        if (req.user.role !== "admin") {
            return res.status(403).send({ status: 0, message: "You are not authorized to update a book" })
        }
        const bookId = req.params.bookId;
        const { url, title, author, description, price, language } = req.body;
        const validate = validateBook({ url, title, author, description, price, language })
        if (!validate) {
            throw new Error("Incorrect details.")
        }
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found")
        }
        await Book.findByIdAndUpdate(bookId, { url, title, author, description, price, language })
        res.status(200).send({ status: 1, message: "Book updated successfully" })
    }))
    .delete(userAuth, TryCatch(async (req, res) => {
        if (req.user.role !== "admin") {
            return res.status(403).send({ status: 0, message: "You are not authorized to delete a book" })
        }
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found")
        }
        const deletedBook = await Book.findByIdAndDelete(bookId)
        console.log(deletedBook)
        res.status(200).send({ status: 1, message: "Book deleted successfully" })
    }))

export default bookRoutes;