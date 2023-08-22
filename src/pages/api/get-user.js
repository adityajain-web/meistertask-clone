import User from "@/models/userModel";

export default async function handler(req, res) {
    const _id = JSON.parse(req.body);
    try {
        const user = await User.findOne({ _id }).select("-password")
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user data." })
    }
}