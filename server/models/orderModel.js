import mongoose from "mongoose";
import { mongooseModel, timeStampSchema } from "../utils/mongooseUtils.js";

const orderSchema = timeStampSchema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "Book"
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Delivered", "Cancelled", "Out for delivery"]
    }
})
const Order = mongooseModel("Order", orderSchema)

export default Order;