import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/Ecommers-app", {
    serverSelectionTimeoutMS: 7000
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error: ", error);
});

export default mongoose;
