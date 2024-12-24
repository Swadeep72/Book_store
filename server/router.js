import express from "express"
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import userAuth from "./middlewares/auth.js"
import favouriteRouter from "./routes/favouriteRoutes.js"
import cartRouter from "./routes/cartRoutes.js"

export default express.Router()
    .use("/users", userRoutes)
    .use(userAuth)
    .use("/books", bookRoutes)
    .use("/orders", orderRoutes)
    .use("/favourites", favouriteRouter)
    .use("/carts", cartRouter)
    .use("/orders", orderRoutes)