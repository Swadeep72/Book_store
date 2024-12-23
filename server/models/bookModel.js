import { mongooseModel, timeStampSchema } from "../utils/mongooseUtils.js";

const bookSchema = timeStampSchema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
})
const Book = mongooseModel("Book", bookSchema)

export default Book;