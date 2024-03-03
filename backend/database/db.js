import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Paytm",
        });
        console.log(`Database connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

export default connectDB;
