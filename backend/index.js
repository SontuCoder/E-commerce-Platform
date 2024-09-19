const port =4000;
import express from "express";
import mongoose from "mongoose";
import path from "path";
import jwt from "jsonwebtoken";
import cors from "cors";
import userModel from "./models/User.js"

const app = express();

import "./Db/dbConnection.js";

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Wellcome Bady");
})

app.post('/register', (req, res)=>{
    userModel.create(req.body).then(user =>res.json(user)).catch(err=> res.json(err));
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on port"+port);
    } else {
        console.log("Server failed to connect");
    }
})


