import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken"
import { Auth } from "../middleware/Auth.js";
import Cookies from "js-cookie";
// import session from "express-session";
export const signup = async (req, res) => {
    try {
        // const { fullname, email, password } = req.body;
        const fullname = req.body.fullname
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        // const token=JWT.sign({id:createdUser._id},process.env.JWT_Password)

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                // token,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password
        const user = await User.findOne({ email })
        // console.log("im here1")
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = JWT.sign({ id:user._id }, process.env.JWT_Password)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict', 
            expires: new Date(Date.now() + 2.592e+9)}) //30 days
        res.status(200).json({
            message: "Login successful",
            // token,
            user: {
                _id: user._id,
                token,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const logout = async (req, res) => {
    console.log("logout")
    res.clearCookie('token', {
        httpOnly: true,  // Ensure to use the same attributes used when setting the cookie
        // secure: true, // Ensure this matches the secure attribute used
        sameSite: 'Strict',
        expires: new Date(Date.now(0)), // Use the same SameSite attribute used when setting the cookie
        path: '/',  // Ensure the path matches the one used when setting the cookie
      });
    res.json({ message: 'Logged out successfully' });
};