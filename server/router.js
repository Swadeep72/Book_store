import express from "express"
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

export default express.Router()
    .use("/books", bookRoutes)
    .use("/orders", orderRoutes)
    .use("/users", userRoutes)