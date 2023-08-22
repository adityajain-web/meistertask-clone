import User from '../../models/userModel';
import connectDB from '@/config/db';
import { sendMail } from '@/helper/mailer';

export default async function handler(req, res) {
    const data = JSON.parse(req.body);

    await connectDB();

    try {
        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User(data);
        const response = await newUser.save();

        const user = await response.data;

        return res.status(201).json({ message: "User registered successfully", user: response });
    } catch (error) {
        return res.status(500).json({ message: "Registration failed" });
    }
}