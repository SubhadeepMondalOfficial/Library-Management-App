import mongoose from "mongoose";

const connectDb = async (mongodbUri) => {
    await mongoose.connect(mongodbUri)
}

export default connectDb