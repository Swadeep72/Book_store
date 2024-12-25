import { config } from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import router from "./router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json())
    .use(cookieParser())
    .use(cors())

connectDB()
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(error => console.log(error));

app.use("/", router)