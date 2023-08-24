import User from "@/models/userModel"

export default async function handler(req, res) {
    try {
        const response = await User.find();
        res.status(200).json({ users: response })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users." })
    }
}