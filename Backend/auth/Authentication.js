import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    email = email.toLowerCase();

    try {
        const user = await User.find({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        const verification = await bcrypt.compare(password, user[0].password);
        if (!verification) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token, user: { id: user[0]._id, name: user[0].name, email: user[0].email } });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const signup = async (req, res) => {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    try {
        const exisitingUser = await User.find({ email: email.toLowerCase() });
        if (exisitingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPasword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPasword,
            avatar: avatar || null // Optional avatar field
        })
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: "User created successfully", token, user: { id: newUser._id, name: newUser.name, email: newUser.email, avatar: newUser.avatar } });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
