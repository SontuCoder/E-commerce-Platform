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

        if (!username || !email || !mobile || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username: username,
            email: email,
            mobile: mobile,
            cartData: [],
            password: hashedPassword
        });

        await newUser.save();

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

//get Cart list
app.get('/cartlist', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.json({ success: false, message: 'Login first' });
    }
    try {
        const verified = jwt.verify(token, 'secret_ecom');
        const userId = verified.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'No user is found' });
        }
        const cartItems = user.cartData;
        if (cartItems.length > 0) {
            return res.json({ success: true, cart: cartItems });
        } else {
            return res.json({ success: false, message: 'No items in the cart' });
        }
    } catch (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// delete from cart
app.post('/deleteitemcart', async (req, res) => {
    const { itemId } = req.body;
    const token = req.header('auth-token');
    if (!token) {
        return res.json({ success: false, message: 'Login first' });
    }
    try {
        const verified = jwt.verify(token, 'secret_ecom');
        const userId = verified.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'No user is found' });
        }
        const cartItems = user.cartData;
        const itemInCart = cartItems.includes(itemId);
        if (!itemInCart) {
            return res.json({ success: false, message: 'No item is found' });
        }
        const itemIndex = cartItems.indexOf(itemId);
        cartItems.splice(itemIndex, 1);

        user.cartData = cartItems;
        await user.save();
        return res.json({ success: true, message: "Item delete from cart successfully." });
    } catch (err) {
        return res.json({ success: false, message: err });
    }
});

//Count cart Items:

app.get('/cartcount', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.json({ success: false, message: 'Login first' });
    }
    try {
        const verified = jwt.verify(token, 'secret_ecom');
        const userId = verified.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'No user is found' });
        }
        const cartItems = user.cartData;
        return res.json({ success: true, number: cartItems.length });
    } catch (err) {
        return res.json({ success: false, message: err });
    }
});

// Fatch User Details
app.get('/userdetails', async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.json({ success: false, message: 'Login first' });
    }
    try {
        const verified = jwt.verify(token, 'secret_ecom');
        const userId = verified.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'No user is found' });
        }

        res.json({
            success: true,
            user: {
                name: user.username,
                email: user.email,
                number: user.mobile
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// order all cart

app.post('/deleteallcart', async (req,res)=>{
    const token = req.header('auth-token');
    if (!token) {
        return res.json({ success: false, message: 'Login first' });
    }
    try {
        const verified = jwt.verify(token, 'secret_ecom');
        const userId = verified.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: 'No user is found' });
        }

        user.cartData = []; 
        await user.save(); 
        return res.json({ success: true,});
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on port" + port);
    } else {
        console.log("Server failed to connect");
    }
})


