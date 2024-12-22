import express from "express"
import { validateUser } from "../utils/validationUtils.js";
import User from "../models/userModel.js";
import { compare, hash } from "bcrypt"
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/auth.js";
const userRoutes = express()

userRoutes.post("/sign-up", async (req, res) => {
    try {
        const { userName, email, password, address } = req.body;
        const validation = validateUser({ userName, email, password, address })
        if (validation) {
            const hashedPassword = await hash(password, process.env.HASH_ROUNDS)
            const user = new User({ ...req.body, password: hashedPassword })
            await user.save()
            if (user) {
                res.send({ status: 1, message: "Sign up successful.", data: user })
            } else {
                res.send({ status: 0, message: "Failed to create user." })
            }
        }
    } catch (error) {
        res.status(500).send({ status: 0, message: error?.message })
    }
})
userRoutes.post("/sign-in", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isValidPassword = await compare(password, user.password)
        if (!isValidPassword) {
            throw new Error("Invalid Credentials")
        }
        const token = jwt.sign({ id: user?._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        })
        res.cookie("token", token).send({ status: 1, message: "Sign in successful.", data: user })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: 0, message: error?.message })
    }
})

userRoutes.use(userAuth);

userRoutes.put("/update-address", async (req, res) => {
  try {
      const { address } = req?.body;
      const user = await User.findByIdAndUpdate(req.user._id, { address }, { new: true });
      if (user) {
          res.send({ status: 1, message: "Address updated successfully.", data: user })
      } else {
          res.send({ status: 0, message: "Failed to update address." })
      }
  } catch (error) {
    res.status(500).send({ status: 0, message: error?.message })
  }
})

export default userRoutes;