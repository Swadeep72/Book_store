import { NOT_FOUND } from "../utils/helperUtils.js";

export default function (req, res, next) {
    next([NOT_FOUND, "Route not found."]);  // Either use next or use res.send both will work fine.
    // res.status(NOT_FOUND).json({ status: 0, message: "Route not found" })
}