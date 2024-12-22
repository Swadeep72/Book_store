import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION_URL)
            .then(() => console.log("Connected to MongoDB"))
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error, error?.message)
    }
}

export default connectDB;