import express from "express"
import { validateUser } from "../utils/validationUtils.js";
import User from "../models/userModel.js";
import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/auth.js";
import { BAD_REQUEST, OK, TryCatch } from "../utils/helperUtils.js";
const userRoutes = express()

userRoutes.post("/sign-up", TryCatch(async (req, res) => {
    const { userName, email, password, address } = req.body;
    const validation = validateUser({ userName, email, password, address })
    if (validation) {
        const hashedPassword = await hash(password, 10)
        const user = new User({ ...req.body, password: hashedPassword })
        await user.save()
        if (user) {
            res.status(OK).json({ status: 1, message: "Sign up successful.", data: user })
        } else {
            res.status(BAD_REQUEST).json({ status: 0, message: "Failed to create user." })
        }
    }
}))

userRoutes.post("/sign-in", TryCatch(async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) return next([BAD_REQUEST, "Invalid Credentials"])
    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) return next([BAD_REQUEST, "Invalid Credentials"])
    const token = jwt.sign({ id: user?._id }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    })
    res.cookie("token", token).status(OK).json({ status: 1, message: "Sign in successful.", data: user })
}))

userRoutes.use(userAuth);

userRoutes.put("/update-address", TryCatch(async (req, res) => {
    const { address } = req?.body;
    const user = await User.findByIdAndUpdate(req.user._id, { address }, { new: true });
    if (user) {
        res.status(OK).json({ status: 1, message: "Address updated successfully.", data: user })
    } else {
        res.status(BAD_REQUEST).json({ status: 0, message: "Failed to update address." })
    }
}))

export default userRoutes;