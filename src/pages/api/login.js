import User from '../../models/userModel';
import connectDB from '@/config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const data = JSON.parse(req.body);

    try {
        await connectDB();

        const user = await User.findOne({ email: data.email });

        if (user) {
            const validPassword = await bcrypt.compare(data.password, user.password);

            if (validPassword) {
                const tokenData = { id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname };
                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "7d" });

                res.setHeader("Set-Cookie", `auth-token=${token}; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; Path=/; Secure; SameSite=Strict`);

                res.status(200).json({ message: "Login Successfully.", user, token });
            } else {
                res.status(400).json({ message: 'Invalid password.' });
            }
        } else {
            res.status(400).json({ message: 'User does not exist.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed." });
    }
}
