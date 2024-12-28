import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { TryCatch } from "../utils/helperUtils.js";

const userAuth = TryCatch(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token)
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
})

export default userAuth;