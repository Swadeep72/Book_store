import express from "express";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { BAD_REQUEST, CREATED, OK, TryCatch } from "../utils/helperUtils.js";

const orderRoutes = express()

orderRoutes.post("/place-order", TryCatch(async (req, res) => {
    const user = req.user;
    const { bookIds } = req?.body;
    const order = await new Order({ user: user?._id, books: bookIds })
    const savedOrder = await order.save()
    const updatedUser = await User.findByIdAndUpdate(user?._id, {
        $push: {
            orders: savedOrder?._id
        },
        cart: []
    })
    if (updatedUser) {
        res.status(CREATED).json({ status: 1, message: "Order placed successfully", order: savedOrder })
    } else {
        res.status(BAD_REQUEST).json({ status: 0, message: "Failed to place order" })
    }
}))

orderRoutes.get("/get-all-orders", TryCatch(async (req, res) => {
    const user = req.user;
    const orders = await User.findById(user?._id).populate({ path: "orders", populate: "books" }).select("orders")
    res.status(OK).json({ status: 1, message: "Order fetched successfully", orders })
}))

orderRoutes.get("/get-order-details/:orderId", TryCatch(async (req, res) => {
    const { orderId } = req?.params;
    const order = await Order.findById(orderId).populate("books")
    if (order) {
        res.status(OK).json({ status: 1, message: "Order details fetched successfully", order })
    } else {
        res.status(BAD_REQUEST).json({ status: 0, message: "Failed to fetch order" })
    }
}))

orderRoutes.put("/update-status/:orderId", TryCatch(async (req, res) => {
    const { orderId } = req?.params;
    const order = await Order.findByIdAndUpdate(orderId, { status: req?.body?.status }, { new: true })
    if (order) {
        res.status(OK).json({ status: 1, message: "Order status updated successfully", order })
    } else {
        res.status(BAD_REQUEST).json({ status: 0, message: "Failed to update order" })
    }
}))

export default orderRoutes;