import express from "express";
import userAuth from "../middlewares/auth.js";
import Book from "../models/bookModel.js";
import { BAD_REQUEST, CREATED, FORBIDDEN, OK, TryCatch } from "../utils/helperUtils.js";
import { validateBook } from "../utils/validationUtils.js";

const bookRoutes = express()

bookRoutes.get("/get-recent-books", TryCatch(async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    res.status(OK).json({ status: 1, data: books })
}))

bookRoutes.get("/get-books", TryCatch(async (req, res) => {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(OK).json({ status: 1, data: books })
}))

bookRoutes.post("/add-book", userAuth, TryCatch(async (req, res, next) => {
    if (req.user.role !== "admin") return res.status(FORBIDDEN).json({ status: 0, message: "You are not authorized to add a book" })
    const { url, title, author, description, price, language } = req.body?.book;
    const validate = validateBook({ url, title, author, description, price, language })
    if (!validate) return next([BAD_REQUEST, "Incorrect details."])
    const book = new Book({ url, title, author, description, price, language })
    await book.save()
    if (book) {
        res.status(CREATED).json({ status: 1, message: "Book added successfully" })
    } else {
        res.status(BAD_REQUEST).json({ status: 0, message: "Failed to add book" })
    }
}))

bookRoutes.route("/book/:bookId")
    .get(TryCatch(async (req, res, next) => {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if (!book) return next([BAD_REQUEST, "Book not found"])
        res.status(OK).json({ status: 1, data: book })
    }))
    .put(userAuth, TryCatch(async (req, res, next) => {
        if (req.user.role !== "admin") return res.status(FORBIDDEN).json({ status: 0, message: "You are not authorized to update a book" })
        const bookId = req.params.bookId;
        const { url, title, author, description, price, language } = req.body;
        const validate = validateBook({ url, title, author, description, price, language })
        if (!validate) return next([BAD_REQUEST, "Incorrect details."])
        const book = await Book.findById(bookId);
        if (!book) return next([BAD_REQUEST, "Book not found"])
        await Book.findByIdAndUpdate(bookId, { url, title, author, description, price, language })
        res.status(OK).json({ status: 1, message: "Book updated successfully" })
    }))
    .delete(userAuth, TryCatch(async (req, res, next) => {
        if (req.user.role !== "admin") return next([FORBIDDEN, "You are not authorized to delete a book"])
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if (!book) return next("Book not found")
        const deletedBook = await Book.findByIdAndDelete(bookId)
        console.log(deletedBook)
        res.status(OK).json({ status: 1, message: "Book deleted successfully" })
    }))

// printAllRoutes(bookRoutes)
export default bookRoutes;