export default function (req, res, next) {
    next([404, "Route not found."]);  // Either use next or use res.send both will work fine.
    // res.status(404).send({ status: 0, message: "Route not found" })
}