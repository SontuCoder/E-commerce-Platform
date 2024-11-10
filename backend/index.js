import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userModel from "./models/User.js";
import Contact from "./models/Contact.js";
import CarBook from "./models/CarBook.js";
import Order from "./models/Order.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import axios from 'axios';

const app = express();

import "./Db/dbConnection.js";

const port = 4000;
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

        const token = jwt.sign(data, 'secret_ecom', { expiresIn: '3h' });

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
app.post('/deleteallcart', async (req, res) => {
    const { user } = req.body;
    if (!user || !user._id) {
        return res.json({ success: false, message: 'Login first' });
    }
    try {
        // Find the user by ID to clear the cart data
        const userRecord = await userModel.findById(user._id);
        if (!userRecord) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Clear the cartData array
        userRecord.cartData = [];

        // Save the user document with the updated cartData
        await userRecord.save();
        return res.json({ success: true, });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});


// Contact Details Post :- 
app.post('/contactsubmit', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        // Validate input
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const existingUser = await Contact.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: `User with email already exists.`
            });
        }
        const newContact = new Contact({
            name,
            email,
            mobile: phone,
            message
        });
        await newContact.save();

        return res.status(201).json({
            success: true,
            message1: "Contact details saved successfully.",
            message2: "We will contact you soon."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
});

// Contact Details Fetch for Admin Panel :-
app.get('/contactdetails', async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (contacts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No contacts found."
            });
        }
        res.status(200).json({
            success:true,
            data:contacts,
            message: "Contact Data is extracted."}
        );
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error. Contact Data isn't fetched."
        });
    }
});

// Delete Contact Details from Db:-
app.post('/deletecontact', async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Email isn't Fetched."
            });
        }

        const user = await Contact.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        await Contact.deleteOne({ email });
        res.status(200).json({
            success: true,
            message: "Contact deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server error ${err}`
        });
    }
});

// CarBook Details Post :- 
app.post('/carbook', async (req, res) => {
    const { name, pickUpPlace, destinationPlace, mobile, dateOfPickup } = req.body;
    try {
        if (!name || !pickUpPlace || !destinationPlace || !mobile || !dateOfPickup) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }
        const user = await CarBook.findOne({ mobile });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User Already Booked."
            });
        }

        const carbook = new CarBook({
            name,
            pickUpPlace,
            destinationPlace,
            mobile,
            dateOfPickup
        });

        await carbook.save();
        res.status(200).json({
            success: true,
            message: "CarBook saved successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server error ${err}`
        });
    }
});

// CarBook Details Fetch for Admin Panel :-
app.get('/carbookdetails', async (req, res) => {
    try {
        const contacts = await CarBook.find();
        res.status(200).json(contacts);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error. Carbook Data isn't fetched."
        });
    }
});
// Delete CarBook Details from Db :-
app.post('/deletecarbook', async (req, res) => {
    const { mobile } = req.body;
    try {
        if (!mobile) {
            res.status(400).json({
                success: false,
                message: "Mobile isn't Fetched."
            });
        }

        const user = await CarBook.findOne({ mobile });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        await CarBook.deleteOne({ mobile });
        res.status(200).json({
            success: true,
            message: "Carbook deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server error ${err}`
        });
    }
});

// Order Details post in Db :-
app.post('/orderbook', async (req, res) => {
    const { items, userId, name, email, mobile, address, landmark } = req.body;

    if (!items || !userId || !name || !email || !mobile || !address || !landmark) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID format."
        });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const existingOrder = await Order.findOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        });

        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: "Order with this email or mobile already exists."
            });
        }
        const newOrder = new Order({
            items,
            username: user.username,
            name,
            email,
            mobile,
            address,
            landmark
        });

        await newOrder.save();

        if (items.length > 1) {
            const cartDeletionResponse = await axios.post('http://localhost:4000/deleteallcart', {
                user
            });

            if (!cartDeletionResponse.data.success) {
                console.error("Failed to delete cart:", cartDeletionResponse.data.message);
            }
        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`
        });
    }
});



// Order Details Fetch from Db :-
app.get('/orderdetails', async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error. Orders Data aren't fetched."
        });
    }
});
// Order Placed:-
app.post('/deleteorder', async (req, res) => {
    const { mobile, email } = req.body;
    try {
        if (!mobile || !email) {
            res.status(400).json({
                success: false,
                message: "Mobile or Email isn't Fetched."
            });
        }

        const user = await Order.findOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        await Order.deleteOne({
            $or: [
                { email: email },
                { mobile: mobile }
            ]
        });
        res.status(200).json({
            success: true,
            message: "Order deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Server error ${err}`
        });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on port" + port);
    } else {
        console.log("Server failed to connect");
    }
})


