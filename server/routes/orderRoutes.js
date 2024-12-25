import express from "express"
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
const orderRoutes = express()

orderRoutes.post("/place-order", async (req, res) => {
    try {
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
            res.status(201).send({ status: 1, message: "Order placed successfully", order: savedOrder })
        } else {
            res.status(400).send({ status: 0, message: "Failed to place order" })
        }
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

orderRoutes.get("/get-all-orders", async (req, res) => {
    try {
        const user = req.user;
        const orders = await User.findById(user?._id).populate({ path: "orders", populate: "books" }).select("orders")
        res.status(201).send({ status: 1, message: "Order fetched successfully", orders })
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

orderRoutes.get("/get-order-details/:orderId", async (req, res) => {
    try {
        const { orderId } = req?.params;
        const order = await Order.findById(orderId).populate("books")
        if (order) {
            res.status(201).send({ status: 1, message: "Order details fetched successfully", order })
        } else {
            res.status(400).send({ status: 0, message: "Failed to fetch order" })
        }
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

orderRoutes.put("/update-status/:orderId", async (req, res) => {
    try {
        const { orderId } = req?.params;
        const order = await Order.findByIdAndUpdate(orderId, { status: req?.body?.status },{new:true})
        if (order) {
            res.status(201).send({ status: 1, message: "Order status updated successfully", order })
        } else {
            res.status(400).send({ status: 0, message: "Failed to update order" })
        }
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})

export default orderRoutes;