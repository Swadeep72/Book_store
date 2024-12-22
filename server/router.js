import express from "express"
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import userAuth from "./middlewares/auth.js"

export default express.Router()
    .use("/users", userRoutes)
    .use(userAuth)
    .use("/books", bookRoutes)
    .use("/orders", orderRoutes)