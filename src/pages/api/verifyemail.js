import connectDB from "@/config/db";
import User from "@/models/userModel";

export async function handler(req, res) {
    await connectDB()
    try {
        const token = JSON.parse(req.body);
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            res.status(400).json({ message: "Invalid Token" })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        res.status(200).json({ message: 'Email verify successfully.' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}