import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is invalid.")
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        const { id } = decodedToken;
        const user = await User.findById(id)
        if (!user) {
            throw new Error("User not found.")
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(400).send({ status: 0, message: error?.message })
    }
}

export default userAuth;