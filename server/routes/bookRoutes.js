import express from "express"
import { validateBook } from "../utils/validationUtils.js";
import Book from "../models/bookModel.js";
const bookRoutes = express()

bookRoutes.post("/add-book", async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ status: 0, message: "You are not authorized to add a book" })
        }
        const { url, title, author, description, price, language } = req.body;
        const validate = validateBook({ url, title, author, description, price, language })
        if (!validate) {
            throw new Error("Incorrect details.")
        }
        const book = new Book({ url, title, author, description, price, language })
        await book.save()
        if (book) {
            res.status(201).json({ status: 1, message: "Book added successfully" })
        } else {
            res.status(400).json({ status: 0, message: "Failed to add book" })
        }
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

bookRoutes.route("/book/:bookId")
    .get(async (req, res) => {
        try {
            const bookId = req.params.bookId;
            const book = await Book.findById(bookId);
            if (!book) {
                throw new Error("Book not found")
            }
            res.status(200).json({ status: 1, data: book })
        } catch (error) {
            res.status(500).send({ status: 0, message: error?.message })
        }
    })
    .put(async (req, res) => {
        try {
            if (req.user.role !== "admin") {
                return res.status(403).json({ status: 0, message: "You are not authorized to update a book" })
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
            res.status(200).json({ status: 1, message: "Book updated successfully" })
        } catch (error) {
            res.status(500).send({ status: 0, message: error?.message })
        }
    })
    .delete(async (req, res) => {
        try {
            if (req.user.role !== "admin") {
                return res.status(403).json({ status: 0, message: "You are not authorized to delete a book" })
            }
            const bookId = req.params.bookId;
            const book = await Book.findById(bookId);
            if (!book) {
                throw new Error("Book not found")
            }
            const deletedBook = await Book.findByIdAndDelete(bookId)
            console.log(deletedBook)
            res.status(200).json({ status: 1, message: "Book deleted successfully" })
        } catch (error) {
            res.status(500).send({ status: 0, message: error?.message })
        }
    })

bookRoutes.get("/get-books/:limit", async (req, res) => {
    try {
        const limit = req.params.limit;
        const query = Book.find().sort({ createdAt: -1 });
        if (limit) query.limit(4);
        const books = await query;
        res.status(200).json({ status: 1, data: books })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

export default bookRoutes;