const port = 4000;
import express from "express";
import cors from "cors";
import userModel from "./models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const app = express();

import "./Db/dbConnection.js";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Wellcome Bady");
})

// login Api
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "The user not found. Please sign up first."
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom', { expiresIn: '3h' });
            return res.status(200).json({
                success: true,
                message: `Welcome back, ${user.username}`,
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "The password is incorrect!"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred, please try again later."
        });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;

        // Check for missing fields
        if (!username || !email || !mobile || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if user already exists by email or mobile
        const existingUser = await userModel.findOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: `User with email or mobile already exists.`
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            username: username,
            email: email,
            mobile: mobile,
            cartData: [], 
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();

        // Create payload for JWT
        const data = {
            user: {
                id: newUser.id
            }
        };

        // Generate JWT token
        const token = jwt.sign(data, 'secret_ecom', { expiresIn: '3h' }); 

        // Respond with success message and token
        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

// add to cart

app.post('/addtocart', async (req, res) => {

    const { itemId } = req.body;
    const token = req.header('auth-token');
    try {
        const verified = jwt.verify(token, 'secret_ecom');
        const userId = verified.user.id;

        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        user.cartData.push(itemId);
        await user.save();
        res.status(200).json({ success: true, message: "Item added to cart successfully", cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on port" + port);
    } else {
        console.log("Server failed to connect");
    }
})


