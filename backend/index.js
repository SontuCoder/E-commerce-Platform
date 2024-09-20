const port =4000;
import express from "express";
import mongoose from "mongoose";
import path from "path";
import jwt from "jsonwebtoken";
import cors from "cors";
import userModel from "./models/User.js";
import bcrypt from 'bcrypt';

const app = express();

import "./Db/dbConnection.js";

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Wellcome Bady");
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })  
    .then(user => {
        if (user) {
            if (user.password === password) {
                res.json({
                    success: true,
                    message: `Welcome back, ${user.username}`
                });
            } else {
                res.json({
                    success: false,
                    message: "The Password is incorrect!"
                });
            }
        } else {
            res.json({
                success: false,
                message: "The user not found ... Sign up first."
            });
        }
    })
    .catch(err => {
        console.error(err);
        res.json({
            success: false,
            message: "An error occurred, please try again later."
        });
    });
});


app.post('/register', async (req, res) => {
    try {
        let check = await userModel.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "User already exists in the database!" });
        }

        let check2 = await userModel.findOne({ mobile: req.body.mobile });
        if (check2) {
            return res.status(400).json({ success: false, errors: "User already exists in the database!" });
        }

        if (!req.body.username || !req.body.email || !req.body.mobile || !req.body.password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let cart = {};
        const user = new userModel({
            username: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
            cartData: cart,
            password: hashedPassword
        });
        
        await user.save();

        const token = jwt.sign({ id: user.id }, 'secret_ecom', { expiresIn: '1h' });

        res.status(201).json({ 
            success: true, 
            message: "User created successfully.", 
            token, 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email 
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"Server Error"});
    }
});


app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on port"+port);
    } else {
        console.log("Server failed to connect");
    }
})


