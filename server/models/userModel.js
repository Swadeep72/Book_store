import mongoose from "mongoose";
import { mongooseModel, timeStampSchema } from "../utils/mongooseUtils.js";

const userSchema = timeStampSchema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"]
        }
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }],
})
const User = mongooseModel("User", userSchema)

export default User;