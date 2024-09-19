
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    itemId:{
        type: String,
        require: true
    }
});

const Cart= mongoose.model("Cart", cartSchema);
export default Cart;
