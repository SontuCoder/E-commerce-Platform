import mongoose from "mongoose";

const carBookSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    pickUpPlace: {
        type: String,
        required: true,
    },
    destinationPlace: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10, 
    },
    dateOfPickup:{
        type:Date,
        require:true
    }
});

const CarBook = mongoose.model("CarBook", carBookSchema);

export default CarBook;
