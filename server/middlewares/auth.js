import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { TryCatch, UNAUTHORIZED } from "../utils/helperUtils.js";

const userAuth = TryCatch(async (req, _, next) => {
    const { token } = req.cookies;
    console.log(token)
    if (!token) return next([UNAUTHORIZED, "Token is invalid."])
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const { id } = decodedToken;
    const user = await User.findById(id)
    if (!user) return next([UNAUTHORIZED, "User not found."])
    req.user = user
    next()
})

export default userAuth;