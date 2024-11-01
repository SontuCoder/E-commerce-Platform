import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    items: [
        {
            itemId: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    userName: {
        type: String,
        required: true
    },
    name:{
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
        unique: true,
        maxlength: 10, 
    },
    address:{
        type: String,
        required: true
    },
    landmark:{
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
