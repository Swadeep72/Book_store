import bookRoutes from "../routes/bookRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";
import favouriteRoutes from "../routes/favouriteRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import { NOT_FOUND, printAllRoutes } from "../utils/helperUtils.js";

export default function (req, _, next) {
    const allRoutes = [userRoutes, bookRoutes, cartRoutes, favouriteRoutes, orderRoutes]
        ?.map(router => printAllRoutes(router))?.flat(2)
        ?.map(route => route?.split(": ")?.[0])
    const isExists = allRoutes?.some(data => data === req?.originalUrl)

    // next([NOT_FOUND, isExists ? "Route not found but path exists." : "Route not found."]);
    next([NOT_FOUND, `Route not found${isExists ?" but path exists.":"."}`]);
    // res.status(NOT_FOUND).json({ status: 0, message: "Route not found" })
}