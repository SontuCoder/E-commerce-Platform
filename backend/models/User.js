
import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
});

const User= mongoose.model("User", user);
export default User;