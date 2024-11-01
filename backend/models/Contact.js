import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    mobile: {
        type: String, 
        required: true,
        maxlength: 10, 
    },
    message: {
        type: String,
    }
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
